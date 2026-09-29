import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Award, CheckCircle2, HeartHandshake, Hospital, ShieldCheck, UserCheck } from "lucide-react";
import styles from "./about.module.css";
import { DOCTOR_INFO, STATS } from "@/lib/data";
import MovingRibbon from "@/components/MovingRibbon";
import FAQAccordion from "@/components/FAQAccordion";
import ContactCTA from "@/components/ContactCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Dr. (Brig.) A. K. Dhar — Senior Medical Oncologist",
  description: "Learn more about Dr. (Brig.) A. K. Dhar, Clinical Director & Head of Medical Oncology at Marengo Asia Hospitals, Gurugram. 35+ years of clinical experience.",
};

export default function AboutPage() {
  return (
    <>
      {/* About Hero */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <ScrollReveal variant="fade-up" className={styles.heroCopy}>
            <span className={styles.kicker}>
              <UserCheck size={15} /> CLINICAL DIRECTOR &amp; HEAD OF MEDICAL ONCOLOGY
            </span>
            <h1 className={styles.title}>
              Dr. (Brig.) A. K. Dhar
            </h1>
            <p className={styles.subtitle}>
              {DOCTOR_INFO.degrees} · {DOCTOR_INFO.specialty}
            </p>

            <div className={styles.leadBox}>
              <p>
                &ldquo;{DOCTOR_INFO.tagline}&rdquo;
              </p>
            </div>

            <p className={styles.bioText}>
              With over 35 years of clinical oncology practice, Dr. (Brig.) A. K. Dhar has pioneered personalized medical oncology protocols across leading tertiary care institutions. At Marengo Asia Hospitals, Gurugram, he leads a dedicated multidisciplinary oncology team focused on delivering high-precision systemic treatments with utmost compassion.
            </p>

            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryBtn}>
                Book a Consultation <ArrowUpRight size={18} />
              </Link>
              <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneBtn}>
                Call Clinic Team: {DOCTOR_INFO.phone}
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale-up" delay={150} className={styles.heroVisual}>
            <div className={styles.imageCard}>
              <Image
                src={DOCTOR_INFO.heroImage}
                alt="Dr. (Brig.) A. K. Dhar"
                width={1270}
                height={1600}
                className={styles.doctorImg}
                priority
              />
              <div className={styles.imageOverlay}>
                <strong>35+ Years Clinical Practice</strong>
                <span>Solid Tumours &amp; Haematological Malignancies</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MovingRibbon variant="accent" />

      {/* Clinical Credentials & Philosophy */}
      <section className={styles.credentialsSection}>
        <div className="container">
          <ScrollReveal variant="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.kicker}><ShieldCheck size={15} /> CLINICAL EXPERTISE &amp; AFFILIATIONS</span>
              <h2>Grounding medical excellence in human care.</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={120} staggerChildren staggerDelay={100} className={styles.credentialsGrid}>
            <div className={styles.credCard}>
              <div className={styles.credIcon}><Hospital size={24} /></div>
              <h3>Hospital Affiliation</h3>
              <p>Clinical Director &amp; Head of Medical Oncology at <strong>Marengo Asia Hospitals, Gurugram</strong>.</p>
            </div>

            <div className={styles.credCard}>
              <div className={styles.credIcon}><Award size={24} /></div>
              <h3>35+ Years Practice</h3>
              <p>Decades of distinguished service in military and civilian tertiary cancer care centers across India.</p>
            </div>

            <div className={styles.credCard}>
              <div className={styles.credIcon}><HeartHandshake size={24} /></div>
              <h3>Person-First Philosophy</h3>
              <p>Every treatment decision is explained thoroughly, empowering patients and families to move forward with confidence.</p>
            </div>
          </ScrollReveal>

          {/* Key Clinical Focus Areas */}
          <ScrollReveal variant="fade-up" delay={200} className={styles.focusBox}>
            <h3>Key Areas of Clinical Specialization</h3>
            <div className={styles.focusGrid}>
              <div className={styles.focusItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <div>
                  <strong>Breast Cancer Systemic Therapy</strong>
                  <p>Hormonal receptor targeted therapies, HER2 biologics, and individualized chemotherapy.</p>
                </div>
              </div>

              <div className={styles.focusItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <div>
                  <strong>Haematological Oncology</strong>
                  <p>Comprehensive chemo-immunotherapy protocols for Lymphomas, Myeloma, and Leukaemia.</p>
                </div>
              </div>

              <div className={styles.focusItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <div>
                  <strong>Lung &amp; Solid Tumour Precision Medicine</strong>
                  <p>EGFR/ALK oral tyrosine kinase targeted pills and immune checkpoint inhibitors.</p>
                </div>
              </div>

              <div className={styles.focusItem}>
                <CheckCircle2 size={18} className={styles.checkIcon} />
                <div>
                  <strong>Cancer Immunotherapy &amp; Biomarkers</strong>
                  <p>PD-1/PD-L1 biomarker analysis and modern immune checkpoint therapy management.</p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Stats Section */}
      <section className={styles.statsSection}>
        <ScrollReveal variant="fade-up" staggerChildren staggerDelay={100} className={`container ${styles.statsGrid}`}>
          {STATS.map((s, i) => (
            <div key={i} className={styles.statCard}>
              <span className={styles.statNum}>{s.number}</span>
              <strong className={styles.statLabel}>{s.label}</strong>
              <p className={styles.statDesc}>{s.description}</p>
            </div>
          ))}
        </ScrollReveal>
      </section>

      <FAQAccordion title="Questions About Consulting Dr. Dhar" />
      <ContactCTA />
    </>
  );
}
