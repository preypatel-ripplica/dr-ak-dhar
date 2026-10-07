// -----------------------------------------------------------------------------
// CMS connector. Fetches the `blogs` and `treatments` collections at build time
// (the site is statically exported) and falls back to local data in `data/blogs.ts`
// and `data/treatments.ts` when the CMS is not configured, unreachable, or
// a collection is empty, so the site always builds.
// Set CMS_API_URL and CMS_API_TOKEN in .env.local to enable.
// Collection schemas + seed entries: docs/cms-collections.md, docs/cms-seed/.
// -----------------------------------------------------------------------------

import fs from "fs";
import path from "path";
import { blogs as localBlogPosts, type BlogPost, type BlogSection } from "../data/blogs";
import { treatments as localTreatments, type Treatment } from "../data/treatments";

const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

type CmsRecord = Record<string, any>;

const cmsEnabled = Boolean(CMS_API_URL && CMS_API_TOKEN);
const cmsCacheBuster =
  process.env.CMS_CACHE_BUST ||
  process.env.VERCEL_GIT_COMMIT_SHA ||
  String(Date.now());

async function cmsPost(endpoint: string, body: CmsRecord): Promise<any | null> {
  if (!CMS_API_URL || !CMS_API_TOKEN) return null;
  let baseUrl = CMS_API_URL.replace(/\/$/, "");
  try {
    baseUrl = new URL(CMS_API_URL).origin;
  } catch {}
  const separator = endpoint.includes("?") ? "&" : "?";
  const url = `${baseUrl}${endpoint}${separator}cms_cache_bust=${encodeURIComponent(cmsCacheBuster)}`;
  
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${CMS_API_TOKEN}`,
      "ngrok-skip-browser-warning": "true",
    },
    body: JSON.stringify(body),
    cache: "force-cache",
  });
  if (!res.ok) {
    throw new Error(`CMS request ${endpoint} failed (${res.status}): ${await res.text()}`);
  }
  return res.json();
}

// Download CMS media at build time into /public/cms-images so images keep
// working in the static export (signed URLs expire).
function findLocalMedia(mediaId: string): string | null {
  const directory = path.join(process.cwd(), "public", "cms-images");
  if (!fs.existsSync(directory)) return null;
  const filename = fs.readdirSync(directory).find((file) => file.startsWith(`${mediaId}.`));
  return filename ? `/cms-images/${filename}` : null;
}

async function getMedia(mediaId: string): Promise<CmsRecord | null> {
  const existingPath = findLocalMedia(mediaId);
  if (existingPath) return { _localPath: existingPath };

  let media: CmsRecord | null = null;
  try {
    media = await cmsPost("/api/content.media.get", { media_id: mediaId });
  } catch {
    const localPath = findLocalMedia(mediaId);
    return localPath ? { _localPath: localPath } : null;
  }
  if (!media) return null;

  const signedUrl = media.download_url ?? media.preview_url;
  if (signedUrl && media.filename) {
    try {
      const ext = path.extname(media.filename) || ".jpg";
      const localPath = `/cms-images/${mediaId}${ext}`;
      const absPath = path.join(process.cwd(), "public", "cms-images", `${mediaId}${ext}`);
      if (!fs.existsSync(absPath)) {
        fs.mkdirSync(path.dirname(absPath), { recursive: true });
        const res = await fetch(signedUrl, { cache: "no-store" });
        if (res.ok) {
          fs.writeFileSync(absPath, Buffer.from(await res.arrayBuffer()));
        }
      }
      if (fs.existsSync(absPath)) media._localPath = localPath;
    } catch {
      // fall through to the signed URL
    }
  }
  return media;
}

// Recursively resolve `{ media_id }` objects anywhere in an entry into
// `{ src, alt }` so templates can treat images uniformly.
async function localizeCmsMedia(value: any): Promise<any> {
  if (Array.isArray(value)) {
    return Promise.all(value.map((item) => localizeCmsMedia(item)));
  }
  if (value && typeof value === "object") {
    const mediaId = value.media_id ?? value.mediaId;
    if (typeof mediaId === "string" && mediaId.length > 0) {
      const media = await getMedia(mediaId);
      if (media) {
        const url = media._localPath ?? media.url ?? media.download_url ?? media.preview_url;
        if (url) value.src = url;
        if (typeof media.alt_text === "string" && media.alt_text.trim().length > 0) {
          value.alt = media.alt_text;
        }
      }
    }
    await Promise.all(
      Object.keys(value).map(async (key) => {
        value[key] = await localizeCmsMedia(value[key]);
      })
    );
  }
  return value;
}

function resolveImage(field: any): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  if (field.src) return field.src;
  if (field.url) return field.url;
  if (typeof field.name === "string" && field.name.startsWith("/")) return field.name;
  return "";
}

async function fetchCollection(slug: string): Promise<CmsRecord[]> {
  const data = await cmsPost("/api/content.entries.list", {
    collection_slug: slug,
    page_size: 100,
  });
  const entries = Array.isArray(data) ? data : data?.entries || data?.data || data?.items || [];
  return Promise.all(entries.map((item: CmsRecord) => localizeCmsMedia(item)));
}

function normalizeStrings(value: any): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  }
  if (typeof value === "string") {
    return value
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function normalizeFaqs(raw: any): [string, string][] {
  if (!Array.isArray(raw)) return [];
  return raw
    .map((item: any): [string, string] | null => {
      if (Array.isArray(item) && item.length >= 2) return [String(item[0]), String(item[1])];
      const q = item?.q || item?.question || "";
      const a = Array.isArray(item?.answer) ? item.answer.join("\n\n") : item?.a || item?.answer || "";
      return q && a ? [q, a] : null;
    })
    .filter((item): item is [string, string] => item !== null);
}

/* ------------------------------- BLOGS --------------------------------- */

function normalizeBlogSections(entry: CmsRecord): BlogSection[] {
  const sections = entry.sections || entry.content?.blocks;
  if (!Array.isArray(sections)) return [];
  return sections
    .map((sec: any, idx: number): BlogSection | null => {
      if (!sec || typeof sec !== "object") return null;
      return {
        id: sec.id || `section-${idx + 1}`,
        heading: sec.heading || sec.title || "",
        paragraphs: normalizeStrings(sec.paragraphs || sec.body),
        bullets: sec.bullets ? normalizeStrings(sec.bullets) : undefined,
      };
    })
    .filter((sec): sec is BlogSection => sec !== null);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  if (!cmsEnabled) return localBlogPosts;
  try {
    const entries = await fetchCollection("blogs");
    const posts: BlogPost[] = entries
      .map((item) => {
        const entry = item.entry || item;
        return {
          slug: entry.slug || "",
          title: entry.title || "",
          excerpt: entry.excerpt || entry.metaDescription || "",
          category: entry.category || "Patient guidance",
          date: entry.date || entry.published || "2026-09-01",
          dateLabel: entry.dateLabel || entry.date || "1 Sep 2026",
          readTime: entry.readTime || "5 min read",
          image: resolveImage(entry.hero_image || entry.image) || "/images/treatments/breast-cancer.jpg",
          imageAlt: entry.imageAlt || entry.cardAlt || entry.title || "",
          intro: entry.intro || "",
          sections: normalizeBlogSections(entry),
          takeaway: entry.takeaway || "",
          faqs: normalizeFaqs(entry.faqs),
        };
      })
      .filter((post) => post.slug && post.title);
    return posts.length > 0 ? posts : localBlogPosts;
  } catch (err) {
    console.error("getBlogPosts error:", (err as Error).message);
    return localBlogPosts;
  }
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const posts = await getBlogPosts();
  return posts.find((post) => post.slug === slug);
}

export async function getBlogSlugs(): Promise<string[]> {
  const posts = await getBlogPosts();
  return posts.map((post) => post.slug);
}

/* ----------------------------- TREATMENTS ------------------------------ */

function normalizeTreatment(entry: CmsRecord): Treatment {
  return {
    slug: entry.slug || "",
    title: entry.title || "",
    shortTitle: entry.shortTitle || entry.short_title || entry.title || "",
    readTime: entry.readTime || entry.read_time || "5 min read",
    headline: entry.headline || `${entry.title}:`,
    headlineAccent: entry.headlineAccent || entry.headline_accent || "",
    summary: entry.summary || entry.excerpt || entry.description || "",
    cardText: entry.cardText || entry.card_text || entry.excerpt || "",
    image: resolveImage(entry.hero_image || entry.image) || "/images/treatments/breast-cancer.jpg",
    imageAlt: entry.imageAlt || entry.image_alt || entry.cardAlt || entry.title || "",
    overview: {
      title: entry.overview?.title || `What is ${entry.title}?`,
      paragraphs: normalizeStrings(entry.overview?.paragraphs || entry.overview?.body),
    },
    symptoms: {
      title: entry.symptoms?.title || "Common signs and symptoms",
      intro: entry.symptoms?.intro,
      items: normalizeStrings(entry.symptoms?.items),
      note: entry.symptoms?.note,
    },
    whenToConsult: {
      title: entry.whenToConsult?.title || entry.when_to_consult?.title || "When to seek oncology review",
      items: normalizeStrings(entry.whenToConsult?.items || entry.when_to_consult?.items),
    },
    diagnosis: {
      title: entry.diagnosis?.title || "How it is assessed",
      intro: entry.diagnosis?.intro,
      items: normalizeStrings(entry.diagnosis?.items),
    },
    checklist: {
      title: entry.checklist?.title || "Does this apply to you?",
      subtitle: entry.checklist?.subtitle || "This checklist helps organise your concerns. It does not replace a consultation.",
      items: normalizeStrings(entry.checklist?.items),
    },
    approach: {
      title: entry.approach?.title || "Treatment pathways we discuss",
      intro: entry.approach?.intro || "",
      options: (entry.approach?.options || []).map((opt: any) => ({
        title: opt.title || "",
        detail: opt.detail || "",
      })),
    },
    journey: {
      title: entry.journey?.title || "Your care journey",
      steps: (entry.journey?.steps || []).map((step: any) => ({
        label: step.label || "",
        title: step.title || "",
        detail: step.detail || "",
      })),
    },
    timeline: {
      before: normalizeStrings(entry.timeline?.before),
      during: normalizeStrings(entry.timeline?.during),
      after: normalizeStrings(entry.timeline?.after),
    },
    faqs: normalizeFaqs(entry.faqs),
  };
}

export async function getTreatments(): Promise<Treatment[]> {
  if (!cmsEnabled) return localTreatments;
  try {
    const entries = await fetchCollection("treatments");
    const items: Treatment[] = entries
      .map((item) => {
        const entry = item.entry || item;
        return normalizeTreatment(entry);
      })
      .filter((t) => t.slug && t.title);
    return items.length > 0 ? items : localTreatments;
  } catch (err) {
    console.error("getTreatments error:", (err as Error).message);
    return localTreatments;
  }
}

export async function getTreatment(slug: string): Promise<Treatment | undefined> {
  const items = await getTreatments();
  return items.find((t) => t.slug === slug);
}

export async function getTreatmentSlugs(): Promise<string[]> {
  const items = await getTreatments();
  return items.map((t) => t.slug);
}
