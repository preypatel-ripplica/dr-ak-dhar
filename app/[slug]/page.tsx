import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, Layers, Ribbon, Shield, Sparkles } from "lucide-react";
import styles from "./treatmentSlug.module.css";
import { TREATMENTS } from "@/lib/data";
import FAQAccordion from "@/components/FAQAccordion";
import ContactCTA from "@/components/ContactCTA";
import MovingRibbon from "@/components/MovingRibbon";
import TreatmentQuiz from "./TreatmentQuiz";
import ScrollReveal from "@/components/ScrollReveal";
import { Metadata } from "next";

export async function generateStaticParams() {
  return TREATMENTS.map((t) => ({
    slug: t.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);
  if (!treatment) {
    return { title: "Treatment Not Found" };
  }
  return {
    title: `${treatment.title} — Dr. (Brig.) A. K. Dhar`,
    description: treatment.subtitle,
  };
}

export default async function TreatmentDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const treatment = TREATMENTS.find((t) => t.slug === slug);

  if (!treatment) {
    notFound();
  }

  return (
    <>
      {/* 1. Treatment Hero */}
      <section className={styles.heroSection}>
        <div className={`container ${styles.heroGrid}`}>
          <ScrollReveal variant="fade-up" className={styles.heroCopy}>
            <span className={styles.kicker}>
              <Ribbon size={15} /> {treatment.category} · PATHWAY
            </span>
            <h1 className={styles.title}>{treatment.title}</h1>
            <p className={styles.subtitle}>{treatment.subtitle}</p>

            <div className={styles.quickOverviewCard}>
              <Sparkles size={18} className={styles.sparkleIcon} />
              <p>{treatment.shortDesc}</p>
            </div>

            <div className={styles.heroActions}>
              <Link href="/contact" className={styles.primaryBtn}>
                Book Treatment Consultation <ArrowUpRight size={18} />
              </Link>
              <a href="#quiz-section" className={styles.quizBtn}>
                Explore Compatibility Checklist <ArrowRight size={16} />
              </a>
            </div>
          </ScrollReveal>

          {/* 2. Hero Image */}
          <ScrollReveal variant="scale-up" delay={150} className={styles.heroImageFrame}>
            <Image
              src={treatment.heroImage}
              alt={`${treatment.title} consultation`}
              width={787}
              height={802}
              className={styles.heroImg}
              priority
            />
            <div className={styles.imageBadge}>
              <Shield size={16} />
              <span>35+ Yrs Clinical Experience</span>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <MovingRibbon variant="accent" />

      {/* 3 & 4. Main Treatment Information & Key Approaches */}
      <section className={styles.detailsSection}>
        <div className="container">
          <ScrollReveal variant="fade-up">
            <div className={styles.sectionHeader}>
              <span className={styles.kicker}><Shield size={15} /> CLINICAL OVERVIEW</span>
              <h2>Evidence-based care approach &amp; protocols.</h2>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={100} className={styles.overviewBox}>
            <p className={styles.leadText}>{treatment.overview}</p>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={150} staggerChildren staggerDelay={120} className={styles.approachesGrid}>
            <div className={styles.approachesCard}>
              <h3>Key Systemic Approaches</h3>
              <ul className={styles.approachesList}>
                {treatment.keyApproaches.map((item, i) => (
                  <li key={i}>
                    <CheckCircle2 size={18} className={styles.checkIcon} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.stagesCard}>
              <h3><Layers size={18} /> Stages &amp; Subtypes Managed</h3>
              <ul className={styles.stagesList}>
                {treatment.stagesCovered.map((item, i) => (
                  <li key={i}>
                    <span className={styles.stageDot} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 5 & 6. Supporting Content & Supporting Image */}
      <section className={styles.supportingSection}>
        <div className={`container ${styles.supportingGrid}`}>
          <ScrollReveal variant="slide-right" delay={100} className={styles.supportingCopy}>
            <span className={styles.kicker}><Sparkles size={15} /> INDIVIDUALIZED PATIENT PATHWAY</span>
            <h2>What to expect during your care plan.</h2>
            <p>
              At Marengo Asia Hospitals, Gurugram, Dr. (Brig.) A. K. Dhar coordinates every phase of systemic care. From genomic biomarker assessment to chemotherapy dosage calculations and side effect mitigation, each detail is meticulously planned.
            </p>
            <div className={styles.reassuranceBox}>
              <strong>Person-First Oncology Focus:</strong>
              <p>
                We prioritize clear communication at every milestone, ensuring you and your loved ones are empowered with diagnostic understanding before starting therapy.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="slide-left" delay={180} className={styles.supportingImageFrame}>
            <Image
              src={treatment.contentImage}
              alt={`Supporting image for ${treatment.title}`}
              width={1270}
              height={1600}
              className={styles.supportingImg}
            />
          </ScrollReveal>
        </div>
      </section>

      {/* 7. Interactive / Quiz Section */}
      <ScrollReveal variant="fade-up" delay={100} id="quiz-section">
        <TreatmentQuiz treatment={treatment} />
      </ScrollReveal>

      {/* 8. Treatment FAQ Accordion */}
      <FAQAccordion
        items={treatment.faqs}
        title={`Questions About ${treatment.title}`}
        kicker="TREATMENT FAQ"
        subtitle="Common questions regarding diagnosis, staging, medication, and care management."
      />

      {/* 9. Contact CTA */}
      <ContactCTA />
    </>
  );
}
