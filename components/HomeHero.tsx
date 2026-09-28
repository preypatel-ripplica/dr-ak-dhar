"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, ChevronDown, ClipboardList, HeartHandshake, MapPin, Menu, Phone, Ribbon, ShieldCheck, X } from "lucide-react";
import styles from "./HomeHero.module.css";
import HomeSections from "./HomeSections";

const currentSite = "https://canceronco.in";
const appointmentUrl = `${currentSite}/contact/`;
const treatments = [
  ["Breast cancer", "breast-cancer"],
  ["Blood cancer", "blood-cancer"],
  ["Lung cancer", "lungs-cancer"],
  ["Head & neck cancer", "head-neck-cancer"],
  ["Immunotherapy", "immunotherapy"],
  ["Targeted therapy", "targeted-therapy"],
];

export default function HomeHero() {
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
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <div className={styles.utilityBar}>
        <div className={styles.container}>
          <span>ONCOLOGY CARE <span className={styles.utilityLocation}>· Gurugram & Delhi NCR</span></span>
          <a href="tel:+919810818266"><Phone size={13} strokeWidth={1.5} /> +91 98108 18266</a>
        </div>
      </div>

      <header className={styles.header} ref={headerRef}>
        <div className={`${styles.container} ${styles.headerInner}`}>
          <Link href="/" className={styles.brand} aria-label="Dr. A. K. Dhar — Home">
            <span className={styles.brandName}><i>Dr.</i> A. K. <strong>Dhar.</strong></span>
            <span className={styles.brandSpecialty}>MEDICAL ONCOLOGIST</span>
          </Link>

          <button ref={menuRef} className={styles.menuToggle} aria-label={menuOpen ? "Close navigation" : "Open navigation"} aria-expanded={menuOpen} aria-controls="main-navigation" onClick={() => { setMenuOpen(!menuOpen); setTreatmentsOpen(false); }}>
            {menuOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
          </button>

          <nav id="main-navigation" aria-label="Main navigation" className={`${styles.navigation} ${menuOpen ? styles.navigationOpen : ""}`}>
            <Link className={styles.activeLink} href="/" aria-current="page">Home</Link>
            <a href={`${currentSite}/about/`}>About</a>
            <div className={styles.dropdown}>
              <button ref={treatmentsRef} className={styles.dropdownTrigger} aria-expanded={treatmentsOpen} aria-controls="treatment-links" onClick={() => setTreatmentsOpen(!treatmentsOpen)}>
                Treatments <ChevronDown size={14} className={treatmentsOpen ? styles.chevronOpen : ""} />
              </button>
              {treatmentsOpen && <div id="treatment-links" className={styles.dropdownPanel}>
                <span className={styles.dropdownLabel}>EXPLORE CANCER CARE</span>
                {treatments.map(([label, slug]) => <a key={slug} href={`${currentSite}/${slug}/`}>{label}<ArrowUpRight size={14} /></a>)}
              </div>}
            </div>
            <a href={`${currentSite}/blogs/`}>Blogs</a>
            <a href={appointmentUrl}>Contact</a>
            <a className={`${styles.primaryButton} ${styles.mobileAppointment}`} href={appointmentUrl}>Book appointment <ArrowUpRight size={17} /></a>
          </nav>
          <a className={`${styles.primaryButton} ${styles.headerAppointment}`} href={appointmentUrl}>Book appointment <ArrowUpRight size={17} strokeWidth={1.7} /></a>
        </div>
      </header>

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={styles.heroCopy}>
              <p className={styles.eyebrow}><span />EXPERIENCE WITH EMPATHY</p>
              <h1 id="hero-title">Expert cancer care.<br /><em>A reassuring hand.</em></h1>
              <p className={styles.introduction}>Expertise you can trust. Time to listen.<br />Dr. (Brig.) A. K. Dhar helps you understand your options and take the next step with confidence.</p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={appointmentUrl}>Book an appointment <ArrowUpRight size={19} strokeWidth={1.7} /></a>
                <a className={styles.doctorLink} href={`${currentSite}/about/`}>Meet your doctor <span><ArrowRight size={19} strokeWidth={1.4} /></span></a>
              </div>
              <div className={styles.credentials}>
                <ShieldCheck size={27} strokeWidth={1.35} />
                <div><strong>35+ years of clinical experience</strong><span>Clinical Director & Head — Medical Oncology<br />Marengo Asia Hospitals, Gurugram</span></div>
              </div>
            </div>

            <div className={styles.portraitStage}>
              <div className={styles.portraitArch} aria-hidden="true" />
              <div className={styles.portraitOrbit} aria-hidden="true" />
              <span className={styles.portraitWord} aria-hidden="true">care.</span>
              <Image className={styles.portrait} src="/images/dr-ak-dhar-original.jpg" alt="Dr. (Brig.) A. K. Dhar, Medical Oncologist" width={1270} height={1600} priority sizes="(max-width: 600px) 95vw, (max-width: 1000px) 65vw, 560px" />
              <div className={styles.portraitNote}>
                <HeartHandshake size={28} strokeWidth={1.3} />
                <span>Personalised care.<br /><strong>A person-first approach.</strong></span>
              </div>
              <div className={styles.portraitCaption}>
                <span>Dr. (Brig.) A. K. Dhar</span>
                <p>MBBS, MD <span>·</span> Medical Oncology</p>
              </div>
            </div>
          </div>
        </section>

        <nav className={`${styles.container} ${styles.quickLinks}`} aria-label="Consultation quick links">
          <a href={currentSite}><Ribbon size={26} strokeWidth={1.35} /><span><small>UNDERSTAND YOUR OPTIONS</small>Explore cancer care</span><span className={styles.quickArrow}><ArrowUpRight size={18} strokeWidth={1.4} /></span></a>
          <a href={appointmentUrl}><ClipboardList size={26} strokeWidth={1.35} /><span><small>LET’S TAKE THE NEXT STEP</small>Plan your consultation</span><span className={styles.quickArrow}><ArrowUpRight size={18} strokeWidth={1.4} /></span></a>
          <a href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram" target="_blank" rel="noopener noreferrer"><MapPin size={26} strokeWidth={1.35} /><span><small>MARENGO ASIA HOSPITALS</small>Find us in Gurugram</span><span className={styles.quickArrow}><ArrowUpRight size={18} strokeWidth={1.4} /></span></a>
        </nav>
        <HomeSections />
      </main>
    </>
  );
}
