"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2, ClipboardCheck, FileText, HelpCircle, Phone, RefreshCw } from "lucide-react";
import styles from "./treatmentSlug.module.css";
import { Treatment, DOCTOR_INFO } from "@/lib/data";

interface TreatmentQuizProps {
  treatment: Treatment;
}

export default function TreatmentQuiz({ treatment }: TreatmentQuizProps) {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qIdx: number, option: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [qIdx]: option }));
  };

  return (
    <section className={styles.quizSection}>
      <div className="container">
        <div className={styles.quizCard}>
          <div className={styles.quizHeader}>
            <span className={styles.quizKicker}>
              <HelpCircle size={15} /> CLINICAL PREPARATION CHECKLIST
            </span>
            <h2 className={styles.quizTitle}>
              Explore Care Information for {treatment.title}
            </h2>
            <p className={styles.quizSubtitle}>
              Select the options below to prepare key topics for your consultation. <em>(Note: This interactive checklist is for informational preparation only and does not constitute a medical diagnosis.)</em>
            </p>
          </div>

          {!submitted ? (
            <div className={styles.questionsList}>
              {treatment.quizQuestions.map((q, qIdx) => (
                <div key={qIdx} className={styles.questionBlock}>
                  <h3>{qIdx + 1}. {q.question}</h3>
                  <div className={styles.optionsGrid}>
                    {q.options.map((opt, oIdx) => {
                      const isSelected = selectedAnswers[qIdx] === opt;
                      return (
                        <button
                          key={oIdx}
                          className={`${styles.optionBtn} ${isSelected ? styles.optionBtnSelected : ""}`}
                          onClick={() => handleSelect(qIdx, opt)}
                        >
                          <span>{opt}</span>
                          {isSelected && <CheckCircle2 size={18} className={styles.checkBadge} />}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}

              <div className={styles.quizFooter}>
                <button
                  className={styles.submitBtn}
                  disabled={Object.keys(selectedAnswers).length === 0}
                  onClick={() => setSubmitted(true)}
                >
                  Review Summary &amp; Recommended Next Steps <ArrowUpRight size={17} />
                </button>
              </div>
            </div>
          ) : (
            <div className={styles.summaryCard}>
              <div className={styles.summaryIconCircle}>
                <ClipboardCheck size={38} />
              </div>
              <h3 className={styles.summaryHeading}>Checklist Summary Prepared</h3>
              <p className={styles.summarySubtext}>
                Thank you for preparing your details for <strong>{treatment.title}</strong>. Here is a summary of your selected options to share during your visit with Dr. (Brig.) A. K. Dhar at Marengo Asia Hospitals.
              </p>

              <div className={styles.summaryPillsGrid}>
                {Object.entries(selectedAnswers).map(([qIdx, ans]) => (
                  <div key={qIdx} className={styles.summaryPillItem}>
                    <FileText size={16} className={styles.pillIcon} />
                    <div>
                      <small>Topic #{Number(qIdx) + 1}</small>
                      <strong>{ans}</strong>
                    </div>
                  </div>
                ))}
              </div>

              <div className={styles.preparationBox}>
                <strong>Recommended Next Steps for Your Consultation:</strong>
                <ul>
                  <li>Bring your biopsy block, pathology slides &amp; PET-CT scan discs.</li>
                  <li>Keep a complete list of current medications and previous treatment summaries.</li>
                  <li>Our care team will review your report timeline with Dr. Dhar prior to your session.</li>
                </ul>
              </div>

              <div className={styles.summaryActions}>
                <Link href="/contact" className={styles.primaryBtn}>
                  Schedule Consultation <ArrowUpRight size={18} />
                </Link>
                <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneActionBtn}>
                  <Phone size={16} /> Call Clinic Team ({DOCTOR_INFO.phone})
                </a>
                <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                  <RefreshCw size={14} /> Re-evaluate Checklist
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
