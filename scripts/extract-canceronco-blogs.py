#!/usr/bin/env python3
"""Extract blogs from canceronco.in into data/blogs.ts format."""

from __future__ import annotations

import json
import re
import time
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
OUT_TS = ROOT / "data" / "blogs.ts"
IMG_DIR = ROOT / "public" / "images" / "blogs"
CACHE = Path("/tmp/canceronco-blogs")
CACHE.mkdir(parents=True, exist_ok=True)

UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36"
SKIP_SLUGS = {
    "blogs",
    "about",
    "contact",
    "services",
    "news-articles",
    "category",
    "tag",
    "author",
    "page",
    "feed",
    "comments",
    "wp-content",
    "wp-includes",
    "wp-json",
}


def fetch(url: str) -> str:
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=40) as res:
        return res.read().decode("utf-8", errors="ignore")


def strip_tags(html: str) -> str:
    import html as html_lib

    text = re.sub(r"<(?:script|style)[^>]*>.*?</(?:script|style)>", " ", html, flags=re.I | re.S)
    text = re.sub(r"<br\s*/?>", "\n", text, flags=re.I)
    text = re.sub(r"</p>|</div>|</li>|</h[1-6]>", "\n", text, flags=re.I)
    text = re.sub(r"<li[^>]*>", "• ", text, flags=re.I)
    text = re.sub(r"<[^>]+>", " ", text)
    text = html_lib.unescape(text)
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n\s*\n+", "\n\n", text)
    return text.strip()


def slugify_heading(text: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", text.lower()).strip("-")
    return s[:60] or "section"


def list_posts() -> list[dict]:
    posts: list[dict] = []
    seen: set[str] = set()
    for page in ["", "page/2/", "page/3/", "page/4/"]:
        url = f"https://canceronco.in/blogs/{page}"
        print(f"Listing {url}")
        try:
            html = fetch(url)
        except Exception as exc:
            print(f"  skip page: {exc}")
            continue
        (CACHE / f"list-{page.replace('/', '-') or '1'}.html").write_text(html)
        for m in re.finditer(
            r'<h[23][^>]*>\s*<a[^>]+href=["\'](https://canceronco\.in/([^/"\']+)/?)["\'][^>]*>(.*?)</a>',
            html,
            re.I | re.S,
        ):
            url_p, slug, title_html = m.group(1), m.group(2).lower(), m.group(3)
            if slug in seen or slug in SKIP_SLUGS:
                continue
            title = strip_tags(title_html)
            if not title or len(title) < 8:
                continue
            seen.add(slug)
            after = html[m.end() : m.end() + 1200]
            before = html[max(0, m.start() - 800) : m.start()]
            ex = re.search(r"<p[^>]*>(.*?)</p>", after, re.S | re.I)
            excerpt = strip_tags(ex.group(1)) if ex else ""
            dt = re.search(r'datetime=["\']([^"\']+)["\']', before + after)
            date = dt.group(1) if dt else ""
            img = re.search(
                r'<img[^>]+(?:src|data-src|data-lazy-src)=["\']([^"\']+)["\']',
                before[-500:] + after[:500],
                re.I,
            )
            image = img.group(1) if img else ""
            posts.append(
                {
                    "slug": slug,
                    "url": url_p.rstrip("/") + "/",
                    "title": title,
                    "excerpt": excerpt,
                    "date": date,
                    "image": image,
                }
            )
        time.sleep(0.4)
    return posts


def extract_blocks(html_chunk: str) -> tuple[list[str], list[str]]:
    text = strip_tags(html_chunk)
    if not text:
        return [], []
    blocks = [b.strip() for b in text.split("\n\n") if b.strip()]
    paragraphs: list[str] = []
    bullets: list[str] = []
    for block in blocks:
        lines = [ln.strip() for ln in block.split("\n") if ln.strip()]
        if lines and all(ln.startswith("• ") for ln in lines):
            bullets.extend(ln[2:].strip() for ln in lines if ln[2:].strip())
        elif len(lines) > 1 and sum(1 for ln in lines if ln.startswith("• ")) >= max(1, len(lines) - 1):
            for ln in lines:
                if ln.startswith("• "):
                    if ln[2:].strip():
                        bullets.append(ln[2:].strip())
                else:
                    paragraphs.append(ln)
        else:
            paragraphs.append(" ".join(lines))
    return paragraphs, bullets


def extract_content(html: str) -> dict:
    patterns = [
        r'<div[^>]+class=["\'][^"\']*entry-content[^"\']*["\'][^>]*>(.*?)</div>\s*(?:<footer|<div class=["\'](?:post-nav|sharedaddy|jp-relatedposts|elementor))',
        r'<div[^>]+class=["\'][^"\']*entry-content[^"\']*["\'][^>]*>(.*?)(?:</article>|</main>)',
        r"<article[^>]*>(.*?)</article>",
    ]
    body = ""
    for pat in patterns:
        m = re.search(pat, html, re.I | re.S)
        if m:
            body = m.group(1)
            break
    if not body:
        body = html

    body = re.sub(
        r'<div[^>]+class=["\'][^"\']*(?:sharedaddy|jp-relatedposts|post-nav)[^"\']*["\'][^>]*>.*?</div>',
        " ",
        body,
        flags=re.I | re.S,
    )

    img = re.search(r'<img[^>]+(?:src|data-src)=["\']([^"\']+)["\']', body, re.I)
    content_image = img.group(1) if img else ""

    # Use H2 as main sections; fold H3 content into the parent H2.
    parts = re.split(r"(<h2[^>]*>.*?</h2>)", body, flags=re.I | re.S)
    intro_html = parts[0] if parts else body
    # Drop a leading H2 that repeats the page title inside content
    intro_paras = [p.strip() for p in strip_tags(intro_html).split("\n\n") if p.strip()]
    intro = intro_paras[0] if intro_paras else strip_tags(intro_html)[:400]

    sections = []
    used_ids: set[str] = set()
    i = 1
    while i < len(parts):
        heading = strip_tags(parts[i])
        content_html = parts[i + 1] if i + 1 < len(parts) else ""
        i += 2
        if not heading or len(heading) < 3:
            continue
        if heading.lower() in {"share this", "related posts", "leave a reply", "leave a comment", "faqs", "faq"}:
            continue

        # Split inner content by h3 and merge
        subparts = re.split(r"(<h3[^>]*>.*?</h3>)", content_html, flags=re.I | re.S)
        paragraphs: list[str] = []
        bullets: list[str] = []

        lead_paras, lead_bullets = extract_blocks(subparts[0] if subparts else content_html)
        paragraphs.extend(lead_paras)
        bullets.extend(lead_bullets)

        j = 1
        while j < len(subparts):
            sub_heading = strip_tags(subparts[j])
            sub_html = subparts[j + 1] if j + 1 < len(subparts) else ""
            j += 2
            if not sub_heading:
                continue
            paragraphs.append(sub_heading)
            sub_paras, sub_bullets = extract_blocks(sub_html)
            paragraphs.extend(sub_paras)
            bullets.extend(sub_bullets)

        if not paragraphs and not bullets:
            continue

        sid = slugify_heading(heading)
        base = sid
        n = 2
        while sid in used_ids:
            sid = f"{base}-{n}"
            n += 1
        used_ids.add(sid)
        section = {"id": sid, "heading": heading, "paragraphs": paragraphs or [" "]}
        if bullets:
            section["bullets"] = bullets
        sections.append(section)

    if not sections and len(intro_paras) > 1:
        for idx, para in enumerate(intro_paras[1:6], start=1):
            sections.append({"id": f"section-{idx}", "heading": f"Key point {idx}", "paragraphs": [para]})
        intro = intro_paras[0]

    title = ""
    for pat in [
        r'property=["\']og:title["\'][^>]*content=["\']([^"\']+)',
        r'content=["\']([^"\']+)["\'][^>]*property=["\']og:title["\']',
        r"<title>(.*?)</title>",
    ]:
        m = re.search(pat, html, re.I | re.S)
        if m:
            title = strip_tags(m.group(1))
            title = re.sub(r"\s*[|\-–].*Dr\.?\s*A\.?\s*K\.?\s*Dhar.*$", "", title, flags=re.I).strip()
            if title and title.lower() not in {"dr. a k dhar", "dr a k dhar"}:
                break

    date = ""
    for pat in [
        r'property=["\']article:published_time["\'][^>]*content=["\']([^"\']+)',
        r'content=["\']([^"\']+)["\'][^>]*property=["\']article:published_time["\']',
        r'"datePublished"\s*:\s*"([^"]+)"',
        r'<time[^>]+datetime=["\']([^"\']+)["\']',
    ]:
        m = re.search(pat, html, re.I)
        if m:
            date = m.group(1)
            break

    cat_m = re.search(r'rel=["\']category[^"\']*["\'][^>]*>(.*?)</a>', html, re.I | re.S)
    category = strip_tags(cat_m.group(1)) if cat_m else "Cancer care"

    return {
        "title": title,
        "date": date,
        "category": category,
        "intro": intro,
        "sections": sections,
        "content_image": content_image,
        "all_text_paras": intro_paras,
    }


def download_image(url: str, slug: str) -> str | None:
    if not url:
        return None
    if url.startswith("//"):
        url = "https:" + url
    ext = ".jpg"
    lower = url.lower().split("?")[0]
    for e in (".webp", ".png", ".jpeg", ".jpg"):
        if lower.endswith(e):
            ext = e
            break
    dest = IMG_DIR / f"{slug}{ext}"
    if dest.exists() and dest.stat().st_size > 2000:
        return f"/images/blogs/{dest.name}"
    try:
        req = urllib.request.Request(url, headers={"User-Agent": UA})
        with urllib.request.urlopen(req, timeout=40) as res:
            data = res.read()
        if len(data) < 1000:
            return None
        dest.write_bytes(data)
        print(f"  image -> {dest.name} ({len(data)} bytes)")
        return f"/images/blogs/{dest.name}"
    except Exception as exc:
        print(f"  image fail: {exc}")
        return None


def estimate_read_time(text: str) -> str:
    words = len(re.findall(r"\w+", text))
    mins = max(4, min(12, round(words / 200) or 4))
    return f"{mins} min read"


def format_date_label(iso: str) -> str:
    # 2026-09-07T10:11:12+00:00 or similar
    m = re.match(r"(\d{4})-(\d{2})-(\d{2})", iso or "")
    if not m:
        return "2026"
    y, mo, d = m.groups()
    months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    return f"{int(d)} {months[int(mo) - 1]} {y}"


def js_str(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def build_faqs(title: str, sections: list[dict], intro: str) -> list[tuple[str, str]]:
    faqs: list[tuple[str, str]] = []
    # Prefer Q-like headings
    for sec in sections:
        h = sec["heading"].rstrip("?")
        if "?" in sec["heading"] or h.lower().startswith(("what", "when", "how", "why", "can", "is ", "do ", "does")):
            ans = " ".join(sec.get("paragraphs") or [])
            if ans:
                faqs.append((sec["heading"].rstrip("?") + "?", ans[:420]))
        if len(faqs) >= 4:
            break
    if len(faqs) < 3:
        faqs.append(
            (
                f"Who should read this article about {title.split(':')[0].strip()}?",
                "Patients, caregivers, and families looking for clear guidance before or during cancer care. It is educational and does not replace a personal consultation.",
            )
        )
        faqs.append(
            (
                "Should I discuss this with a medical oncologist?",
                "Yes. Bring your reports and questions to a specialist consultation so recommendations can be tailored to your diagnosis, stage, and overall health.",
            )
        )
        faqs.append(
            (
                "Where does Dr. A. K. Dhar consult?",
                "Dr. (Brig.) A. K. Dhar consults at Marengo Asia Hospitals, Gurugram. The clinic team can help confirm appointments and next steps.",
            )
        )
    return faqs[:5]


def fallback_image(slug: str, idx: int) -> str:
    pool = [
        "/images/treatments/breast-cancer.jpg",
        "/images/treatments/immunotherapy.jpg",
        "/images/treatments/targeted-therapy.jpg",
        "/images/treatments/lung-cancer.jpg",
        "/images/treatments/blood-cancer.jpg",
        "/images/treatments/head-neck-cancer.jpg",
        "/images/marengo-asia-hospitals.jpg",
    ]
    return pool[idx % len(pool)]


def to_ts(posts: list[dict]) -> str:
    chunks = []
    for post in posts:
        sections_js = []
        for sec in post["sections"]:
            paras = ",\n".join(f"          {js_str(p)}" for p in sec["paragraphs"])
            block = f"""      {{
        id: {js_str(sec['id'])},
        heading: {js_str(sec['heading'])},
        paragraphs: [
{paras}
        ],"""
            if sec.get("bullets"):
                bullets = ",\n".join(f"          {js_str(b)}" for b in sec["bullets"])
                block += f"""
        bullets: [
{bullets}
        ],"""
            block += "\n      }"
            sections_js.append(block)
        faq_parts = []
        for q, a in post["faqs"]:
            faq_parts.append("      [\n        " + js_str(q) + ",\n        " + js_str(a) + ",\n      ]")
        faqs_js = ",\n".join(faq_parts)
        date_value = post["date"][:10] if post["date"] else "2026-01-01"
        sections_joined = ",\n".join(sections_js)
        chunk = "  {\n"
        chunk += f"    slug: {js_str(post['slug'])},\n"
        chunk += f"    title: {js_str(post['title'])},\n"
        chunk += f"    excerpt: {js_str(post['excerpt'])},\n"
        chunk += f"    category: {js_str(post['category'])},\n"
        chunk += f"    date: {js_str(date_value)},\n"
        chunk += f"    dateLabel: {js_str(post['dateLabel'])},\n"
        chunk += f"    readTime: {js_str(post['readTime'])},\n"
        chunk += f"    image: {js_str(post['image'])},\n"
        chunk += f"    imageAlt: {js_str(post['imageAlt'])},\n"
        chunk += f"    intro: {js_str(post['intro'])},\n"
        chunk += "    sections: [\n" + sections_joined + "\n    ],\n"
        chunk += f"    takeaway: {js_str(post['takeaway'])},\n"
        chunk += "    faqs: [\n" + faqs_js + "\n    ],\n"
        chunk += "  }"
        chunks.append(chunk)

    joined = ",\n".join(chunks)
    return (
        "export type BlogSection = {\n"
        "  id: string;\n"
        "  heading: string;\n"
        "  paragraphs: string[];\n"
        "  bullets?: string[];\n"
        "};\n\n"
        "export type BlogPost = {\n"
        "  slug: string;\n"
        "  title: string;\n"
        "  excerpt: string;\n"
        "  category: string;\n"
        "  date: string;\n"
        "  dateLabel: string;\n"
        "  readTime: string;\n"
        "  image: string;\n"
        "  imageAlt: string;\n"
        "  intro: string;\n"
        "  sections: BlogSection[];\n"
        "  takeaway: string;\n"
        "  faqs: [string, string][];\n"
        "};\n\n"
        "export const blogs: BlogPost[] = [\n"
        f"{joined}\n"
        "];\n\n"
        "export function getBlog(slug: string) {\n"
        "  return blogs.find((item) => item.slug === slug);\n"
        "}\n\n"
        "export function getBlogSlugs() {\n"
        "  return blogs.map((item) => item.slug);\n"
        "}\n"
    )


def main() -> None:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    listed = list_posts()
    print(f"\nFound {len(listed)} posts on listing pages\n")
    if not listed:
        raise SystemExit("No posts found")

    built: list[dict] = []
    for idx, item in enumerate(listed):
        print(f"[{idx+1}/{len(listed)}] {item['slug']}")
        cache_file = CACHE / f"post-{item['slug']}.html"
        try:
            if cache_file.exists() and cache_file.stat().st_size > 1000:
                html = cache_file.read_text(errors="ignore")
            else:
                html = fetch(item["url"])
                cache_file.write_text(html)
        except Exception as exc:
            print(f"  fail fetch: {exc}")
            continue
        content = extract_content(html)
        title = content["title"] or item["title"]
        if title.lower() in {"dr. a k dhar", "dr a k dhar", "blogs"}:
            title = item["title"]
        date = content["date"] or item["date"] or "2026-01-01"
        category = content["category"] or "Cancer care"
        intro = content["intro"] or item["excerpt"]
        sections = content["sections"]
        if not sections:
            # last resort: chunk excerpt/body
            paras = content["all_text_paras"] or [item["excerpt"]]
            intro = paras[0]
            sections = [
                {
                    "id": "details",
                    "heading": "What you should know",
                    "paragraphs": paras[1:] or paras,
                }
            ]

        img_url = item.get("image") or content.get("content_image") or ""
        local_img = download_image(img_url, item["slug"]) or fallback_image(item["slug"], idx)

        full_text = " ".join([intro] + [" ".join(s.get("paragraphs") or []) for s in sections])
        takeaway = sections[-1]["paragraphs"][-1] if sections and sections[-1].get("paragraphs") else intro
        if len(takeaway) > 320:
            takeaway = takeaway[:317].rsplit(" ", 1)[0] + "…"

        excerpt = item["excerpt"] or intro
        if len(excerpt) > 260:
            excerpt = excerpt[:257].rsplit(" ", 1)[0] + "…"

        built.append(
            {
                "slug": item["slug"],
                "title": title,
                "excerpt": excerpt,
                "category": category.title() if category.lower() != "uncategorized" else "Cancer care",
                "date": date,
                "dateLabel": format_date_label(date),
                "readTime": estimate_read_time(full_text),
                "image": local_img,
                "imageAlt": title,
                "intro": intro,
                "sections": sections,
                "takeaway": takeaway,
                "faqs": build_faqs(title, sections, intro),
            }
        )
        time.sleep(0.35)

    print(f"\nBuilt {len(built)} posts")
    OUT_TS.write_text(to_ts(built))
    print(f"Wrote {OUT_TS}")
    (CACHE / "built.json").write_text(json.dumps(built, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()
