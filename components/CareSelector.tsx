"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Droplet,
  FileText,
  HeartPulse,
  HelpCircle,
  Phone,
  Ribbon,
  RotateCcw,
  Shield,
  Sparkles,
  Stethoscope,
  Wind,
} from "lucide-react";
import styles from "./CareSelector.module.css";
import { DOCTOR_INFO } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

const SITUATIONS = [
  {
    id: "new-diagnosis",
    title: "New Cancer Diagnosis",
    subtitle: "Recently diagnosed and seeking clear treatment options & tumor staging",
    badge: "First Consultation",
    icon: Stethoscope,
  },
  {
    id: "second-opinion",
    title: "Expert Second Opinion",
    subtitle: "Have existing biopsy or PET-CT reports and want an independent 35+ year expert review",
    badge: "Diagnostic Review",
    icon: FileText,
  },
  {
    id: "active-treatment",
    title: "Active Treatment Supervision",
    subtitle: "Undergoing chemotherapy, targeted pills, immunotherapy, or side effect management",
    badge: "Ongoing Care",
    icon: HeartPulse,
  },
  {
    id: "symptom-check",
    title: "Symptom & Diagnostic Check",
    subtitle: "Experiencing concerning symptoms or need guidance on required diagnostic scans",
    badge: "Early Assessment",
    icon: Activity,
  },
];

const CANCER_TYPES = [
  { id: "breast", label: "Breast Cancer Care", icon: Ribbon, category: "Solid Tumours" },
  { id: "blood", label: "Blood Cancer & Haematology", icon: Droplet, category: "Lymphoma / Myeloma / Leukaemia" },
  { id: "lung", label: "Lung Cancer & Targeted Therapy", icon: Wind, category: "Precision Medicine" },
  { id: "head-neck", label: "Head & Neck Cancer", icon: Activity, category: "Organ Preservation" },
  { id: "immunotherapy", label: "Immunotherapy & Checkpoint Care", icon: Shield, category: "Advanced Therapeutics" },
  { id: "other", label: "General Oncology / Unsure", icon: HelpCircle, category: "Clinical Evaluation" },
];

const REPORT_STATUSES = [
  { id: "biopsy", label: "Biopsy & Pathology Lab Reports", desc: "Tissue biopsy results, block reports, or histological subtype" },
  { id: "scans", label: "PET-CT / MRI / CT Imaging Discs", desc: "Diagnostic DICOM imaging discs and official radiology reports" },
  { id: "genomic", label: "Biomarker / NGS Genomic Testing", desc: "EGFR, ALK, ROS1, PD-L1, or genetic mutation profiling" },
  { id: "pending", label: "Awaiting Scan Results / No Reports Yet", desc: "Seeking expert advice on which initial tests to schedule" },
];

export default function CareSelector() {
  const [step, setStep] = useState(1);
  const [situation, setSituation] = useState<string | null>(null);
  const [cancerType, setCancerType] = useState<string | null>(null);
  const [reportStatus, setReportStatus] = useState<string | null>(null);

  const selectedSituationObj = SITUATIONS.find((s) => s.id === situation);
  const selectedCancerTypeObj = CANCER_TYPES.find((c) => c.id === cancerType);
  const selectedReportObj = REPORT_STATUSES.find((r) => r.id === reportStatus);

  const handleReset = () => {
    setStep(1);
    setSituation(null);
    setCancerType(null);
    setReportStatus(null);
  };

  return (
    <section className={styles.section} id="care-selector" aria-labelledby="care-selector-title">
      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>
              <HelpCircle size={15} /> A GUIDED STARTING POINT
            </span>
            <h2 id="care-selector-title" className={styles.title}>
              What Care Do You Need?
            </h2>
            <p className={styles.subtitle}>
              Answer 3 quick questions to receive a tailored preparation checklist and clear next steps for your consultation with Dr. (Brig.) A. K. Dhar.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Main Interactive Wizard Card */}
          <ScrollReveal variant="fade-up" delay={100} className={styles.wizardCard}>
            <div className={styles.wizardTop}>
              <span className={styles.stepBadge}>
                {step <= 3 ? `Question ${step} of 3` : "Personalized Care Plan"}
              </span>
              {step > 1 && (
                <button className={styles.resetBtn} onClick={handleReset}>
                  <RotateCcw size={14} /> Start over
                </button>
              )}
            </div>

            {/* Progress Bar */}
            <div className={styles.progressTrack}>
              <div
                className={styles.progressBar}
                style={{ width: `${Math.min(step * 33.33, 100)}%` }}
              />
            </div>

            {/* Question 1: Medical Situation */}
            {step === 1 && (
              <div className={styles.stepContent}>
                <h3>1. What best describes your current situation?</h3>
                <p className={styles.questionHint}>Choose the option that aligns closest with your medical needs right now:</p>
                <div className={styles.situationGrid}>
                  {SITUATIONS.map((item) => {
                    const isSelected = situation === item.id;
                    const IconComponent = item.icon;
                    return (
                      <button
                        key={item.id}
                        className={`${styles.situationCard} ${isSelected ? styles.situationCardSelected : ""}`}
                        onClick={() => setSituation(item.id)}
                      >
                        <div className={styles.cardHeaderRow}>
                          <div className={styles.situationIconCircle}>
                            <IconComponent size={20} />
                          </div>
                          <span className={styles.situationTag}>{item.badge}</span>
                        </div>
                        <strong className={styles.situationTitle}>{item.title}</strong>
                        <span className={styles.situationSub}>{item.subtitle}</span>
                        <div className={styles.checkBadgeRow}>
                          {isSelected ? (
                            <span className={styles.selectedBadge}><Check size={14} /> Selected</span>
                          ) : (
                            <span className={styles.selectPrompt}>Select <ArrowRight size={14} /></span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 2: Cancer Specialty / Pathway */}
            {step === 2 && (
              <div className={styles.stepContent}>
                <h3>2. Which cancer care area or pathway does this relate to?</h3>
                <p className={styles.questionHint}>Select a specialized care field to tailor your diagnostic checklist:</p>
                <div className={styles.cancerGrid}>
                  {CANCER_TYPES.map((c) => {
                    const isSelected = cancerType === c.id;
                    const IconComponent = c.icon;
                    return (
                      <button
                        key={c.id}
                        className={`${styles.cancerOptionCard} ${isSelected ? styles.cancerOptionSelected : ""}`}
                        onClick={() => setCancerType(c.id)}
                      >
                        <div className={styles.cancerIconWrapper}>
                          <IconComponent size={22} />
                        </div>
                        <div className={styles.cancerTextGroup}>
                          <strong>{c.label}</strong>
                          <small>{c.category}</small>
                        </div>
                        <div className={styles.cancerCheckCircle}>
                          {isSelected ? <Check size={16} /> : <ArrowRight size={14} />}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Question 3: Available Test Reports */}
            {step === 3 && (
              <div className={styles.stepContent}>
                <h3>3. What test reports or diagnostic scans do you have ready?</h3>
                <p className={styles.questionHint}>This helps Dr. Dhar’s team prepare for your diagnostic report review:</p>
                <div className={styles.reportsGrid}>
                  {REPORT_STATUSES.map((r) => {
                    const isSelected = reportStatus === r.id;
                    return (
                      <button
                        key={r.id}
                        className={`${styles.reportOptionCard} ${isSelected ? styles.reportOptionSelected : ""}`}
                        onClick={() => setReportStatus(r.id)}
                      >
                        <div className={styles.reportRadio}>
                          {isSelected ? <Check size={15} /> : null}
                        </div>
                        <div className={styles.reportTextGroup}>
                          <strong>{r.label}</strong>
                          <span>{r.desc}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Tailored Recommendation & Next Steps */}
            {step === 4 && (
              <div className={`${styles.stepContent} ${styles.summaryStep}`}>
                <div className={styles.summaryBadgeRow}>
                  <Sparkles size={16} className={styles.sparkleIcon} />
                  <span>CUSTOM CARE RECOMMENDATION</span>
                </div>

                <h3 className={styles.summaryTitle}>Your Personalized Consultation Plan</h3>
                <p className={styles.summaryLead}>
                  Based on your answers, here is a summary of recommended preparation for your session with <strong>Dr. (Brig.) A. K. Dhar</strong>:
                </p>

                <div className={styles.summaryOverviewBox}>
                  <div className={styles.summaryOverviewItem}>
                    <small>Primary Situation</small>
                    <strong>{selectedSituationObj?.title || "Oncology Consultation"}</strong>
                  </div>
                  <div className={styles.summaryOverviewItem}>
                    <small>Specialised Area</small>
                    <strong>{selectedCancerTypeObj?.label || "Medical Oncology"}</strong>
                  </div>
                  <div className={styles.summaryOverviewItem}>
                    <small>Report Status</small>
                    <strong>{selectedReportObj?.label || "Reports Pending"}</strong>
                  </div>
                </div>

                <div className={styles.checklistCard}>
                  <strong><ClipboardCheck size={18} /> What to bring for your visit:</strong>
                  <ul>
                    <li>Biopsy blocks, tissue slides &amp; pathology lab reports</li>
                    <li>PET-CT imaging DICOM discs and radiology diagnostic reports</li>
                    <li>List of current medications &amp; previous treatment summaries</li>
                    <li>Questions regarding tumor staging, chemotherapy, or targeted therapy</li>
                  </ul>
                </div>

                <div className={styles.summaryActionRow}>
                  <Link href="/contact" className={styles.primaryActionBtn}>
                    Book Appointment at Marengo Asia <ArrowUpRight size={18} />
                  </Link>
                  <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneActionBtn}>
                    <Phone size={16} /> Call Clinic Team ({DOCTOR_INFO.phone})
                  </a>
                </div>
              </div>
            )}

            {/* Wizard Actions Navigation Bar */}
            <div className={styles.wizardActions}>
              {step > 1 && step <= 3 && (
                <button className={styles.backBtn} onClick={() => setStep(step - 1)}>
                  &larr; Back
                </button>
              )}
              {step === 1 && (
                <button
                  className={styles.continueBtn}
                  disabled={!situation}
                  onClick={() => setStep(2)}
                >
                  Next: Select Specialty &rarr;
                </button>
              )}
              {step === 2 && (
                <button
                  className={styles.continueBtn}
                  disabled={!cancerType}
                  onClick={() => setStep(3)}
                >
                  Next: Test Reports &rarr;
                </button>
              )}
              {step === 3 && (
                <button
                  className={styles.continueBtn}
                  disabled={!reportStatus}
                  onClick={() => setStep(4)}
                >
                  View My Personal Recommendation <ArrowUpRight size={17} />
                </button>
              )}
            </div>
          </ScrollReveal>

          {/* Aside Guidance Sidebar */}
          <ScrollReveal variant="slide-left" delay={200} className={styles.aside}>
            <div className={styles.infoCard}>
              <div className={styles.iconBubble}>
                <Stethoscope size={24} />
              </div>
              <h3>
                {!selectedSituationObj
                  ? "A calm, considered next step."
                  : selectedSituationObj.title}
              </h3>
              <p>
                {!selectedSituationObj
                  ? "You do not have to navigate a cancer diagnosis alone. Complete the 3 questions on the left to receive custom preparation guidance."
                  : selectedSituationObj.subtitle}
              </p>

              {selectedCancerTypeObj && (
                <div className={styles.activePathwayPill}>
                  <Ribbon size={14} />
                  <span>Pathway: {selectedCancerTypeObj.label}</span>
                </div>
              )}

              <Link href="/about" className={styles.infoLink}>
                Learn about Dr. Dhar&apos;s 35+ yr background <ArrowRight size={16} />
              </Link>
            </div>

            <div className={styles.processCard}>
              <span className={styles.processHeading}>3-Step Consultation Process</span>
              <div className={styles.processStepsList}>
                <div className={styles.processStepItem}>
                  <span className={styles.stepNum}>1</span>
                  <span>Share clinical symptoms &amp; test reports</span>
                </div>
                <div className={styles.processStepItem}>
                  <span className={styles.stepNum}>2</span>
                  <span>Detailed 35+ yr expert report review</span>
                </div>
                <div className={styles.processStepItem}>
                  <span className={styles.stepNum}>3</span>
                  <span>Receive a clear, personalized treatment plan</span>
                </div>
              </div>
            </div>

            <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneCard}>
              <Phone size={22} className={styles.phoneIcon} />
              <div>
                <strong>Need immediate help?</strong>
                <small>Call the clinic team: {DOCTOR_INFO.phone}</small>
              </div>
              <ArrowRight size={18} />
            </a>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
