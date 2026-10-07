import memoryData from "../.cache/translation-memory.json";

export interface LocaleInfo {
  code: string;
  label: string;
  nativeLabel: string;
  dir: "ltr" | "rtl";
}

export const DEFAULT_LOCALE = "en";

export const LOCALES: LocaleInfo[] = [
  { code: "en", label: "English", nativeLabel: "English", dir: "ltr" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी", dir: "ltr" },
  { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  { code: "ru", label: "Russian", nativeLabel: "Русский", dir: "ltr" },
];

export const TARGET_LOCALES = LOCALES.filter((l) => l.code !== DEFAULT_LOCALE);
export const LOCALE_CODES = LOCALES.map((l) => l.code);

export function getLocaleMeta(code: string = DEFAULT_LOCALE): LocaleInfo {
  return LOCALES.find((l) => l.code === code) || LOCALES[0];
}

export function normalizeTranslationText(value: string | number): string {
  return String(value).replace(/\s+/g, " ").trim();
}

function sha256Hex16(str: string): string {
  const K = [
    0x428a2f98, 0x71374491, 0xb5c0fbcf, 0xe9b5dba5, 0x3956c25b, 0x59f111f1, 0x923f82a4, 0xab1c5ed5,
    0xd807aa98, 0x12835b01, 0x243185be, 0x550c7dc3, 0x72be5d74, 0x80deb1fe, 0x9bdc06a7, 0xc19bf174,
    0xe49b69c1, 0xefbe4786, 0x0fc19dc6, 0x240ca1cc, 0x2de92c6f, 0x4a7484aa, 0x5cb0a9dc, 0x76f988da,
    0x983e5152, 0xa831c66d, 0xb00327c8, 0xbf597fc7, 0xc6e00bf3, 0xd5a79147, 0x06ca6351, 0x14292967,
    0x27b70a85, 0x2e1b2138, 0x4d2c6dfc, 0x53380d13, 0x650a7354, 0x766a0abb, 0x81c2c92e, 0x92722c85,
    0xa2bfe8a1, 0xa81a664b, 0xc24b8b70, 0xc76c51a3, 0xd192e819, 0xd6990624, 0xf40e3585, 0x106aa070,
    0x19a4c116, 0x1e376c08, 0x2748774c, 0x34b0bcb5, 0x391c0cb3, 0x4ed8aa4a, 0x5b9cca4f, 0x682e6ff3,
    0x748f82ee, 0x78a5636f, 0x84c87814, 0x8cc70208, 0x90befffa, 0xa4506ceb, 0xbef9a3f7, 0xc67178f2
  ];

  const utf8: number[] = [];
  for (let i = 0; i < str.length; i++) {
    let c = str.charCodeAt(i);
    if (c < 0x80) utf8.push(c);
    else if (c < 0x800) utf8.push(0xc0 | (c >> 6), 0x80 | (c & 0x3f));
    else if (c < 0xd800 || c >= 0xe000) utf8.push(0xe0 | (c >> 12), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    else {
      i++;
      c = 0x10000 + (((c & 0x33f) << 10) | (str.charCodeAt(i) & 0x33f));
      utf8.push(0xf0 | (c >> 18), 0x80 | ((c >> 12) & 0x3f), 0x80 | ((c >> 6) & 0x3f), 0x80 | (c & 0x3f));
    }
  }

  const l = utf8.length;
  utf8.push(0x80);
  while ((utf8.length % 64) !== 56) utf8.push(0);
  const bitLen = l * 8;
  for (let i = 7; i >= 0; i--) utf8.push(Math.floor(bitLen / Math.pow(2, i * 8)) & 0xff);

  const H = [0x6a09e667, 0xbb67ae85, 0x3c6ef372, 0xa54ff53a, 0x510e527f, 0x9b05688c, 0x1f83d9ab, 0x5be0cd19];
  const W = new Array(64);

  for (let i = 0; i < utf8.length; i += 64) {
    for (let t = 0; t < 16; t++) {
      W[t] = (utf8[i + t * 4] << 24) | (utf8[i + t * 4 + 1] << 16) | (utf8[i + t * 4 + 2] << 8) | utf8[i + t * 4 + 3];
    }
    for (let t = 16; t < 64; t++) {
      const s0 = ((W[t - 15] >>> 7) | (W[t - 15] << 25)) ^ ((W[t - 15] >>> 18) | (W[t - 15] << 14)) ^ (W[t - 15] >>> 3);
      const s1 = ((W[t - 2] >>> 17) | (W[t - 2] << 15)) ^ ((W[t - 2] >>> 19) | (W[t - 2] << 13)) ^ (W[t - 2] >>> 10);
      W[t] = (W[t - 16] + s0 + W[t - 7] + s1) | 0;
    }

    let [a, b, c, d, e, f, g, h] = H;
    for (let t = 0; t < 64; t++) {
      const S1 = ((e >>> 6) | (e << 26)) ^ ((e >>> 11) | (e << 21)) ^ ((e >>> 25) | (e << 7));
      const ch = (e & f) ^ (~e & g);
      const temp1 = (h + S1 + ch + K[t] + W[t]) | 0;
      const S0 = ((a >>> 2) | (a << 30)) ^ ((a >>> 13) | (a << 19)) ^ ((a >>> 22) | (a << 10));
      const maj = (a & b) ^ (a & c) ^ (b & c);
      const temp2 = (S0 + maj) | 0;

      h = g; g = f; f = e; e = (d + temp1) | 0;
      d = c; c = b; b = a; a = (temp1 + temp2) | 0;
    }

    H[0] = (H[0] + a) | 0; H[1] = (H[1] + b) | 0; H[2] = (H[2] + c) | 0; H[3] = (H[3] + d) | 0;
    H[4] = (H[4] + e) | 0; H[5] = (H[5] + f) | 0; H[6] = (H[6] + g) | 0; H[7] = (H[7] + h) | 0;
  }

  const hex = H.slice(0, 2).map((n) => (n >>> 0).toString(16).padStart(8, "0")).join("");
  return hex.slice(0, 16);
}

export function getTranslationKey(value: string | number): string {
  const normalized = normalizeTranslationText(value);
  return sha256Hex16(normalized);
}

export type TranslationMemory = Record<string, Record<string, string>>;

const staticMemory = memoryData as unknown as TranslationMemory;

export function loadTranslationMemory(): TranslationMemory {
  return staticMemory;
}

export function translateText(text: string, locale: string = DEFAULT_LOCALE, memory?: TranslationMemory): string {
  if (!text || locale === DEFAULT_LOCALE) {
    return text;
  }
  const mem = memory || staticMemory;
  const key = getTranslationKey(text);
  const entry = mem[key];
  if (entry && entry[locale]) {
    return entry[locale];
  }
  return text;
}

export function stripLocaleFromPath(pathname: string = "/"): string {
  if (!pathname) return "/";
  const [pathWithoutHash, hash = ""] = pathname.split("#");
  const [pathWithoutQuery, query = ""] = pathWithoutHash.split("?");
  const segments = pathWithoutQuery.split("/").filter(Boolean);

  if (segments.length > 0 && LOCALE_CODES.includes(segments[0]) && segments[0] !== DEFAULT_LOCALE) {
    segments.shift();
  }

  const barePath = `/${segments.join("/")}`.replace(/\/$/, "") || "/";
  const queryPart = query ? `?${query}` : "";
  const hashPart = hash ? `#${hash}` : "";
  return `${barePath}${queryPart}${hashPart}`;
}

export function localizePath(pathname: string = "/", locale: string = DEFAULT_LOCALE): string {
  if (!pathname || /^(https?:|mailto:|tel:|#)/.test(pathname)) {
    return pathname;
  }
  const basePath = stripLocaleFromPath(pathname);
  if (locale === DEFAULT_LOCALE) {
    return basePath;
  }
  return basePath === "/" ? `/${locale}/` : `/${locale}${basePath}`;
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

const SKIPPED_KEY_SUFFIXES = ["url", "href", "src", "path", "image", "thumbnail", "icon", "id", "date"];

export function shouldSkipKey(keyName: string): boolean {
  if (SKIPPED_EXACT_KEYS.has(keyName)) return true;
  const lower = keyName.toLowerCase();
  for (const suffix of SKIPPED_KEY_SUFFIXES) {
    if (lower.endsWith(suffix) && lower !== "title" && lower !== "heading" && lower !== "subheading") {
      return true;
    }
  }
  return false;
}

export function translateObjectForLocale<T>(data: T, locale: string, memory?: TranslationMemory): T {
  if (locale === DEFAULT_LOCALE || !data) return data;
  const mem = memory || staticMemory;

  function processValue(val: unknown, keyName?: string): unknown {
    if (typeof val === "string") {
      if (keyName && shouldSkipKey(keyName)) return val;
      if (/^(https?:|mailto:|tel:|\/|\.\/|#)/.test(val.trim())) return val;
      return translateText(val, locale, mem);
    }
    if (Array.isArray(val)) {
      return val.map((item) => processValue(item, keyName));
    }
    if (val !== null && typeof val === "object") {
      const result: Record<string, unknown> = {};
      for (const [k, v] of Object.entries(val as Record<string, unknown>)) {
        result[k] = processValue(v, k);
      }
      return result;
    }
    return val;
  }

  return processValue(data) as T;
}
