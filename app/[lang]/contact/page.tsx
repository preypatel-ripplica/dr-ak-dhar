import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ContactPage from "@/components/ContactPage";
import { I18nProvider } from "@/components/I18nProvider";
import { loadTranslationMemory, TARGET_LOCALES, translateText } from "@/lib/i18n";

type Props = { params: Promise<{ lang: string }> };

export function generateStaticParams() {
  return TARGET_LOCALES.map((l) => ({ lang: l.code }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const valid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!valid) return { title: "Contact" };

  const memory = loadTranslationMemory();
  const title = translateText("Contact & Appointments — Dr. A. K. Dhar", lang, memory);
  const description = translateText(
    "Contact Dr. (Brig.) A. K. Dhar’s clinic at Marengo Asia Hospitals, Gurugram — call, WhatsApp, or request an appointment online.",
    lang,
    memory
  );

  return {
    title,
    description,
    alternates: {
      canonical: `https://www.canceronco.in/${lang}/contact/`,
      languages: {
        en: "https://www.canceronco.in/contact/",
        hi: "https://www.canceronco.in/hi/contact/",
        ar: "https://www.canceronco.in/ar/contact/",
        ru: "https://www.canceronco.in/ru/contact/",
        "x-default": "https://www.canceronco.in/contact/",
      },
    },
  };
}

export default async function LocalizedContactPage({ params }: Props) {
  const { lang } = await params;
  const isValid = TARGET_LOCALES.some((l) => l.code === lang);
  if (!isValid) notFound();

  const memory = loadTranslationMemory();

  return (
    <I18nProvider locale={lang} memory={memory}>
      <ContactPage />
    </I18nProvider>
  );
}
