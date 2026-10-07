import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "@/components/AboutPage";
import { I18nProvider } from "@/components/I18nProvider";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return TARGET_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const valid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!valid) return { title: "About" };

  const memory = loadTranslationMemory();
  const title = translateText("About Dr. (Brig.) A. K. Dhar — Medical Oncologist", lang, memory);
  const description = translateText(
    "Meet Dr. (Brig.) A. K. Dhar — Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, Gurugram, with over 35 years of experience in cancer care.",
    lang,
    memory
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/about/`,
      languages: {
        en: "https://www.canceronco.in/about/",
        hi: "https://www.canceronco.in/hi/about/",
        ar: "https://www.canceronco.in/ar/about/",
        ru: "https://www.canceronco.in/ru/about/",
        "x-default": "https://www.canceronco.in/about/",
      },
    },
  };
}

export default async function LocalizedAboutPage({ params }: Props) {
  const { lang } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <AboutPage />
    </I18nProvider>
  );
}
