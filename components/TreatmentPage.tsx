"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  ChevronDown,
  MessageCircle,
  Phone,
} from "lucide-react";
import type { Treatment } from "@/data/treatments";
import { treatments } from "@/data/treatments";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AppointmentSection from "./AppointmentSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./TreatmentPage.module.css";
import { useI18n } from "./I18nProvider";

const toc = [
  ["overview", "Overview"],
  ["symptoms", "Symptoms"],
  ["consult", "When to consult"],
  ["diagnosis", "Diagnosis"],
  ["checklist", "Checklist"],
  ["approach", "Treatment options"],
  ["journey", "Care path"],
  ["timeline", "Before & after"],
  ["faqs", "FAQs"],
] as const;

type Props = { treatment: Treatment };

export default function TreatmentPage({ treatment }: Props) {
  const { t, localizeHref } = useI18n();
  useScrollReveal();
  const [openFaq, setOpenFaq] = useState(0);
  const [checked, setChecked] = useState<Record<number, boolean>>({});
  const [timelineTab, setTimelineTab] = useState<"before" | "during" | "after">("before");
  const [journeyStep, setJourneyStep] = useState(0);

  const related = treatments.filter((item) => item.slug !== treatment.slug).slice(0, 3);
  const checkedCount = Object.values(checked).filter(Boolean).length;
  const timelineItems = treatment.timeline[timelineTab];

  return (
    <>
      <SiteHeader active="treatments" />

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="treatment-title">
          <div className={styles.container}>
            <div className={`${styles.heroCopy} reveal`}>
              <p className={styles.readTime}>{t(treatment.readTime)}</p>
              <h1 id="treatment-title">
                {t(treatment.headline)} <em>{t(treatment.headlineAccent)}</em>
              </h1>
              <p className={styles.summary}>{t(treatment.summary)}</p>
            </div>

            <div className={`${styles.heroMedia} reveal reveal-delay-1`}>
              <Image
                src={treatment.image}
                alt={t(treatment.imageAlt)}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 1100px"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        <nav className={styles.toc} aria-label={t("On this page")}>
          <div className={styles.container}>
            <div className={styles.tocTrack}>
              {toc.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {t(label)}
                </a>
              ))}
              <Link href={localizeHref("/contact")} className={styles.tocCta}>
                {t("Book appointment")}
              </Link>
            </div>
          </div>
        </nav>

        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <div className={styles.content}>
                <section id="overview" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("OVERVIEW")}</span>
                  <h2>{t(treatment.overview.title)}</h2>
                  {treatment.overview.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{t(p)}</p>
                  ))}
                </section>

                <section id="symptoms" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("SYMPTOMS")}</span>
                  <h2>{t(treatment.symptoms.title)}</h2>
                  {treatment.symptoms.intro ? <p>{t(treatment.symptoms.intro)}</p> : null}
                  <ul className={styles.bulletList}>
                    {treatment.symptoms.items.map((item) => (
                      <li key={item}>{t(item)}</li>
                    ))}
                  </ul>
                  {treatment.symptoms.note ? <p className={styles.note}>{t(treatment.symptoms.note)}</p> : null}
                </section>

                <section id="consult" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("WHEN TO CONSULT")}</span>
                  <h2>{t(treatment.whenToConsult.title)}</h2>
                  <ul className={styles.checkList}>
                    {treatment.whenToConsult.items.map((item) => (
                      <li key={item}>
                        <Check size={16} strokeWidth={2} />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="diagnosis" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("DIAGNOSIS")}</span>
                  <h2>{t(treatment.diagnosis.title)}</h2>
                  {treatment.diagnosis.intro ? <p>{t(treatment.diagnosis.intro)}</p> : null}
                  <ol className={styles.numberedList}>
                    {treatment.diagnosis.items.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {t(item)}
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="checklist" className={`${styles.checklistSection} reveal`}>
                  <div className={styles.checklistHead}>
                    <span className={styles.kicker}>{t("QUICK CHECK")}</span>
                    <h2>{t(treatment.checklist.title)}</h2>
                    <p>{t(treatment.checklist.subtitle)}</p>
                  </div>
                  <div className={styles.checklistGrid}>
                    {treatment.checklist.items.map((item, index) => {
                      const on = Boolean(checked[index]);
                      return (
                        <button
                          key={item}
                          type="button"
                          className={`${styles.checkChip} ${on ? styles.checkChipOn : ""}`}
                          aria-pressed={on}
                          onClick={() => setChecked((prev) => ({ ...prev, [index]: !prev[index] }))}
                        >
                          <span className={styles.checkBox}>{on ? <Check size={14} strokeWidth={2.4} /> : null}</span>
                          {t(item)}
                        </button>
                      );
                    })}
                  </div>
                  <div className={styles.checklistResult}>
                    {checkedCount === 0 ? (
                      <p>{t("Select anything that applies — then book a visit to review reports together.")}</p>
                    ) : (
                      <p>
                        <strong>{checkedCount}</strong> {t("selected. A consultation can help turn these into a clear next step.")}
                      </p>
                    )}
                    <Link href={localizeHref("/contact")} className={styles.primaryBtn}>
                      {t("Book appointment")} <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </section>

                <section id="approach" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("TREATMENT OPTIONS")}</span>
                  <h2>{t(treatment.approach.title)}</h2>
                  <p>{t(treatment.approach.intro)}</p>
                  <div className={styles.optionGrid}>
                    {treatment.approach.options.map((option) => (
                      <article key={option.title}>
                        <h3>{t(option.title)}</h3>
                        <p>{t(option.detail)}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="journey" className={`${styles.journeySection} reveal`}>
                  <span className={styles.kicker}>{t("CARE PATH")}</span>
                  <h2>{t(treatment.journey.title)}</h2>
                  <div className={styles.journeyTabs} role="tablist" aria-label={t("Care steps")}>
                    {treatment.journey.steps.map((step, index) => (
                      <button
                        key={step.label}
                        type="button"
                        role="tab"
                        aria-selected={journeyStep === index}
                        className={journeyStep === index ? styles.journeyTabActive : undefined}
                        onClick={() => setJourneyStep(index)}
                      >
                        {t(step.label)} {t(step.title)}
                      </button>
                    ))}
                  </div>
                  <div className={styles.journeyPanel} role="tabpanel">
                    <span>{t(treatment.journey.steps[journeyStep].label)}</span>
                    <h3>{t(treatment.journey.steps[journeyStep].title)}</h3>
                    <p>{t(treatment.journey.steps[journeyStep].detail)}</p>
                  </div>
                </section>

                <section id="timeline" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>{t("BEFORE, DURING & AFTER")}</span>
                  <h2>{t("What to prepare and expect")}</h2>
                  <div className={styles.timelineTabs} role="tablist">
                    {(
                      [
                        ["before", "Before treatment"],
                        ["during", "During treatment"],
                        ["after", "After treatment"],
                      ] as const
                    ).map(([key, label]) => (
                      <button
                        key={key}
                        type="button"
                        role="tab"
                        aria-selected={timelineTab === key}
                        className={timelineTab === key ? styles.timelineTabActive : undefined}
                        onClick={() => setTimelineTab(key)}
                      >
                        {t(label)}
                      </button>
                    ))}
                  </div>
                  <ul className={styles.checkList}>
                    {timelineItems.map((item) => (
                      <li key={item}>
                        <Check size={16} strokeWidth={2} />
                        <span>{t(item)}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="faqs" className={`${styles.faqSection} reveal`}>
                  <span className={styles.kicker}>{t("FAQS")}</span>
                  <h2>{t("Frequently asked questions")}</h2>
                  <div className={styles.faqList}>
                    {treatment.faqs.map(([question, answer], index) => {
                      const open = openFaq === index;
                      return (
                        <div key={question} className={`${styles.faqItem} ${open ? styles.faqOpen : ""}`}>
                          <button
                            type="button"
                            aria-expanded={open}
                            onClick={() => setOpenFaq(open ? -1 : index)}
                          >
                            <span>{t(question)}</span>
                            <ChevronDown size={18} />
                          </button>
                          <div className={styles.faqAnswer} data-open={open}>
                            <p>{t(answer)}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className={`${styles.aside} reveal reveal-delay-1`}>
                <div className={styles.asideCard}>
                  <span>{t("NEED GUIDANCE?")}</span>
                  <strong>{t(treatment.shortTitle)}</strong>
                  <p>{t("Review reports and next steps with Dr. (Brig.) A. K. Dhar at Marengo Asia Hospitals, Gurugram.")}</p>
                  <a href="tel:+919810818266" className={styles.asidePrimary}>
                    <Phone size={16} /> {t("Call +91 98108 18266")}
                  </a>
                  <a
                    href="https://wa.me/919810818266"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.asideSecondary}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <Link href={localizeHref("/contact")} className={styles.asideLink}>
                    {t("Book appointment")} <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className={styles.asideRelated}>
                  <span>{t("RELATED CARE")}</span>
                  {related.map((item) => (
                    <Link key={item.slug} href={localizeHref(`/treatments/${item.slug}`)}>
                      {t(item.shortTitle)}
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                  <Link href={localizeHref("/treatments")} className={styles.asideAll}>
                    {t("All treatments")}
                  </Link>
                </div>
              </aside>
            </div>
          </div>
        </div>

        <AppointmentSection />
        <SiteFooter />
      </main>
    </>
  );
}

