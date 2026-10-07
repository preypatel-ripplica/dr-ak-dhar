"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import styles from "./HomeHero.module.css";
import LanguageSwitcher from "./LanguageSwitcher";
import { useI18n } from "./I18nProvider";

const treatments = [
  ["Breast cancer", "breast-cancer"],
  ["Blood cancer", "blood-cancer"],
  ["Lung cancer", "lung-cancer"],
  ["Head & neck cancer", "head-neck-cancer"],
  ["Immunotherapy", "immunotherapy"],
  ["Targeted therapy", "targeted-therapy"],
];

type SiteHeaderProps = {
  active?: "home" | "about" | "treatments" | "blogs" | "contact";
};

export default function SiteHeader({ active = "home" }: SiteHeaderProps) {
  const { t, localizeHref } = useI18n();
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const treatmentsRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (treatmentsOpen) {
        setTreatmentsOpen(false);
        treatmentsRef.current?.focus();
      } else if (menuOpen) {
        setMenuOpen(false);
        menuRef.current?.focus();
      }
    };
    const onPointerDown = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) {
        setTreatmentsOpen(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [menuOpen, treatmentsOpen]);

  return (
    <>
      <a className={styles.skipLink} href="#main">
        {t("Skip to content")}
      </a>
      <div className={styles.utilityBar}>
        <div className={styles.container}>
          <span>
            {t("ONCOLOGY CARE")}{" "}
            <span className={styles.utilityLocation}>{t("· Gurugram & Delhi NCR")}</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a href="tel:+919810818266">
              <Phone size={13} strokeWidth={1.5} /> +91 98108 18266
            </a>
          </div>
        </div>
      </div>

      <header className={styles.header} ref={headerRef}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href={localizeHref("/")} className={styles.brand} aria-label={t("Dr. A. K. Dhar — Home")}>
            <span className={styles.brandName}>
              <i>Dr.</i> A. K. <strong>Dhar.</strong>
            </span>
            <span className={styles.brandSpecialty}>{t("MEDICAL ONCOLOGIST")}</span>
          </Link>

          <button
            ref={menuRef}
            className={styles.menuToggle}
            aria-label={menuOpen ? t("Close navigation") : t("Open navigation")}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => {
              setMenuOpen(!menuOpen);
              setTreatmentsOpen(false);
            }}
          >
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          <nav
            id="main-navigation"
            aria-label={t("Main navigation")}
            className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
          >
            <Link className={active === "home" ? styles.activeLink : undefined} href={localizeHref("/")} aria-current={active === "home" ? "page" : undefined}>
              {t("Home")}
            </Link>
            <Link className={active === "about" ? styles.activeLink : undefined} href={localizeHref("/about")} aria-current={active === "about" ? "page" : undefined}>
              {t("About")}
            </Link>
            <div
              className={`${styles.dropdown} ${treatmentsOpen ? styles.dropdownOpen : ""}`}
              onMouseEnter={() => setTreatmentsOpen(true)}
              onMouseLeave={() => setTreatmentsOpen(false)}
            >
              <button
                ref={treatmentsRef}
                className={`${styles.dropdownTrigger} ${active === "treatments" ? styles.activeLink : ""}`}
                aria-expanded={treatmentsOpen}
                aria-controls="treatment-links"
                aria-haspopup="true"
                onClick={() => setTreatmentsOpen(!treatmentsOpen)}
              >
                {t("Treatments")} <ChevronDown size={14} className={treatmentsOpen ? styles.chevronOpen : ""} />
              </button>
              <div
                id="treatment-links"
                className={styles.dropdownPanel}
                aria-hidden={!treatmentsOpen}
              >
                <span className={styles.dropdownLabel}>{t("EXPLORE CANCER CARE")}</span>
                {treatments.map(([label, slug]) => (
                  <Link key={slug} href={localizeHref(`/treatments/${slug}`)} onClick={() => setTreatmentsOpen(false)}>
                    {t(label)}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
                <Link
                  href={localizeHref("/treatments")}
                  className={styles.dropdownAll}
                  onClick={() => setTreatmentsOpen(false)}
                >
                  {t("All treatments")}
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
            <Link className={active === "blogs" ? styles.activeLink : undefined} href={localizeHref("/blogs")} aria-current={active === "blogs" ? "page" : undefined}>
              {t("Blogs")}
            </Link>
            <Link className={active === "contact" ? styles.activeLink : undefined} href={localizeHref("/contact")} aria-current={active === "contact" ? "page" : undefined}>
              {t("Contact")}
            </Link>
            <div className={styles.mobileLanguageWrapper}>
              <LanguageSwitcher />
            </div>
            <Link className={`${styles.primaryButton} ${styles.mobileAppointment}`} href={localizeHref("/contact")}>
              {t("Book appointment")} <ArrowUpRight size={17} />
            </Link>
          </nav>
          <div className={styles.headerActions}>
            <LanguageSwitcher />
            <Link className={`${styles.primaryButton} ${styles.headerAppointment}`} href={localizeHref("/contact")}>
              {t("Book appointment")} <ArrowUpRight size={17} strokeWidth={1.7} />
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}

