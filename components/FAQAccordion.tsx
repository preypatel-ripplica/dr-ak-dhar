"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import styles from "./FAQAccordion.module.css";
import { FAQItem, GENERAL_FAQS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

interface FAQAccordionProps {
  items?: FAQItem[];
  title?: string;
  kicker?: string;
  subtitle?: string;
}

export default function FAQAccordion({
  items = GENERAL_FAQS,
  title = "You can ask anything.",
  kicker = "FREQUENTLY ASKED QUESTIONS",
  subtitle = "Clear answers to common questions about cancer consultations, second opinions, and treatment protocols."
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={styles.section} id="faq" aria-labelledby="faq-section-title">
      <div className="container">
        <div className={styles.grid}>
          <ScrollReveal variant="slide-right" className={styles.infoCol}>
            <span className={styles.kicker}>
              <HelpCircle size={15} /> {kicker}
            </span>
            <h2 id="faq-section-title" className={styles.title}>
              {title}
            </h2>
            <p className={styles.subtitle}>{subtitle}</p>
            <div className={styles.contactPrompt}>
              <p>Have a question not listed here?</p>
              <a href="/contact" className={styles.contactLink}>
                Ask the clinic team directly &rarr;
              </a>
            </div>
          </ScrollReveal>

          <ScrollReveal variant="fade-up" delay={150} staggerChildren staggerDelay={90} className={styles.faqList}>
            {items.map((item, index) => {
              const isOpen = openIndex === index;
              const contentId = `faq-content-${index}`;
              const buttonId = `faq-button-${index}`;

              return (
                <div key={index} className={`${styles.faqItem} ${isOpen ? styles.faqItemOpen : ""}`}>
                  <button
                    id={buttonId}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className={styles.questionBtn}
                    onClick={() => toggleIndex(index)}
                  >
                    <span className={styles.questionText}>{item.question}</span>
                    <ChevronDown size={18} className={`${styles.chevron} ${isOpen ? styles.chevronRotated : ""}`} />
                  </button>

                  {isOpen && (
                    <div id={contentId} role="region" aria-labelledby={buttonId} className={styles.answerBox}>
                      <p>{item.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
