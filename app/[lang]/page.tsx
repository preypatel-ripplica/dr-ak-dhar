import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeHero from "@/components/HomeHero";
import { I18nProvider } from "@/components/I18nProvider";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return TARGET_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const valid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!valid) return { title: "Dr. A. K. Dhar" };

  const memory = loadTranslationMemory();
  const title = translateText("Dr. A. K. Dhar — Medical Oncologist in Gurugram", lang, memory);
  const description = translateText(
    "Expert medical oncology care for cancer patients in Gurugram and Delhi NCR with Dr. (Brig.) A. K. Dhar.",
    lang,
    memory
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/`,
      languages: {
        en: "https://www.canceronco.in/",
        hi: "https://www.canceronco.in/hi/",
        ar: "https://www.canceronco.in/ar/",
        ru: "https://www.canceronco.in/ru/",
        "x-default": "https://www.canceronco.in/",
      },
    },
  };
}

export default async function LocalizedHomePage({ params }: Props) {
  const { lang } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <HomeHero />
    </I18nProvider>
  );
}
