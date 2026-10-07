import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/BlogPostPage";
import { I18nProvider } from "@/components/I18nProvider";
import { getBlogPost, getBlogSlugs } from "@/lib/cms";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];
  const slugs = await getBlogSlugs();
  for (const locale of TARGET_LOCALES) {
    for (const slug of slugs) {
      paths.push({ lang: locale.code, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = await getBlogPost(slug);
  if (!post) return { title: "Blog" };

  const memory = loadTranslationMemory();
  const title = translateText(post.title, lang, memory);
  const description = translateText(post.excerpt, lang, memory);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/blogs/${slug}/`,
      languages: {
        en: `https://www.canceronco.in/blogs/${slug}/`,
        hi: `https://www.canceronco.in/hi/blogs/${slug}/`,
        ar: `https://www.canceronco.in/ar/blogs/${slug}/`,
        ru: `https://www.canceronco.in/ru/blogs/${slug}/`,
        "x-default": `https://www.canceronco.in/blogs/${slug}/`,
      },
    },
  };
}

export default async function LocalizedBlogSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const post = await getBlogPost(slug);
  if (!post) notFound();

  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <BlogPostPage post={post} />
    </I18nProvider>
  );
}

