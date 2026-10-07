"use client";

import React, { createContext, useContext, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { DEFAULT_LOCALE, getLocaleMeta, LOCALE_CODES, localizePath, translateText, TranslationMemory } from "@/lib/i18n";

interface I18nContextType {
  locale: string;
  dir: "ltr" | "rtl";
  t: (text: string) => string;
  localizeHref: (href: string) => string;
  memory?: TranslationMemory;
}

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  dir: "ltr",
  t: (text: string) => text,
  localizeHref: (href: string) => href,
});

export function I18nProvider({
  locale,
  memory,
  children,
}: {
  locale?: string;
  memory?: TranslationMemory;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const activeLocale = useMemo(() => {
    if (locale) return locale;
    if (!pathname) return DEFAULT_LOCALE;
    const firstSegment = pathname.split("/").filter(Boolean)[0];
    if (firstSegment && LOCALE_CODES.includes(firstSegment)) {
      return firstSegment;
    }
    return DEFAULT_LOCALE;
  }, [locale, pathname]);

  const meta = useMemo(() => getLocaleMeta(activeLocale), [activeLocale]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = meta.code;
      document.documentElement.dir = meta.dir;
    }
  }, [meta.code, meta.dir]);

  const value = useMemo(
    () => ({
      locale: meta.code,
      dir: meta.dir,
      t: (text: string) => translateText(text, meta.code, memory),
      localizeHref: (href: string) => localizePath(href, meta.code),
      memory,
    }),
    [meta.code, meta.dir, memory]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}
