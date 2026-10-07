# CMS Collections Documentation — Dr. (Brig.) A. K. Dhar Website

Two primary collections drive the CMS-connected sections of the site. Field keys must match the schema specified below — `lib/cms.ts` reads them by these exact names. Ready-to-paste seed JSON for every collection lives in `docs/cms-seed/`.

## Environment Setup

Configure the CMS connection in `.env.local` (see `.env.example`):

```env
CMS_API_URL=https://<your-cms-host>
CMS_API_TOKEN=<your-api-token>
```

If these environment variables are omitted or unreachable during static site generation (`npm run build`), `lib/cms.ts` seamlessly falls back to the static files in `data/blogs.ts` and `data/treatments.ts`, ensuring production builds never fail.

---

## 1. `blogs` Collection

One entry per blog post. Rendered at `/blogs` (index), `/blogs/[slug]` (detail), and localized routes (`/[lang]/blogs/[slug]`).

### Schema Skeleton

```json
{
  "slug": "",
  "title": "",
  "excerpt": "",
  "category": "",
  "date": "",
  "dateLabel": "",
  "readTime": "",
  "hero_image": {
    "media_id": "",
    "alt_text": "",
    "name": ""
  },
  "intro": "",
  "sections": [
    {
      "id": "",
      "heading": "",
      "paragraphs": [""],
      "bullets": [""]
    }
  ],
  "takeaway": "",
  "faqs": [
    {
      "q": "",
      "a": ""
    }
  ]
}
```

### Field Mapping Reference

| Field Key    | Required | Description / Example                                       |
| ------------ | -------- | ----------------------------------------------------------- |
| `slug`       | yes      | URL slug, e.g. `chemotherapy-vs-immunotherapy`              |
| `title`      | yes      | Article headline                                            |
| `category`   | yes      | Category chip, e.g. `Treatment guidance`                    |
| `excerpt`    | yes      | Short summary snippet for cards and meta description        |
| `date`       | yes      | ISO date format string (`2026-09-03`)                       |
| `dateLabel`  | yes      | Formatted display date (`3 Sep 2026`)                       |
| `readTime`   | no       | Reading time label (`6 min read`)                           |
| `hero_image` | yes      | Media object; fallback local path in `name` if `media_id` is empty |
| `intro`      | yes      | Opening introductory paragraph                              |
| `sections`   | yes      | Array of content sections (`id`, `heading`, `paragraphs`, `bullets`) |
| `takeaway`   | no       | Key summary box text                                        |
| `faqs`       | no       | Array of FAQ objects (`q`, `a`)                             |

Seed data: [`docs/cms-seed/blogs.json`](cms-seed/blogs.json)

---

## 2. `treatments` Collection

One entry per treatment pathway page. Rendered at `/treatments` (index), `/treatments/[slug]` (detail), and localized routes (`/[lang]/treatments/[slug]`).

### Schema Skeleton

```json
{
  "slug": "",
  "title": "",
  "shortTitle": "",
  "readTime": "",
  "headline": "",
  "headlineAccent": "",
  "summary": "",
  "cardText": "",
  "hero_image": {
    "media_id": "",
    "alt_text": "",
    "name": ""
  },
  "overview": {
    "title": "",
    "paragraphs": [""]
  },
  "symptoms": {
    "title": "",
    "intro": "",
    "items": [""],
    "note": ""
  },
  "whenToConsult": {
    "title": "",
    "items": [""]
  },
  "diagnosis": {
    "title": "",
    "intro": "",
    "items": [""]
  },
  "checklist": {
    "title": "",
    "subtitle": "",
    "items": [""]
  },
  "approach": {
    "title": "",
    "intro": "",
    "options": [
      {
        "title": "",
        "detail": ""
      }
    ]
  },
  "journey": {
    "title": "",
    "steps": [
      {
        "label": "",
        "title": "",
        "detail": ""
      }
    ]
  },
  "timeline": {
    "before": [""],
    "during": [""],
    "after": [""]
  },
  "faqs": [
    {
      "q": "",
      "a": ""
    }
  ]
}
```

Seed data: [`docs/cms-seed/treatments.json`](cms-seed/treatments.json)

---

## Re-exporting Seed Entries

To update the JSON seed files after modifying local content:

```bash
npx tsx scripts/export-cms-seed.mts
```
