import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { pathToFileURL } from "node:url";

let envFileApiKey = null;
let envFileModel = null;

function loadEnv() {
  for (const envFile of [".env.local", ".env"]) {
    const fullPath = path.join(process.cwd(), envFile);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, "utf-8");
      for (const line of content.split("\n")) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
          const [key, ...vals] = trimmed.split("=");
          const k = key.trim();
          const v = vals.join("=").trim().replace(/^["']|["']$/g, "");
          process.env[k] = v;
          if (k === "GEMINI_API_KEY") envFileApiKey = v;
          if (k === "GEMINI_TRANSLATION_MODEL" || k === "GEMINI_MODEL") envFileModel = v;
        }
      }
    }
  }
}

loadEnv();

const GEMINI_API_KEY = envFileApiKey;
const GEMINI_MODEL = envFileModel || "gemini-1.5-flash";
const BATCH_SIZE = parseInt(process.env.TRANSLATION_BATCH_SIZE || "60", 10);

const TARGET_LOCALES = [
  { code: "hi", name: "Hindi" },
  { code: "ar", name: "Arabic" },
  { code: "ru", name: "Russian" },
];

const MEMORY_FILE = path.join(process.cwd(), ".cache", "translation-memory.json");

function normalizeText(val) {
  return String(val).replace(/\s+/g, " ").trim();
}

function getTranslationKey(val) {
  return crypto.createHash("sha256").update(normalizeText(val)).digest("hex").slice(0, 16);
}

function loadMemory() {
  try {
    if (fs.existsSync(MEMORY_FILE)) {
      return JSON.parse(fs.readFileSync(MEMORY_FILE, "utf-8"));
    }
  } catch (err) {
    console.error("Error loading memory:", err);
  }
  return {};
}

function saveMemory(memory) {
  const dir = path.dirname(MEMORY_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2), "utf-8");
}

const SKIPPED_EXACT_KEYS = new Set([
  "slug",
  "id",
  "href",
  "url",
  "videoUrl",
  "canonical",
  "canonicalPath",
  "ogImage",
  "src",
  "image",
  "cardImage",
  "bannerImage",
  "authorImage",
  "videoThumbnail",
  "publishedAt",
  "publishedLabel",
  "access_key",
  "from_name",
  "date",
  "readTime",
  "duration",
]);

function shouldSkipKey(keyName) {
  if (SKIPPED_EXACT_KEYS.has(keyName)) return true;
  const lower = keyName.toLowerCase();
  for (const suffix of ["url", "href", "src", "path", "image", "thumbnail", "icon", "id", "date"]) {
    if (lower.endsWith(suffix) && lower !== "title" && lower !== "heading" && lower !== "subheading") {
      return true;
    }
  }
  return false;
}

function extractStringsFromObject(obj, keyName = "", results = new Set()) {
  if (!obj) return results;
  if (typeof obj === "string") {
    const trimmed = obj.trim();
    if (
      trimmed &&
      !shouldSkipKey(keyName) &&
      !/^(https?:|mailto:|tel:|\/|\.\/|#)/.test(trimmed) &&
      !/^[0-9\s.,+()-]+$/.test(trimmed)
    ) {
      results.add(normalizeText(trimmed));
    }
    return results;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) {
      extractStringsFromObject(item, keyName, results);
    }
    return results;
  }
  if (typeof obj === "object") {
    for (const [k, v] of Object.entries(obj)) {
      extractStringsFromObject(v, k, results);
    }
  }
  return results;
}

function shouldSkipString(s) {
  const trimmed = s.trim();
  if (!trimmed || trimmed.length < 2) return true;
  if (/^(https?:|mailto:|tel:|\/|\.\/|#)/.test(trimmed)) return true;
  if (/^[0-9\s.,+()%/\\:-]+$/.test(trimmed)) return true;
  if (/^(@\/|next\/|react|lucide-react|\.\/|\.\.\/)/.test(trimmed)) return true;
  if (/\.(jpg|jpeg|png|svg|webp|gif|css|module\.css|ts|tsx|js|mjs|json)$/.test(trimmed)) return true;
  if (/^(use client|module|export|import|styles|className|default|const|let|var|function|return|interface|type)$/.test(trimmed)) return true;
  if (/^[a-z0-9_-]+$/.test(trimmed) && !["about", "blogs", "contact", "treatments", "home"].includes(trimmed)) return true;
  if (/^[a-zA-Z0-9_-]+\/[a-zA-Z0-9_-]+$/.test(trimmed)) return true;
  return false;
}

function extractStringsFromFile(filePath) {
  const set = new Set();
  if (!fs.existsSync(filePath)) return set;
  const content = fs.readFileSync(filePath, "utf-8");

  // 1. Match t(...)
  for (const m of content.matchAll(/\bt\(\s*["'`\n]([^"'`]+)["'`\n]\s*\)/g)) {
    const s = normalizeText(m[1]);
    if (!shouldSkipString(s)) set.add(s);
  }

  // 2. Match single/double quoted strings inside objects/arrays
  for (const m of content.matchAll(/["']([^"'\n]{3,})["']/g)) {
    const s = normalizeText(m[1]);
    if (/[a-zA-Z]{2,}/.test(s) && !shouldSkipString(s)) {
      set.add(s);
    }
  }

  // 3. Match template literals
  for (const m of content.matchAll(/`([^`\n]{3,})`/g)) {
    const s = normalizeText(m[1]);
    if (/[a-zA-Z]{2,}/.test(s) && !shouldSkipString(s) && !s.includes("${")) {
      set.add(s);
    }
  }

  return set;
}

// Data loaders
async function loadScopeStrings(scope) {
  const set = new Set();
  const baseDir = process.cwd();

  if (scope === "shared-ui") {
    for (const f of ["SiteHeader.tsx", "SiteFooter.tsx", "AppointmentSection.tsx", "I18nProvider.tsx"]) {
      const p = path.join(baseDir, "components", f);
      extractStringsFromFile(p).forEach((s) => set.add(s));
    }
  }

  if (scope === "home") {
    const f1 = path.join(baseDir, "components", "HomeHero.tsx");
    const f2 = path.join(baseDir, "components", "HomeSections.tsx");
    extractStringsFromFile(f1).forEach((s) => set.add(s));
    extractStringsFromFile(f2).forEach((s) => set.add(s));
  }

  if (scope === "about") {
    const f = path.join(baseDir, "components", "AboutPage.tsx");
    extractStringsFromFile(f).forEach((s) => set.add(s));
  }

  if (scope === "treatments") {
    const f = path.join(baseDir, "components", "TreatmentPage.tsx");
    const fIndex = path.join(baseDir, "components", "TreatmentsIndex.tsx");
    extractStringsFromFile(f).forEach((s) => set.add(s));
    extractStringsFromFile(fIndex).forEach((s) => set.add(s));

    try {
      const fileUrl = pathToFileURL(path.join(baseDir, "lib", "cms.ts")).href;
      const getTreatments = (await import(fileUrl)).getTreatments;
      const treatmentsData = await getTreatments();
      extractStringsFromObject(treatmentsData, "", set);
    } catch (err) {
      console.error("Could not import CMS treatments data directly", err);
    }
  }

  if (scope === "blogs") {
    const f = path.join(baseDir, "components", "BlogPostPage.tsx");
    const fIndex = path.join(baseDir, "components", "BlogsIndex.tsx");
    extractStringsFromFile(f).forEach((s) => set.add(s));
    extractStringsFromFile(fIndex).forEach((s) => set.add(s));

    try {
      const fileUrl = pathToFileURL(path.join(baseDir, "lib", "cms.ts")).href;
      const getBlogPosts = (await import(fileUrl)).getBlogPosts;
      const blogsData = await getBlogPosts();
      extractStringsFromObject(blogsData, "", set);
    } catch (err) {
      console.error("Could not import CMS blogs data directly", err);
    }
  }

  if (scope === "contact") {
    const f = path.join(baseDir, "components", "ContactPage.tsx");
    extractStringsFromFile(f).forEach((s) => set.add(s));
  }

  return Array.from(set);
}

let cachedModel = null;

async function getBestAvailableModel(apiKey) {
  if (envFileModel || process.env.GEMINI_TRANSLATION_MODEL || process.env.GEMINI_MODEL) {
    return envFileModel || process.env.GEMINI_TRANSLATION_MODEL || process.env.GEMINI_MODEL;
  }
  if (cachedModel) return cachedModel;
  
  try {
    const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
    if (res.ok) {
      const data = await res.json();
      const models = (data.models || [])
        .filter((m) => m.supportedGenerationMethods?.includes("generateContent"))
        .map((m) => m.name.replace(/^models\//, ""));

      if (models.length > 0) {
        console.log(`Detected available models for API key: ${models.join(", ")}`);
        // Prefer flash models, then pro models
        const chosen = models.find((m) => m.includes("flash")) || models.find((m) => m.includes("pro")) || models[0];
        console.log(`Selected model: ${chosen}`);
        cachedModel = chosen;
        return chosen;
      }
    } else {
      const errText = await res.text();
      console.warn(`ListModels endpoint response status ${res.status}: ${errText}`);
    }
  } catch (e) {
    console.warn("Could not query ListModels API:", e.message);
  }
  
  cachedModel = envFileModel || process.env.GEMINI_TRANSLATION_MODEL || "gemini-1.5-flash";
  return cachedModel;
}

async function translateStringFree(text, targetLangCode) {
  try {
    const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${targetLangCode}&dt=t&q=${encodeURIComponent(text)}`;
    const res = await fetch(url);
    if (res.ok) {
      const data = await res.json();
      if (Array.isArray(data?.[0])) {
        return data[0].map((item) => item[0]).join("");
      }
    }
  } catch (err) {
    console.warn(`    ⚠️ Free translation error for "${text.slice(0, 20)}...":`, err.message);
  }
  return text;
}

async function callGeminiBatch(stringsBatch, targetLangName, retries = 2, delayMs = 3000) {
  if (!GEMINI_API_KEY) {
    throw new Error("No GEMINI_API_KEY provided.");
  }

  const prompt = `Translate the following JSON array of English strings into ${targetLangName}.
Return ONLY a raw JSON array of strings with the exact same length (${stringsBatch.length}) and exact same order.
Do NOT include markdown formatting like \`\`\`json.
Do NOT translate URLs, code, technical IDs, phone numbers, or email addresses.

Input JSON:
${JSON.stringify(stringsBatch, null, 2)}`;

  const modelCandidates = Array.from(
    new Set(
      [
        envFileModel,
        process.env.GEMINI_TRANSLATION_MODEL,
        "gemini-2.5-flash",
        "gemini-2.0-flash",
        "gemini-2.0-flash-exp",
        "gemini-1.5-flash-latest",
        "gemini-1.5-flash-002",
        "gemini-1.5-flash-001",
        "gemini-1.5-flash",
        "gemini-1.5-pro-latest",
        "gemini-1.5-pro",
      ].filter(Boolean)
    )
  );

  const apiVersions = ["v1beta", "v1"];
  let lastError = null;

  for (const activeModel of modelCandidates) {
    for (const apiVer of apiVersions) {
      const url = `https://generativelanguage.googleapis.com/${apiVer}/models/${activeModel}:generateContent?key=${GEMINI_API_KEY}`;

      for (let attempt = 1; attempt <= retries; attempt++) {
        try {
          const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { temperature: 0.1 },
            }),
          });

          if (response.status === 404) {
            lastError = new Error(`Model ${activeModel} (${apiVer}) returned 404`);
            break;
          }

          if (response.status === 429) {
            const backoff = delayMs * attempt;
            console.warn(`    ⚠️ Rate limit (429) on ${activeModel}. Waiting ${backoff / 1000}s...`);
            await new Promise((res) => setTimeout(res, backoff));
            continue;
          }

          if (!response.ok) {
            const errText = await response.text();
            throw new Error(`Gemini API call failed (${response.status}): ${errText}`);
          }

          const resJson = await response.json();
          const text = resJson.candidates?.[0]?.content?.parts?.[0]?.text || "";
          const cleaned = text.replace(/^```json\s*/, "").replace(/```\s*$/, "").trim();

          let parsed = JSON.parse(cleaned);
          if (!Array.isArray(parsed) || parsed.length !== stringsBatch.length) {
            throw new Error(`Gemini response length mismatch.`);
          }

          await new Promise((res) => setTimeout(res, 1500));
          return parsed;
        } catch (err) {
          if (err.message.includes("returned 404")) break;
          if (attempt === retries) lastError = err;
          await new Promise((res) => setTimeout(res, 2000));
        }
      }
    }
  }

  throw lastError || new Error("Gemini API models returned 404.");
}

async function translateBatchWithFallback(batch, localeObj) {
  try {
    return await callGeminiBatch(batch, localeObj.name);
  } catch (err) {
    console.warn(`    ℹ️ Gemini API unavailable (${err.message}). Using high-speed translation engine...`);
    const results = [];
    for (const item of batch) {
      const translated = await translateStringFree(item, localeObj.code);
      results.push(translated);
      // Small pause to prevent rate limiting on public endpoint
      await new Promise((res) => setTimeout(res, 100));
    }
    return results;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const isDryRun = args.includes("--dry-run");

  const scopeArg = args.find((a) => a.startsWith("--scope="));
  const scopes = scopeArg
    ? scopeArg.replace("--scope=", "").split(",")
    : ["shared-ui", "home", "about", "treatments", "blogs", "contact"];

  console.log(`Starting translation pipeline... (dry-run: ${isDryRun}, scopes: ${scopes.join(", ")})`);

  const memory = loadMemory();
  let totalMissing = 0;

  for (const scope of scopes) {
    const strings = await loadScopeStrings(scope);
    console.log(`\nScope [${scope}]: ${strings.length} extracted strings.`);

    for (const localeObj of TARGET_LOCALES) {
      const missingStrings = [];
      for (const str of strings) {
        const key = getTranslationKey(str);
        if (!memory[key] || !memory[key][localeObj.code]) {
          missingStrings.push(str);
        }
      }

      console.log(`  Locale [${localeObj.code} (${localeObj.name})]: ${missingStrings.length} missing strings.`);
      totalMissing += missingStrings.length;

      if (isDryRun || missingStrings.length === 0) {
        continue;
      }

      // Process in batches
      for (let i = 0; i < missingStrings.length; i += BATCH_SIZE) {
        const batch = missingStrings.slice(i, i + BATCH_SIZE);
        console.log(`    Translating batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(missingStrings.length / BATCH_SIZE)} (${batch.length} items)...`);

        try {
          const translations = await translateBatchWithFallback(batch, localeObj);
          for (let j = 0; j < batch.length; j++) {
            const orig = batch[j];
            const trans = translations[j];
            const key = getTranslationKey(orig);

            if (!memory[key]) {
              memory[key] = { en: orig };
            }
            memory[key][localeObj.code] = trans;
          }
          saveMemory(memory);
          console.log(`    ✓ Saved batch to translation memory.`);
        } catch (err) {
          console.error(`    ✗ Batch translation failed:`, err.message);
          break;
        }
      }
    }
  }

  console.log(`\n========================================`);
  if (isDryRun) {
    console.log(`Dry run complete. Total missing strings across selected scopes: ${totalMissing}`);
  } else {
    console.log(`Translation run complete. Total missing remaining: ${totalMissing}`);
  }
  console.log(`========================================\n`);
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
