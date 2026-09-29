"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, Menu, Phone, Ribbon, X } from "lucide-react";
import styles from "./Navbar.module.css";
import { TREATMENTS, DOCTOR_INFO } from "@/lib/data";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [treatmentsOpen, setTreatmentsOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLButtonElement>(null);
  const treatmentsRef = useRef<HTMLButtonElement>(null);

  const normalizedPath = pathname ? (pathname.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname) : "/";

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

  // Close menus on route change
  useEffect(() => {
    setMenuOpen(false);
    setTreatmentsOpen(false);
  }, [pathname]);

  const isHomeActive = normalizedPath === "/";
  const isAboutActive = normalizedPath === "/about";
  const isTreatmentsActive = normalizedPath === "/treatments" || normalizedPath.startsWith("/treatments") || TREATMENTS.some(t => normalizedPath === `/${t.slug}`);
  const isBlogsActive = normalizedPath.startsWith("/blogs");
  const isContactActive = normalizedPath === "/contact";

  return (
    <>
      <a className={styles.skipLink} href="#main">
        Skip to main content
      </a>

      {/* Utility Bar */}
      <div className={styles.utilityBar}>
        <div className={`container ${styles.utilityInner}`}>
          <div className={styles.utilityBadge}>
            <span className={styles.utilityDot} />
            <span>ONCOLOGY CARE · Gurugram &amp; Delhi NCR</span>
          </div>
          <div className={styles.utilityContact}>
            <span>Clinical Hours: Mon - Sat 9:00 AM - 5:00 PM</span>
            <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneLink}>
              <Phone size={13} strokeWidth={1.7} /> {DOCTOR_INFO.phone}
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={styles.header} ref={headerRef}>
        <div className={`container ${styles.headerInner}`}>
          <Link href="/" className={styles.brand} aria-label="Dr. A. K. Dhar — Home">
            <span className={styles.brandName}>
              <i>Dr.</i> A. K. <strong>Dhar.</strong>
            </span>
            <span className={styles.brandSpecialty}>MEDICAL ONCOLOGIST &amp; CANCER SPECIALIST</span>
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
            {menuOpen ? <X size={22} strokeWidth={1.8} /> : <Menu size={22} strokeWidth={1.8} />}
          </button>

          <nav
            id="main-navigation"
            aria-label="Main navigation"
            className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}
          >
            <Link
              className={`${styles.navLink} ${isHomeActive ? styles.activeLink : ""}`}
              href="/"
            >
              Home
            </Link>

            <Link
              className={`${styles.navLink} ${isAboutActive ? styles.activeLink : ""}`}
              href="/about"
            >
              About
            </Link>

            <div className={styles.dropdown}>
              <button
                ref={treatmentsRef}
                className={`${styles.dropdownTrigger} ${isTreatmentsActive ? styles.activeLink : ""}`}
                aria-expanded={treatmentsOpen}
                aria-controls="treatment-links"
                onClick={() => setTreatmentsOpen(!treatmentsOpen)}
              >
                Treatments <ChevronDown size={14} className={treatmentsOpen ? styles.chevronOpen : ""} />
              </button>

              {treatmentsOpen && (
                <div id="treatment-links" className={styles.dropdownPanel}>
                  <div className={styles.dropdownHeader}>
                    <Ribbon size={15} />
                    <span>EXPLORE CANCER CARE PATHWAYS</span>
                  </div>
                  <div className={styles.dropdownGrid}>
                    <Link href="/treatments" className={styles.allTreatmentsLink}>
                      View All Treatments &rarr;
                    </Link>
                    {TREATMENTS.map((t) => (
                      <Link key={t.slug} href={`/${t.slug}`} className={styles.dropdownItem}>
                        <span>{t.title}</span>
                        <ArrowUpRight size={14} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              className={`${styles.navLink} ${isBlogsActive ? styles.activeLink : ""}`}
              href="/blogs"
            >
              Blogs
            </Link>

            <Link
              className={`${styles.navLink} ${isContactActive ? styles.activeLink : ""}`}
              href="/contact"
            >
              Contact
            </Link>

            <Link
              className={`${styles.primaryButton} ${styles.mobileAppointment}`}
              href="/contact"
            >
              Book appointment <ArrowUpRight size={17} />
            </Link>
          </nav>

          <Link
            className={`${styles.primaryButton} ${styles.headerAppointment}`}
            href="/contact"
          >
            Book appointment <ArrowUpRight size={17} strokeWidth={1.8} />
          </Link>
        </div>
      </header>
    </>
  );
}
