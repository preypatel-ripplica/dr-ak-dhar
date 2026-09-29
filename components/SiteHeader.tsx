"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, X } from "lucide-react";
import styles from "./HomeHero.module.css";

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
        Skip to content
      </a>
      <div className={styles.utilityBar}>
        <div className={styles.container}>
          <span>
            ONCOLOGY CARE <span className={styles.utilityLocation}>· Gurugram & Delhi NCR</span>
          </span>
          <a href="tel:+919810818266">
            <Phone size={13} strokeWidth={1.5} /> +91 98108 18266
          </a>
        </div>
      </div>

      <header className={styles.header} ref={headerRef}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brand} aria-label="Dr. A. K. Dhar — Home">
            <span className={styles.brandName}>
              <i>Dr.</i> A. K. <strong>Dhar.</strong>
            </span>
            <span className={styles.brandSpecialty}>MEDICAL ONCOLOGIST</span>
          </Link>

          <button
            ref={menuRef}
            className={styles.menuToggle}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
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
            aria-label="Main navigation"
            className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
          >
            <Link className={active === "home" ? styles.activeLink : undefined} href="/" aria-current={active === "home" ? "page" : undefined}>
              Home
            </Link>
            <Link className={active === "about" ? styles.activeLink : undefined} href="/about" aria-current={active === "about" ? "page" : undefined}>
              About
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
                Treatments <ChevronDown size={14} className={treatmentsOpen ? styles.chevronOpen : ""} />
              </button>
              <div
                id="treatment-links"
                className={styles.dropdownPanel}
                aria-hidden={!treatmentsOpen}
              >
                <span className={styles.dropdownLabel}>EXPLORE CANCER CARE</span>
                {treatments.map(([label, slug]) => (
                  <Link key={slug} href={`/treatments/${slug}`} onClick={() => setTreatmentsOpen(false)}>
                    {label}
                    <ArrowUpRight size={14} />
                  </Link>
                ))}
                <Link
                  href="/treatments"
                  className={styles.dropdownAll}
                  onClick={() => setTreatmentsOpen(false)}
                >
                  All treatments
                  <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>
            <Link className={active === "blogs" ? styles.activeLink : undefined} href="/blogs" aria-current={active === "blogs" ? "page" : undefined}>
              Blogs
            </Link>
            <Link className={active === "contact" ? styles.activeLink : undefined} href="/contact" aria-current={active === "contact" ? "page" : undefined}>
              Contact
            </Link>
            <Link className={`${styles.primaryButton} ${styles.mobileAppointment}`} href="/contact">
              Book appointment <ArrowUpRight size={17} />
            </Link>
          </nav>
          <Link className={`${styles.primaryButton} ${styles.headerAppointment}`} href="/contact">
            Book appointment <ArrowUpRight size={17} strokeWidth={1.7} />
          </Link>
        </div>
      </header>
    </>
  );
}
