"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LOCALES, localizePath, stripLocaleFromPath } from "@/lib/i18n";
import { useI18n } from "./I18nProvider";
import { Globe, ChevronDown } from "lucide-react";
import styles from "./LanguageSwitcher.module.css";

export default function LanguageSwitcher() {
  const { locale: currentLocale } = useI18n();
  const pathname = usePathname() || "/";
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const cleanPath = stripLocaleFromPath(pathname);

  useEffect(() => {
    const handlePointerDown = (event: MouseEvent | TouchEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // Close dropdown on pathname change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const currentMeta = LOCALES.find((l) => l.code === currentLocale) || LOCALES[0];

  return (
    <div className={styles.container} ref={containerRef}>
      <button
        type="button"
        className={styles.toggleButton}
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label="Select language"
      >
        <Globe size={16} className={styles.globeIcon} />
        <span>{currentMeta.nativeLabel}</span>
        <ChevronDown size={14} className={`${styles.chevronIcon} ${isOpen ? styles.chevronOpen : ""}`} />
      </button>

      {isOpen && (
        <div className={styles.menu}>
          {LOCALES.map((l) => {
            const href = localizePath(cleanPath, l.code);
            const isActive = l.code === currentLocale;

            return (
              <Link
                key={l.code}
                href={href}
                className={`${styles.menuItem} ${isActive ? styles.menuItemActive : ""}`}
                onClick={() => setIsOpen(false)}
              >
                <span className={styles.nativeLabel}>{l.nativeLabel}</span>
                <span className={styles.enLabel}>({l.label})</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
