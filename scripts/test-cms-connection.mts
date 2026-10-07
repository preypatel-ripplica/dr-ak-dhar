// CMS Connection Test Script
// Verifies whether CMS_API_URL and CMS_API_TOKEN are configured and
// attempts to fetch the `blogs` and `treatments` collections.
// Run with: npx tsx scripts/test-cms-connection.mts

import fs from "fs";
import path from "path";

// Simple env loader
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...valParts] = trimmed.split("=");
    if (key) {
      let val = valParts.join("=").trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key.trim()] = val;
    }
  }
}

const CMS_API_URL = process.env.CMS_API_URL;
const CMS_API_TOKEN = process.env.CMS_API_TOKEN;

console.log("========================================");
console.log("Testing CMS Connection...");
console.log("========================================");

if (!CMS_API_URL || !CMS_API_TOKEN) {
  console.log("⚠️ CMS is NOT connected (falling back to local data/ content).");
  console.log("Reason: CMS_API_URL or CMS_API_TOKEN is missing in .env.local\n");
  console.log("To connect your CMS portal:");
  console.log("1. Open .env.local");
  console.log("2. Set CMS_API_URL=https://your-ngrok-or-cms-url");
  console.log("3. Set CMS_API_TOKEN=your_token_here");
  process.exit(0);
}

console.log(`CMS_API_URL: ${CMS_API_URL}`);
console.log(`CMS_API_TOKEN: ${CMS_API_TOKEN.slice(0, 5)}...${CMS_API_TOKEN.slice(-4)}\n`);

async function testFetch(collectionSlug: string) {
  let baseUrl = CMS_API_URL!.replace(/\/$/, "");
  try {
    baseUrl = new URL(CMS_API_URL!).origin;
  } catch {}
  const url = `${baseUrl}/api/content.entries.list`;
  console.log(`Fetching collection "${collectionSlug}" from ${url}...`);

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${CMS_API_TOKEN}`,
        "ngrok-skip-browser-warning": "true",
      },
      body: JSON.stringify({
        collection_slug: collectionSlug,
        page_size: 100,
      }),
    });

    if (!res.ok) {
      console.error(`❌ Request failed with HTTP status ${res.status}: ${await res.text()}`);
      return;
    }

    const data = await res.json();
    const entries = Array.isArray(data) ? data : data?.entries || data?.data || data?.items || [];
    console.log(`✅ Success! Found ${entries.length} entries in "${collectionSlug}".`);
    for (const item of entries) {
      const e = item.entry || item;
      console.log(`   - [${e.slug || "no-slug"}] ${e.title || "Untitled"}`);
    }
  } catch (err) {
    console.error(`❌ Error fetching collection "${collectionSlug}":`, (err as Error).message);
  }
}

async function main() {
  await testFetch("blogs");
  console.log("");
  await testFetch("treatments");
  console.log("\n========================================");
}

main();
