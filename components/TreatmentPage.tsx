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
              <p className={styles.readTime}>{treatment.readTime}</p>
              <h1 id="treatment-title">
                {treatment.headline} <em>{treatment.headlineAccent}</em>
              </h1>
              <p className={styles.summary}>{treatment.summary}</p>
            </div>

            <div className={`${styles.heroMedia} reveal reveal-delay-1`}>
              <Image
                src={treatment.image}
                alt={treatment.imageAlt}
                fill
                priority
                sizes="(max-width: 900px) 100vw, 1100px"
                className={styles.heroImage}
              />
            </div>
          </div>
        </section>

        <nav className={styles.toc} aria-label="On this page">
          <div className={styles.container}>
            <div className={styles.tocTrack}>
              {toc.map(([id, label]) => (
                <a key={id} href={`#${id}`}>
                  {label}
                </a>
              ))}
              <Link href="/contact" className={styles.tocCta}>
                Book appointment
              </Link>
            </div>
          </div>
        </nav>

        <div className={styles.body}>
          <div className={styles.container}>
            <div className={styles.layout}>
              <div className={styles.content}>
                <section id="overview" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>OVERVIEW</span>
                  <h2>{treatment.overview.title}</h2>
                  {treatment.overview.paragraphs.map((p) => (
                    <p key={p.slice(0, 24)}>{p}</p>
                  ))}
                </section>

                <section id="symptoms" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>SYMPTOMS</span>
                  <h2>{treatment.symptoms.title}</h2>
                  {treatment.symptoms.intro ? <p>{treatment.symptoms.intro}</p> : null}
                  <ul className={styles.bulletList}>
                    {treatment.symptoms.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                  {treatment.symptoms.note ? <p className={styles.note}>{treatment.symptoms.note}</p> : null}
                </section>

                <section id="consult" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>WHEN TO CONSULT</span>
                  <h2>{treatment.whenToConsult.title}</h2>
                  <ul className={styles.checkList}>
                    {treatment.whenToConsult.items.map((item) => (
                      <li key={item}>
                        <Check size={16} strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="diagnosis" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>DIAGNOSIS</span>
                  <h2>{treatment.diagnosis.title}</h2>
                  {treatment.diagnosis.intro ? <p>{treatment.diagnosis.intro}</p> : null}
                  <ol className={styles.numberedList}>
                    {treatment.diagnosis.items.map((item, index) => (
                      <li key={item}>
                        <span>{String(index + 1).padStart(2, "0")}</span>
                        {item}
                      </li>
                    ))}
                  </ol>
                </section>

                <section id="checklist" className={`${styles.checklistSection} reveal`}>
                  <div className={styles.checklistHead}>
                    <span className={styles.kicker}>QUICK CHECK</span>
                    <h2>{treatment.checklist.title}</h2>
                    <p>{treatment.checklist.subtitle}</p>
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
                          {item}
                        </button>
                      );
                    })}
                  </div>
                  <div className={styles.checklistResult}>
                    {checkedCount === 0 ? (
                      <p>Select anything that applies — then book a visit to review reports together.</p>
                    ) : (
                      <p>
                        <strong>{checkedCount}</strong> selected. A consultation can help turn these into a clear next step.
                      </p>
                    )}
                    <Link href="/contact" className={styles.primaryBtn}>
                      Book appointment <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </section>

                <section id="approach" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>TREATMENT OPTIONS</span>
                  <h2>{treatment.approach.title}</h2>
                  <p>{treatment.approach.intro}</p>
                  <div className={styles.optionGrid}>
                    {treatment.approach.options.map((option) => (
                      <article key={option.title}>
                        <h3>{option.title}</h3>
                        <p>{option.detail}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section id="journey" className={`${styles.journeySection} reveal`}>
                  <span className={styles.kicker}>CARE PATH</span>
                  <h2>{treatment.journey.title}</h2>
                  <div className={styles.journeyTabs} role="tablist" aria-label="Care steps">
                    {treatment.journey.steps.map((step, index) => (
                      <button
                        key={step.label}
                        type="button"
                        role="tab"
                        aria-selected={journeyStep === index}
                        className={journeyStep === index ? styles.journeyTabActive : undefined}
                        onClick={() => setJourneyStep(index)}
                      >
                        {step.label} {step.title}
                      </button>
                    ))}
                  </div>
                  <div className={styles.journeyPanel} role="tabpanel">
                    <span>{treatment.journey.steps[journeyStep].label}</span>
                    <h3>{treatment.journey.steps[journeyStep].title}</h3>
                    <p>{treatment.journey.steps[journeyStep].detail}</p>
                  </div>
                </section>

                <section id="timeline" className={`${styles.block} reveal`}>
                  <span className={styles.kicker}>BEFORE, DURING & AFTER</span>
                  <h2>What to prepare and expect</h2>
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
                        {label}
                      </button>
                    ))}
                  </div>
                  <ul className={styles.checkList}>
                    {timelineItems.map((item) => (
                      <li key={item}>
                        <Check size={16} strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                <section id="faqs" className={`${styles.faqSection} reveal`}>
                  <span className={styles.kicker}>FAQS</span>
                  <h2>Frequently asked questions</h2>
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
                            <span>{question}</span>
                            <ChevronDown size={18} />
                          </button>
                          <div className={styles.faqAnswer} data-open={open}>
                            <p>{answer}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <aside className={`${styles.aside} reveal reveal-delay-1`}>
                <div className={styles.asideCard}>
                  <span>NEED GUIDANCE?</span>
                  <strong>{treatment.shortTitle}</strong>
                  <p>Review reports and next steps with Dr. (Brig.) A. K. Dhar at Marengo Asia Hospitals, Gurugram.</p>
                  <a href="tel:+919810818266" className={styles.asidePrimary}>
                    <Phone size={16} /> Call +91 98108 18266
                  </a>
                  <a
                    href="https://wa.me/919810818266"
                    target="_blank"
                    rel="noreferrer"
                    className={styles.asideSecondary}
                  >
                    <MessageCircle size={16} /> WhatsApp
                  </a>
                  <Link href="/contact" className={styles.asideLink}>
                    Book appointment <ArrowUpRight size={14} />
                  </Link>
                </div>

                <div className={styles.asideRelated}>
                  <span>RELATED CARE</span>
                  {related.map((item) => (
                    <Link key={item.slug} href={`/treatments/${item.slug}`}>
                      {item.shortTitle}
                      <ArrowUpRight size={14} />
                    </Link>
                  ))}
                  <Link href="/treatments" className={styles.asideAll}>
                    All treatments
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
