import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Ribbon } from "lucide-react";
import styles from "./treatments.module.css";
import { TREATMENTS } from "@/lib/data";
import MovingRibbon from "@/components/MovingRibbon";
import FAQAccordion from "@/components/FAQAccordion";
import ContactCTA from "@/components/ContactCTA";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cancer Care Pathways & Treatments — Dr. (Brig.) A. K. Dhar",
  description: "Explore evidence-based oncology treatment pathways including Breast Cancer, Blood Cancer, Lung Cancer, Immunotherapy, Targeted Therapy, and Head & Neck Cancer.",
};

export default function TreatmentsPage() {
  return (
    <>
      <section className={styles.heroSection}>
        <ScrollReveal variant="fade-up" className={`container ${styles.heroContent}`}>
          <span className={styles.kicker}>
            <Ribbon size={15} /> COMPREHENSIVE ONCOLOGY PATHWAYS
          </span>
          <h1 className={styles.title}>
            Personalised Cancer Treatments &amp; Systemic Care
          </h1>
          <p className={styles.subtitle}>
            From initial biomarker profiling to tailored chemotherapy, targeted oral pills, and immune checkpoint therapy—explore Dr. (Brig.) A. K. Dhar’s 6 core oncology care pathways.
          </p>
        </ScrollReveal>
      </section>

      <MovingRibbon variant="dark" />

      <section className={styles.gridSection}>
        <div className="container">
          <ScrollReveal variant="fade-up" delay={100} staggerChildren staggerDelay={100} className={styles.treatmentsGrid}>
            {TREATMENTS.map((t, index) => (
              <article key={t.slug} className={styles.treatmentCard}>
                <div className={styles.cardHeader}>
                  <span className={styles.cardNum}>0{index + 1}</span>
                  <span className={styles.categoryBadge}>{t.category}</span>
                </div>

                <h2 className={styles.cardTitle}>{t.title}</h2>
                <p className={styles.cardDesc}>{t.shortDesc}</p>

                <div className={styles.approachesBox}>
                  <strong>Key Clinical Features:</strong>
                  <ul>
                    {t.keyApproaches.slice(0, 3).map((item, i) => (
                      <li key={i}>
                        <CheckCircle2 size={15} className={styles.checkIcon} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.cardFooter}>
                  <Link href={`/${t.slug}`} className={styles.exploreBtn}>
                    Explore Pathway <ArrowRight size={16} />
                  </Link>
                  <Link href="/contact" className={styles.bookBtn}>
                    Consultation <ArrowUpRight size={15} />
                  </Link>
                </div>
              </article>
            ))}
          </ScrollReveal>
        </div>
      </section>

      <FAQAccordion title="Frequently Asked Questions About Treatments" />
      <ContactCTA />
    </>
  );
}
