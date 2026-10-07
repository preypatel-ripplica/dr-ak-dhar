import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentPage from "@/components/TreatmentPage";
import { I18nProvider } from "@/components/I18nProvider";
import { getTreatment, getTreatmentSlugs } from "@/lib/cms";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string; slug: string }> };

export async function generateStaticParams() {
  const paths: { lang: string; slug: string }[] = [];
  const slugs = await getTreatmentSlugs();
  for (const locale of TARGET_LOCALES) {
    for (const slug of slugs) {
      paths.push({ lang: locale.code, slug });
    }
  }
  return paths;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const treatment = await getTreatment(slug);
  if (!treatment) return { title: "Treatment" };

  const memory = loadTranslationMemory();
  const title = translateText(treatment.title, lang, memory);
  const description = translateText(treatment.summary, lang, memory);

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/treatments/${slug}/`,
      languages: {
        en: `https://www.canceronco.in/treatments/${slug}/`,
        hi: `https://www.canceronco.in/hi/treatments/${slug}/`,
        ar: `https://www.canceronco.in/ar/treatments/${slug}/`,
        ru: `https://www.canceronco.in/ru/treatments/${slug}/`,
        "x-default": `https://www.canceronco.in/treatments/${slug}/`,
      },
    },
  };
}

export default async function LocalizedTreatmentSlugPage({ params }: Props) {
  const { lang, slug } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const treatment = await getTreatment(slug);
  if (!treatment) notFound();

  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <TreatmentPage treatment={treatment} />
    </I18nProvider>
  );
}

