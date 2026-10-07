import type { Metadata } from "next";
import { notFound } from "next/navigation";
import TreatmentsIndex from "@/components/TreatmentsIndex";
import { I18nProvider } from "@/components/I18nProvider";
import { getTreatments } from "@/lib/cms";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return TARGET_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const valid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!valid) return { title: "Treatments" };

  const memory = loadTranslationMemory();
  const title = translateText("Cancer Treatments & Care Pathways", lang, memory);
  const description = translateText(
    "Explore breast cancer, blood cancer, lung cancer, head & neck cancer, immunotherapy, and targeted therapy care with Dr. (Brig.) A. K. Dhar in Gurugram.",
    lang,
    memory
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/treatments/`,
      languages: {
        en: "https://www.canceronco.in/treatments/",
        hi: "https://www.canceronco.in/hi/treatments/",
        ar: "https://www.canceronco.in/ar/treatments/",
        ru: "https://www.canceronco.in/ru/treatments/",
        "x-default": "https://www.canceronco.in/treatments/",
      },
    },
  };
}

export default async function LocalizedTreatmentsPage({ params }: Props) {
  const { lang } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const items = await getTreatments();
  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <TreatmentsIndex items={items} />
    </I18nProvider>
  );
}

