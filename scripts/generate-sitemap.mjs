import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const SITE_URL = "https://www.canceronco.in";
const LOCALES = [
  { code: "en", prefix: "" },
  { code: "hi", prefix: "/hi" },
  { code: "ar", prefix: "/ar" },
  { code: "ru", prefix: "/ru" },
];

async function main() {
  const baseDir = process.cwd();
  const treatmentSlugs = (await import(pathToFileURL(path.join(baseDir, "data", "treatments.ts")).href)).getTreatmentSlugs();
  const blogSlugs = (await import(pathToFileURL(path.join(baseDir, "data", "blogs.ts")).href)).getBlogSlugs();

  const routes = [
    "/",
    "/about/",
    "/treatments/",
    "/blogs/",
    "/contact/",
    ...treatmentSlugs.map((slug) => `/treatments/${slug}/`),
    ...blogSlugs.map((slug) => `/blogs/${slug}/`),
  ];

  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const route of routes) {
    for (const locale of LOCALES) {
      const locPath = locale.code === "en" ? route : `${locale.prefix}${route}`;
      const locUrl = `${SITE_URL}${locPath}`;

      xml += `  <url>\n`;
      xml += `    <loc>${locUrl}</loc>\n`;

      for (const altLocale of LOCALES) {
        const altPath = altLocale.code === "en" ? route : `${altLocale.prefix}${route}`;
        const altUrl = `${SITE_URL}${altPath}`;
        xml += `    <xhtml:link rel="alternate" hreflang="${altLocale.code}" href="${altUrl}" />\n`;
      }

      const defaultUrl = `${SITE_URL}${route}`;
      xml += `    <xhtml:link rel="alternate" hreflang="x-default" href="${defaultUrl}" />\n`;
      xml += `  </url>\n`;
    }
  }

  xml += `</urlset>\n`;

  const publicDir = path.join(baseDir, "public");
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
  fs.writeFileSync(path.join(publicDir, "sitemap.xml"), xml, "utf-8");
  console.log(`Successfully generated public/sitemap.xml with ${routes.length * LOCALES.length} localized URLs.`);
}

main().catch((err) => {
  console.error("Error generating sitemap:", err);
  process.exit(1);
});
