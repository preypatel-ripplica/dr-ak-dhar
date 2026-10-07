"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  Check,
  GraduationCap,
  HeartHandshake,
  Hospital,
  Medal,
  Stethoscope,
  Users,
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AppointmentSection, { scrollToId } from "./AppointmentSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./AboutPage.module.css";
import { useI18n } from "./I18nProvider";

const highlights = [
  { value: "35+", label: "Years in medical oncology" },
  { value: "50,000+", label: "Patients guided in care" },
  { value: "VSM", label: "Vishisht Seva Medal, 2011" },
  { value: "2024", label: "Lifetime Achievement Award" },
];

const education = [
  {
    title: "Post-doctoral training, Medical Oncology",
    place: "Tata Memorial Hospital, Mumbai",
  },
  {
    title: "MD, Internal Medicine",
    place: "King George’s Medical College, Lucknow",
  },
  {
    title: "MBBS",
    place: "King George’s Medical College, Lucknow",
  },
];

const career = [
  {
    role: "Clinical Director & Head, Medical Oncology",
    place: "Marengo Asia Hospitals, Gurugram",
    note: "Current practice",
  },
  {
    role: "Director — Oncology",
    place: "Fortis Memorial Research Institute & Artemis Health Institute, Gurugram",
  },
  {
    role: "Head — Oncology Centre",
    place: "Army Hospital (R&R), Delhi Cantt",
  },
  {
    role: "Leadership roles across premier centres",
    place: "Including TMH Jamshedpur, Bhagwan Mahavir Cancer Hospital, and Command Hospitals",
  },
];

const focusAreas = [
  {
    title: "Solid tumour oncology",
    detail: "Thoughtful systemic care across breast, lung, colorectal, prostate and other solid tumours.",
  },
  {
    title: "Blood cancers",
    detail: "Experience with lymphoma, leukaemia, multiple myeloma and complex haematological pathways.",
  },
  {
    title: "Second opinions",
    detail: "Clear review of reports and options when families need confidence before the next step.",
  },
  {
    title: "Teaching & mentorship",
    detail: "Guiding MD and DNB oncology trainees — care that also shapes the next generation of oncologists.",
  },
];

const recognitions = [
  "Vishisht Seva Medal by the President of India (2011)",
  "Lifetime Achievement Award, Indian Oncology Society (2024)",
  "Certificate of Recognition, Bharat Pradhan Mantri Jan Arogya Yojana (2021)",
  "Commendation medals for meritorious service in the Armed Forces",
  "Developed DNB Medical Oncology programme at Army Hospital (R&R)",
  "Invited speaker and presenter at national oncology conferences",
];

const principles = [
  {
    Icon: HeartHandshake,
    title: "Clarity before complexity",
    text: "Every consultation starts with listening — then explaining options in language that feels human.",
  },
  {
    Icon: Stethoscope,
    title: "Evidence with empathy",
    text: "Modern oncology protocols, tempered by what matters most to you and your family.",
  },
  {
    Icon: Users,
    title: "Care that includes the family",
    text: "Decisions are shared. Support extends beyond the treatment plan to the people walking with you.",
  },
];

export default function AboutPage() {
  const { t } = useI18n();
  useScrollReveal();

  return (
    <>
      <SiteHeader active="about" />

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="about-hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal-left`}>
              <p className={styles.eyebrow}>
                <span />
                {t("ABOUT THE DOCTOR")}
              </p>
              <h1 id="about-hero-title">
                {t("A lifetime devoted to")}
                <br />
                <em>{t("cancer care.")}</em>
              </h1>
              <p className={styles.lead}>
                {t("Dr. (Brig.) A. K. Dhar is Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, Gurugram — bringing more than three decades of experience, military discipline, and a calm bedside manner to every consultation.")}
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href="#appointment" onClick={(event) => scrollToId("appointment", event)}>
                  {t("Book an appointment")} <ArrowUpRight size={18} strokeWidth={1.7} />
                </a>
                <a className={styles.textLink} href="#story" onClick={(event) => scrollToId("story", event)}>
                  {t("Read his story")}
                  <span>
                    <ArrowRight size={17} strokeWidth={1.5} />
                  </span>
                </a>
              </div>
            </div>

            <div className={`${styles.heroVisual} reveal-right`}>
              <div className={styles.heroHalo} aria-hidden="true" />
              <Image
                src="/images/dr-ak-dhar-consultation.png"
                alt={t("Dr. (Brig.) A. K. Dhar in clinic")}
                width={787}
                height={802}
                priority
                sizes="(max-width: 900px) 80vw, 420px"
              />
              <aside className={styles.heroBadge}>
                <Medal size={22} strokeWidth={1.5} />
                <div>
                  <strong>{t("Vishisht Seva Medal")}</strong>
                  <span>{t("President of India, 2011")}</span>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className={styles.stats} aria-label={t("Practice highlights")}>
          <div className={`${styles.container} ${styles.statsGrid}`}>
            {highlights.map((item, index) => (
              <div key={item.label} className={`reveal-scale reveal-delay-${index + 1}`}>
                <strong dir="ltr">{item.value}</strong>
                <span>{t(item.label)}</span>
              </div>
            ))}
          </div>
        </section>

        <section className={styles.story} id="story" aria-labelledby="story-title">
          <div className={`${styles.container} ${styles.storyGrid}`}>
            <div className={`${styles.storyIntro} reveal-left`}>
              <span className={styles.kicker}>{t("HIS JOURNEY")}</span>
              <h2 id="story-title">
                {t("Experience forged in")}
                <br />
                <em>{t("service and scholarship.")}</em>
              </h2>
            </div>
            <div className={`${styles.storyCopy} reveal-right`}>
              <p>
                {t("A post-doctoral fellow from Tata Memorial Hospital, Mumbai, Dr. Dhar has spent over 35 years caring for people with solid tumours and blood cancers. His career spans the Armed Forces Medical Services and leading civilian oncology centres across India.")}
              </p>
              <p>
                {t("He helped establish premier oncology programmes — including at Army Hospital (R&R), Delhi — and was honoured with the Vishisht Seva Medal by the President of India for distinguished service. Today, he continues that same standard of care at Marengo Asia Hospitals, Gurugram.")}
              </p>
              <p>
                {t("Beyond the clinic, he mentors postgraduate and DNB oncology trainees, believing that excellent cancer care is multiplied when knowledge is shared with the next generation of doctors.")}
              </p>
              <ul className={styles.storyPoints}>
                <li>
                  <Check size={16} strokeWidth={2} />
                  {t("Post-doctoral fellow, Tata Memorial Hospital")}
                </li>
                <li>
                  <Check size={16} strokeWidth={2} />
                  {t("Armed Forces leadership in oncology services")}
                </li>
                <li>
                  <Check size={16} strokeWidth={2} />
                  {t("Mentor across MD & DNB oncology programmes")}
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className={styles.credentials} aria-labelledby="credentials-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} reveal`}>
              <span className={styles.kicker}>{t("TRAINING & CAREER")}</span>
              <h2 id="credentials-title">
                {t("Foundations that shape")}
                <br />
                <em>{t("every consultation.")}</em>
              </h2>
            </div>

            <div className={styles.credentialGrid}>
              <div className={`${styles.credentialCard} reveal-left`}>
                <div className={styles.cardLabel}>
                  <GraduationCap size={20} strokeWidth={1.6} />
                  {t("Education")}
                </div>
                <ol className={styles.eduList}>
                  {education.map((item) => (
                    <li key={item.title}>
                      <strong>{t(item.title)}</strong>
                      <span>{t(item.place)}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div className={`${styles.credentialCard} reveal-right`}>
                <div className={styles.cardLabel}>
                  <Hospital size={20} strokeWidth={1.6} />
                  {t("Selected experience")}
                </div>
                <ol className={styles.careerList}>
                  {career.map((item) => (
                    <li key={item.role}>
                      <strong>{t(item.role)}</strong>
                      <span>{t(item.place)}</span>
                      {item.note ? <small>{t(item.note)}</small> : null}
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </section>

        <section className={styles.focus} aria-labelledby="focus-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} reveal`}>
              <span className={styles.kicker}>{t("AREAS OF FOCUS")}</span>
              <h2 id="focus-title">
                {t("Where deep expertise")}
                <br />
                <em>{t("meets personal care.")}</em>
              </h2>
              <p>{t("From first diagnosis to complex pathways, care is tailored to the person — not only the disease.")}</p>
            </div>

            <div className={styles.focusGrid}>
              {focusAreas.map((item, index) => (
                <article key={item.title} className={`reveal reveal-delay-${(index % 4) + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <h3>{t(item.title)}</h3>
                  <p>{t(item.detail)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.recognition} aria-labelledby="recognition-title">
          <div className={`${styles.container} ${styles.recognitionGrid}`}>
            <div className={`${styles.recognitionIntro} reveal-left`}>
              <span className={styles.kickerLight}>{t("RECOGNITION")}</span>
              <h2 id="recognition-title">
                {t("Honours that reflect")}
                <br />
                <em>{t("a life of service.")}</em>
              </h2>
              <p>
                {t("From military commendations to national oncology awards, these milestones mark a career devoted to patients, teaching, and building stronger cancer programmes.")}
              </p>
              <div className={styles.recognitionIcons}>
                <Award size={22} strokeWidth={1.5} />
                <Medal size={22} strokeWidth={1.5} />
                <BookOpen size={22} strokeWidth={1.5} />
              </div>
            </div>
            <ul className={`${styles.recognitionList} reveal-right`}>
              {recognitions.map((item, index) => (
                <li key={item}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {t(item)}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className={styles.principles} aria-labelledby="principles-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} reveal`}>
              <span className={styles.kicker}>{t("HOW HE CARES")}</span>
              <h2 id="principles-title">
                {t("A philosophy built on")}
                <br />
                <em>{t("trust and time.")}</em>
              </h2>
            </div>
            <div className={styles.principlesGrid}>
              {principles.map((item, index) => {
                const Icon = item.Icon;
                return (
                  <article key={item.title} className={`reveal-scale reveal-delay-${index + 1}`}>
                    <span className={styles.principleIcon}>
                      <Icon size={22} strokeWidth={1.55} />
                    </span>
                    <h3>{t(item.title)}</h3>
                    <p>{t(item.text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className={styles.cta} aria-labelledby="about-cta-title">
          <div className={`${styles.container} ${styles.ctaInner} reveal`}>
            <div>
              <span className={styles.kicker}>{t("NEXT STEP")}</span>
              <h2 id="about-cta-title">
                {t("Ready for a conversation")}
                <br />
                <em>{t("about your care?")}</em>
              </h2>
              <p>{t("Share a few details with the clinic team, or call the appointment desk directly.")}</p>
            </div>
            <div className={styles.ctaActions}>
              <a className={styles.primaryButton} href="#appointment" onClick={(event) => scrollToId("appointment", event)}>
                {t("Request an appointment")} <ArrowUpRight size={18} />
              </a>
              <a className={styles.secondaryButton} href="tel:+919810818266">
                {t("Call +91 98108 18266")}
              </a>
            </div>
          </div>
        </section>

        <AppointmentSection />
      </main>

      <SiteFooter />
    </>
  );
}

