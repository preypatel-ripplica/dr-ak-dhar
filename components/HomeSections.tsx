"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, ArrowUpRight, Check, ChevronDown, ClipboardCheck, HeartPulse, Phone, Stethoscope } from "lucide-react";
import styles from "./HomeSections.module.css";

const site = "https://canceronco.in";

const concerns = [
  { title: "I have a new diagnosis", detail: "Understand your diagnosis, staging and treatment options with a clear plan." },
  { title: "I need a second opinion", detail: "Bring your reports for an independent review and a considered next step." },
  { title: "I am in active treatment", detail: "Get support with chemotherapy, immunotherapy, targeted therapy and follow-up." },
  { title: "I am worried about a symptom", detail: "Share what you are experiencing so we can guide you toward the right care." },
];

const treatmentGroups = [
  { label: "Breast cancer", slug: "breast-cancer", text: "Thoughtful, evidence-based care across diagnosis, surgery and systemic treatment." },
  { label: "Blood cancer", slug: "blood-cancer", text: "Personalised treatment planning for lymphoma, myeloma and leukaemia." },
  { label: "Lung cancer", slug: "lungs-cancer", text: "A multidisciplinary approach that connects testing, treatment and ongoing support." },
  { label: "Immunotherapy", slug: "immunotherapy", text: "Explore newer therapies and understand where they may fit into your care." },
];

const faqs = [
  ["What should I bring for my first consultation?", "Please bring your scans, pathology reports, prescriptions and a list of current medicines. A family member or trusted person is welcome too."],
  ["Do I need a referral?", "You can request a consultation directly. If you already have a referral or reports, sharing them before your visit helps us prepare."],
  ["Can I get a second opinion?", "Yes. A second opinion can help you understand your diagnosis, compare options and feel more confident about the next step."],
  ["Where does Dr. Dhar consult?", "Dr. Dhar consults at Marengo Asia Hospitals, Gurugram. The clinic team can confirm available appointments and directions."],
];

export default function HomeSections() {
  const [concern, setConcern] = useState<number | null>(null);
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <>
      <section className={styles.introSection} aria-labelledby="intro-title">
        <div className={`${styles.container} ${styles.doctorProfile}`}>
          <div className={styles.profileVisual}>
            <Image src="/images/dr-ak-dhar-consultation.png" alt="Dr. (Brig.) A. K. Dhar in his clinic coat" width={787} height={802} sizes="(max-width: 700px) 82vw, 430px" />
            <div className={styles.profileQuote}><span>“</span><p>Clarity in every conversation.<br />Confidence in every next step.</p></div>
          </div>
          <div className={styles.profileCopy}>
            <span className={styles.sectionKicker}>ABOUT THE DOCTOR</span>
            <h2 id="intro-title">A trusted name in cancer care.</h2>
            <p className={styles.profileLead}>Dr. (Brig.) A. K. Dhar is a senior medical oncologist with more than 35 years of experience caring for people with cancer.</p>
            <p>As Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, he brings together deep expertise, honest guidance and the patience to make complex decisions feel clearer.</p>
            <ul className={styles.profileHighlights}><li><Check size={16} />35+ years in medical oncology</li><li><Check size={16} />Clinical Director &amp; Head, Medical Oncology</li><li><Check size={16} />Care for solid tumours and blood cancers</li><li><Check size={16} />Marengo Asia Hospitals, Gurugram</li></ul>
            <div className={styles.profileSignature}><strong>Dr. (Brig.) A. K. Dhar</strong><span>Medical Oncologist &amp; Cancer Specialist</span></div>
            <a className={styles.profileButton} href={`${site}/about/`}>More about Dr. Dhar <ArrowRight size={17} /></a>
          </div>
        </div>
      </section>

      <section className={styles.finderSection} aria-labelledby="finder-title">
        <div className={`${styles.container} ${styles.finderWrap}`}>
          <div className={styles.finderHeading}><span className={styles.sectionKicker}>A SIMPLE STARTING POINT</span><h2 id="finder-title">Not sure what care you need?</h2><p>Tell us what feels most important. We will help you find the right place to begin.</p></div>
          <div className={styles.finderGrid}>
            <div className={styles.finderCard}>
              <div className={styles.finderTop}><span>Step {step} of 3</span><button onClick={() => setStep(1)}>Start over</button></div>
              <div className={styles.progress}><span style={{ width: `${step * 33.33}%` }} /></div>
              {step === 1 && <><h3>What are you mainly concerned about?</h3><div className={styles.concerns}>{concerns.map((item, index) => <button key={item.title} className={concern === index ? styles.selectedConcern : ""} onClick={() => setConcern(index)}>{item.title}<span>{concern === index ? <Check size={17} /> : <ArrowRight size={16} />}</span></button>)}</div></>}
              {step === 2 && <div className={styles.stepMessage}><HeartPulse size={34} /><h3>Thank you for sharing that.</h3><p>We will review your concern and help you prepare for a focused consultation.</p></div>}
              {step === 3 && <div className={styles.stepMessage}><ClipboardCheck size={34} /><h3>Your next step is ready.</h3><p>Book a consultation and bring any reports you already have. Our team will guide you from there.</p></div>}
              <div className={styles.finderActions}>{step > 1 && <button className={styles.backButton} onClick={() => setStep(step - 1)}>Back</button>}<button className={styles.continueButton} disabled={step === 1 && concern === null} onClick={() => setStep(Math.min(3, step + 1))}>{step === 3 ? "Book a consultation" : "Continue"}<ArrowUpRight size={17} /></button></div>
            </div>
            <aside className={styles.finderAside}><div className={styles.asideCard}><div className={styles.iconBubble}><Stethoscope size={22} /></div><h3>{concern === null ? "A calm, considered next step." : concerns[concern].title}</h3><p>{concern === null ? "You do not have to navigate a diagnosis alone. Start with the question that is on your mind." : concerns[concern].detail}</p><a href={`${site}/contact/`}>Know more <ArrowRight size={16} /></a></div><div className={styles.nextCard}><span>What happens next?</span><p><i>1</i> Share symptoms or reports</p><p><i>2</i> Doctor reviews the concern</p><p><i>3</i> Get a clear treatment plan</p></div><a className={styles.helpCard} href="tel:+919810818266"><Phone size={21} /><span><strong>Need help right now?</strong><small>Call the clinic team</small></span><ArrowRight size={18} /></a></aside>
          </div>
        </div>
      </section>

      <section className={styles.treatmentSection} aria-labelledby="treatment-title"><div className={styles.container}><div className={styles.sectionHeader}><div><span className={styles.sectionKicker}>TREATMENT OPTIONS</span><h2 id="treatment-title">Care designed around you.</h2></div><a className={styles.textLink} href={`${site}/treatments/`}>View all treatments <ArrowUpRight size={17} /></a></div><div className={styles.treatmentGrid}><div className={styles.treatmentTabs}>{treatmentGroups.map((item, index) => <button key={item.label} className={treatment === index ? styles.activeTreatment : ""} onClick={() => setTreatment(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.label}<ArrowRight size={17} /></button>)}</div><div className={styles.treatmentPanel}><span className={styles.panelNumber}>0{treatment + 1}</span><h3>{treatmentGroups[treatment].label}</h3><p>{treatmentGroups[treatment].text}</p><a href={`${site}/${treatmentGroups[treatment].slug}/`}>Explore this care pathway <ArrowUpRight size={17} /></a></div></div></div></section>

      <section className={styles.processSection} aria-labelledby="process-title"><div className={styles.container}><div className={styles.processIntro}><span className={styles.sectionKicker}>YOUR CONSULTATION</span><h2 id="process-title">Care is a journey we take together.</h2><p>From your first conversation to follow-up, every decision is explained in a way that helps you move forward with confidence.</p></div><div className={styles.processSteps}><div><span>01</span><strong>Listen</strong><p>We understand your history, concerns and goals.</p></div><div><span>02</span><strong>Understand</strong><p>We explain your reports and treatment choices clearly.</p></div><div><span>03</span><strong>Plan</strong><p>We create a practical, personalised care plan.</p></div></div></div></section>

      <section className={styles.faqSection} aria-labelledby="faq-title"><div className={styles.container}><div className={styles.faqGrid}><div><span className={styles.sectionKicker}>COMMON QUESTIONS</span><h2 id="faq-title">You can ask anything.</h2><p>We believe an informed patient is an empowered patient. Here are a few questions people often bring to their first visit.</p><a className={styles.textLink} href={`${site}/contact/`}>Ask the clinic team <ArrowRight size={17} /></a></div><div className={styles.faqList}>{faqs.map(([question, answer], index) => <div className={styles.faqItem} key={question}><button onClick={() => setOpenFaq(openFaq === index ? null : index)} aria-expanded={openFaq === index}>{question}<ChevronDown size={18} /></button>{openFaq === index && <p>{answer}</p>}</div>)}</div></div></div></section>

      <section className={styles.ctaSection}><div className={styles.container}><div className={styles.ctaCard}><div><span className={styles.sectionKicker}>READY WHEN YOU ARE</span><h2>Let&apos;s take the next step together.</h2><p>Book a consultation with Dr. A. K. Dhar or speak with the clinic team about your concern.</p></div><a className={styles.ctaButton} href={`${site}/contact/`}>Book an appointment <ArrowUpRight size={18} /></a></div></div></section>

      <footer className={styles.footer}><div className={`${styles.container} ${styles.footerGrid}`}><div><span className={styles.footerBrand}>Dr. A. K. <strong>Dhar.</strong></span><p>Medical oncology care with clarity, experience and empathy.</p></div><div><span>CONTACT</span><a href="tel:+919810818266">+91 98108 18266</a><a href="mailto:info@canceronco.in">info@canceronco.in</a></div><div><span>CLINIC</span><p>Marengo Asia Hospitals<br />Gurugram, Haryana</p></div></div><div className={`${styles.container} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} Dr. A. K. Dhar</span><span>Medical oncology · Gurugram & Delhi NCR</span></div></footer>
    </>
  );
}
