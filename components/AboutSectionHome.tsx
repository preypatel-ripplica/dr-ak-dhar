"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, UserCheck } from "lucide-react";
import styles from "./AboutSectionHome.module.css";
import { DOCTOR_INFO } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function AboutSectionHome() {
  return (
    <section className={styles.section} aria-labelledby="about-home-title">
      <div className={`container ${styles.grid}`}>
        <ScrollReveal variant="slide-right" delay={50} className={styles.visualCol}>
          <div className={styles.imageFrame}>
            <Image
              src={DOCTOR_INFO.consultationImage}
              alt="Dr. (Brig.) A. K. Dhar in clinical consultation"
              width={787}
              height={802}
              sizes="(max-width: 700px) 90vw, 460px"
              className={styles.consultImage}
            />
            <div className={styles.quoteCard}>
              <span className={styles.quoteMark}>&ldquo;</span>
              <p>Clarity in every conversation.<br />Confidence in every next step.</p>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal variant="fade-up" delay={150} className={styles.copyCol}>
          <span className={styles.kicker}>
            <UserCheck size={15} /> ABOUT THE DOCTOR
          </span>

          <h2 id="about-home-title" className={styles.title}>
            A trusted name in medical oncology care.
          </h2>

          <p className={styles.leadParagraph}>
            Dr. (Brig.) A. K. Dhar is a senior medical oncologist with more than 35 years of experience caring for people with cancer.
          </p>

          <p className={styles.bodyParagraph}>
            As Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, he brings together deep clinical expertise, honest guidance, and the patience to make complex decisions feel clearer.
          </p>

          <ul className={styles.highlightsList}>
            <li><Check size={16} className={styles.checkIcon} /> 35+ years dedicated experience in medical oncology</li>
            <li><Check size={16} className={styles.checkIcon} /> Clinical Director &amp; Head — Medical Oncology</li>
            <li><Check size={16} className={styles.checkIcon} /> Expertise across solid tumours and blood cancers</li>
            <li><Check size={16} className={styles.checkIcon} /> Marengo Asia Hospitals, Sector 56, Gurugram</li>
          </ul>

          <div className={styles.footerRow}>
            <div className={styles.doctorSignature}>
              <strong>{DOCTOR_INFO.name}</strong>
              <span>Medical Oncology &amp; Cancer Specialist</span>
            </div>

            <Link href="/about" className={styles.aboutBtn}>
              More about Dr. Dhar <ArrowRight size={17} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
