// One-off exporter: converts local content in data/*.ts into CMS entry
// JSON (docs/cms-seed/*.json) ready to paste into the CMS platform when
// creating the `blogs` and `treatments` collections.
// Run with: npx tsx scripts/export-cms-seed.mts
import fs from "node:fs";
import path from "node:path";
import { blogs } from "../data/blogs.js";
import { treatments } from "../data/treatments.js";

const outDir = path.join(process.cwd(), "docs", "cms-seed");
fs.mkdirSync(outDir, { recursive: true });

const blogEntries = blogs.map((post) => ({
  id: "",
  slug: post.slug,
  category: post.category,
  title: post.title,
  excerpt: post.excerpt,
  date: post.date,
  dateLabel: post.dateLabel,
  readTime: post.readTime,
  hero_image: {
    media_id: "",
    alt_text: post.imageAlt,
    name: post.image,
  },
  intro: post.intro,
  sections: post.sections,
  takeaway: post.takeaway,
  faqs: post.faqs.map(([q, a]) => ({ q, a })),
}));

const treatmentEntries = treatments.map((t) => ({
  slug: t.slug,
  title: t.title,
  shortTitle: t.shortTitle,
  readTime: t.readTime,
  headline: t.headline,
  headlineAccent: t.headlineAccent,
  summary: t.summary,
  cardText: t.cardText,
  hero_image: {
    media_id: "",
    alt_text: t.imageAlt,
    name: t.image,
  },
  overview: t.overview,
  symptoms: t.symptoms,
  whenToConsult: t.whenToConsult,
  diagnosis: t.diagnosis,
  checklist: t.checklist,
  approach: t.approach,
  journey: t.journey,
  timeline: t.timeline,
  faqs: t.faqs.map(([q, a]) => ({ q, a })),
}));

for (const [name, data] of Object.entries({ blogs: blogEntries, treatments: treatmentEntries })) {
  const file = path.join(outDir, `${name}.json`);
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`wrote ${file} (${(data as unknown[]).length} entries)`);
}
