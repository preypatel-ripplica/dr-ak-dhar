"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ClipboardList, HeartHandshake, MapPin, Ribbon, ShieldCheck } from "lucide-react";
import styles from "./HomeHero.module.css";
import { DOCTOR_INFO } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function HomeHero() {
  return (
    <section className={styles.hero} aria-labelledby="hero-title">
      <div className={`container ${styles.heroGrid}`}>
        <ScrollReveal variant="fade-up" delay={50} className={styles.heroCopy}>
          <div className={styles.eyebrow}>
            <span className={styles.eyebrowDot} />
            <span>EXPERIENCE WITH EMPATHY</span>
          </div>
          
          <h1 id="hero-title" className={styles.title}>
            Expert cancer care.<br />
            <em>A reassuring hand.</em>
          </h1>
          
          <p className={styles.introduction}>
            Expertise you can trust. Time to listen.<br />
            Dr. (Brig.) A. K. Dhar helps you understand your options and take the next step with confidence.
          </p>

          <div className={styles.heroActions}>
            <Link className={styles.primaryButton} href="/contact">
              Book an appointment <ArrowUpRight size={19} strokeWidth={1.8} />
            </Link>
            <Link className={styles.doctorLink} href="/about">
              Meet your doctor <ArrowRight size={19} strokeWidth={1.5} />
            </Link>
          </div>

          <div className={styles.credentials}>
            <div className={styles.shieldBadge}>
              <ShieldCheck size={28} strokeWidth={1.5} />
            </div>
            <div>
              <strong>35+ years of clinical experience</strong>
              <span>
                Clinical Director &amp; Head — Medical Oncology<br />
                Marengo Asia Hospitals, Gurugram
              </span>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="scale-up" delay={200} className={styles.portraitStage}>
          <div className={styles.portraitArch} aria-hidden="true" />
          <span className={styles.portraitWord} aria-hidden="true">care.</span>

          <div className={styles.imageWrapper}>
            <Image
              className={styles.portrait}
              src={DOCTOR_INFO.heroImage}
              alt="Dr. (Brig.) A. K. Dhar, Medical Oncologist"
              width={1270}
              height={1600}
              priority
              sizes="(max-width: 600px) 95vw, (max-width: 1000px) 50vw, 520px"
            />
          </div>

          <div className={styles.portraitNote}>
            <HeartHandshake size={24} strokeWidth={1.5} className={styles.heartIcon} />
            <div>
              <span className={styles.noteTitle}>Personalised Care</span>
              <span className={styles.noteSub}>A person-first approach</span>
            </div>
          </div>

          <div className={styles.portraitCaption}>
            <span className={styles.captionRole}>Senior Medical Oncologist</span>
            <strong className={styles.captionName}>{DOCTOR_INFO.name}</strong>
            <div className={styles.captionDetails}>
              <span className={styles.captionPill}>MBBS, MD</span>
              <span className={styles.captionDot} aria-hidden="true">•</span>
              <span className={styles.captionPill}>Medical Oncology</span>
            </div>
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fade-up" delay={300} staggerChildren staggerDelay={120}>
        <nav className={`container ${styles.quickLinks}`} aria-label="Consultation quick links">
          <Link href="/treatments" className={styles.quickCard}>
            <div className={styles.quickIcon}>
              <Ribbon size={24} strokeWidth={1.4} />
            </div>
            <div className={styles.quickCopy}>
              <small>UNDERSTAND YOUR OPTIONS</small>
              <span>Explore cancer care</span>
            </div>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </Link>

          <Link href="/contact" className={styles.quickCard}>
            <div className={styles.quickIcon}>
              <ClipboardList size={24} strokeWidth={1.4} />
            </div>
            <div className={styles.quickCopy}>
              <small>LET’S TAKE THE NEXT STEP</small>
              <span>Plan your consultation</span>
            </div>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </Link>

          <a
            href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.quickCard}
          >
            <div className={styles.quickIcon}>
              <MapPin size={24} strokeWidth={1.4} />
            </div>
            <div className={styles.quickCopy}>
              <small>MARENGO ASIA HOSPITALS</small>
              <span>Find us in Gurugram</span>
            </div>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.5} />
            </span>
          </a>
        </nav>
      </ScrollReveal>
    </section>
  );
}
