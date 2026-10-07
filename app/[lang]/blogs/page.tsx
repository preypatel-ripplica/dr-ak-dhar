import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogsIndex from "@/components/BlogsIndex";
import { I18nProvider } from "@/components/I18nProvider";
import { getBlogPosts } from "@/lib/cms";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return TARGET_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const valid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!valid) return { title: "Blogs" };

  const memory = loadTranslationMemory();
  const title = translateText("Cancer Care Articles & Guidance", lang, memory);
  const description = translateText(
    "Cancer care articles from Dr. (Brig.) A. K. Dhar — treatment choices, second opinions, and guidance for patients and families in Gurugram.",
    lang,
    memory
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/blogs/`,
      languages: {
        en: "https://www.canceronco.in/blogs/",
        hi: "https://www.canceronco.in/hi/blogs/",
        ar: "https://www.canceronco.in/ar/blogs/",
        ru: "https://www.canceronco.in/ru/blogs/",
        "x-default": "https://www.canceronco.in/blogs/",
      },
    },
  };
}

export default async function LocalizedBlogsPage({ params }: Props) {
  const { lang } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const posts = await getBlogPosts();
  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <BlogsIndex posts={posts} />
    </I18nProvider>
  );
}

