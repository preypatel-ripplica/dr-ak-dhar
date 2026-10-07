import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/components/I18nProvider";
import { loadTranslationMemory } from "@/lib/i18n";

export const metadata: Metadata = {
  title: {
    default: "Dr. A. K. Dhar",
    template: "%s | Dr. A. K. Dhar",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const memory = loadTranslationMemory();
  return (
    <html lang="en">
      <body>
        <I18nProvider memory={memory}>{children}</I18nProvider>
      </body>
    </html>
  );
}
