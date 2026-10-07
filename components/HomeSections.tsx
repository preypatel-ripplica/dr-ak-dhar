"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  ClipboardCheck,
  Crosshair,
  Droplets,
  Phone,
  Quote,
  Ribbon,
  Scan,
  Sparkles,
  Stethoscope,
  Wind,
} from "lucide-react";
import styles from "./HomeSections.module.css";
import SiteFooter from "./SiteFooter";
import AppointmentSection from "./AppointmentSection";
import { useI18n } from "./I18nProvider";

const concerns = [
  {
    title: "New cancer diagnosis",
    detail: "Clarity on staging, treatment options and what the next few weeks may involve.",
    aside: "A first consultation can help turn a new diagnosis into a clear, practical plan.",
    details: [
      {
        prompt: "What would you like explained first?",
        options: ["What the diagnosis means", "Staging and tests", "Treatment choices", "What to expect next"],
      },
      {
        prompt: "What reports do you already have?",
        options: ["Biopsy / pathology", "Scans or imaging", "Both reports and scans", "Still waiting for reports"],
      },
    ],
  },
  {
    title: "Second opinion",
    detail: "An independent review of existing reports and recommendations, with clearer choices.",
    aside: "A second opinion can confirm the plan — or open other options worth considering.",
    details: [
      {
        prompt: "What prompted the second opinion?",
        options: ["Confirm a recommended plan", "Compare treatment options", "Review complex reports", "Family asked for another view"],
      },
      {
        prompt: "What would you like reviewed first?",
        options: ["Diagnosis accuracy", "Treatment recommendation", "Surgery vs medical therapy", "Side-effect concerns"],
      },
    ],
  },
  {
    title: "Ongoing treatment support",
    detail: "Guidance during chemotherapy, immunotherapy, targeted therapy or follow-up care.",
    aside: "Bring questions about your current plan — we will focus on what matters most right now.",
    details: [
      {
        prompt: "Where are you in treatment?",
        options: ["About to start", "Midway through cycles", "Near completion", "On follow-up / maintenance"],
      },
      {
        prompt: "What do you need help with most?",
        options: ["Side effects", "Dose or schedule questions", "Treatment response", "Next treatment decisions"],
      },
    ],
  },
  {
    title: "Symptom or health concern",
    detail: "Guidance on a symptom and whether it needs specialist oncology review.",
    aside: "Share what you are noticing so we can guide you toward the right next step.",
    details: [
      {
        prompt: "What is the main concern?",
        options: ["New or persistent pain", "Unexplained weight loss", "Lump or swelling", "Other worrying symptom"],
      },
      {
        prompt: "How long has this been going on?",
        options: ["Less than 2 weeks", "2–6 weeks", "More than 6 weeks", "Not sure"],
      },
    ],
  },
];

const treatmentGroups = [
  {
    label: "Breast cancer",
    slug: "breast-cancer",
    text: "Thoughtful, evidence-based care across diagnosis, surgery and systemic treatment — explained at your pace.",
    focus: "Breast tumours",
    approach: "Personalised systemic care",
    image: "/images/treatments/breast-cancer.jpg",
    imageAlt: "Doctor discussing care options with a patient",
    Icon: Ribbon,
  },
  {
    label: "Blood cancer",
    slug: "blood-cancer",
    text: "Personalised treatment planning for lymphoma, myeloma and leukaemia, with clear next steps at every stage.",
    focus: "Lymphoma, myeloma, leukaemia",
    approach: "Targeted & chemo pathways",
    image: "/images/treatments/blood-cancer.jpg",
    imageAlt: "Laboratory research supporting blood cancer care",
    Icon: Droplets,
  },
  {
    label: "Lung cancer",
    slug: "lung-cancer",
    text: "A multidisciplinary approach that connects testing, treatment and ongoing support for lung cancer care.",
    focus: "Lung tumours",
    approach: "Diagnosis to follow-up",
    image: "/images/treatments/lung-cancer.jpg",
    imageAlt: "Medical professional reviewing lung health imaging",
    Icon: Wind,
  },
  {
    label: "Head & neck cancer",
    slug: "head-neck-cancer",
    text: "Care for cancers of the head and neck, with a clear plan that balances treatment goals and quality of life.",
    focus: "Head & neck tumours",
    approach: "Multidisciplinary planning",
    image: "/images/treatments/head-neck-cancer.jpg",
    imageAlt: "Specialist reviewing head and neck care options",
    Icon: Scan,
  },
  {
    label: "Immunotherapy",
    slug: "immunotherapy",
    text: "Explore newer therapies that help the immune system recognise cancer, and understand where they may fit into your care.",
    focus: "Immune-based treatment",
    approach: "Evidence-led planning",
    image: "/images/treatments/immunotherapy.jpg",
    imageAlt: "Modern medical science supporting immunotherapy care",
    Icon: Sparkles,
  },
  {
    label: "Targeted therapy",
    slug: "targeted-therapy",
    text: "Precision treatments guided by tumour biology — helping you understand when a targeted option may be right.",
    focus: "Molecularly guided care",
    approach: "Precision oncology",
    image: "/images/treatments/targeted-therapy.jpg",
    imageAlt: "Precision medicine and targeted therapy research",
    Icon: Crosshair,
  },
];

const faqs = [
  ["What should I bring for my first consultation?", "Please bring your scans, pathology reports, prescriptions and a list of current medicines. A family member or trusted person is welcome too."],
  ["Do I need a referral?", "You can request a consultation directly. If you already have a referral or reports, sharing them before your visit helps us prepare."],
  ["Can I get a second opinion?", "Yes. A second opinion can help you understand your diagnosis, compare options and feel more confident about the next step."],
  ["Where does Dr. Dhar consult?", "Dr. Dhar consults at Marengo Asia Hospitals, Gurugram. The clinic team can confirm available appointments and directions."],
];

const trustStats = [
  { value: "35+", label: "Years of experience" },
  { value: "20,000+", label: "Happy patients" },
  { value: "5,000+", label: "Successful treatments" },
];

const testimonials = [
  {
    quote:
      "After my diagnosis, every conversation felt hurried — until we met Dr. Dhar. He explained staging and options in plain language, and for the first time I felt I could breathe and decide.",
    name: "Ananya S.",
    place: "Gurugram",
    context: "Breast cancer care",
  },
  {
    quote:
      "We came for a second opinion on a complex report. He reviewed everything carefully, confirmed what mattered, and helped us see a clearer path forward.",
    name: "Rajesh M.",
    place: "Delhi",
    context: "Second opinion",
  },
  {
    quote:
      "Immunotherapy was new to us. Dr. Dhar never rushed the questions — about side effects, timing, and what to expect next. That patience made the whole journey less frightening.",
    name: "Fatima K.",
    place: "Noida",
    context: "Immunotherapy",
  },
  {
    quote:
      "During lymphoma treatment, I needed honest answers more than reassurance. He gave both — with a plan that felt personal, not generic.",
    name: "Vikram P.",
    place: "Gurugram",
    context: "Blood cancer care",
  },
  {
    quote:
      "Midway through chemotherapy I had so many doubts. The clinic team and Dr. Dhar helped me understand dose changes and what was normal — I never felt left alone between visits.",
    name: "Meera D.",
    place: "Faridabad",
    context: "Ongoing treatment",
  },
];

export default function HomeSections() {
  const { t, localizeHref } = useI18n();
  const [concern, setConcern] = useState<number | null>(null);
  const [detailAnswers, setDetailAnswers] = useState<[number | null, number | null]>([null, null]);
  const [step, setStep] = useState(1);
  const [treatment, setTreatment] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [testimonial, setTestimonial] = useState(0);
  const [testimonialPaused, setTestimonialPaused] = useState(false);
  const active = treatmentGroups[treatment];
  const ActiveIcon = active.Icon;
  const activeConcern = concern !== null ? concerns[concern] : null;
  const step2Ready = detailAnswers[0] !== null && detailAnswers[1] !== null;
  const activeTestimonial = testimonials[testimonial];

  useEffect(() => {
    if (testimonialPaused) return;
    const id = window.setInterval(() => {
      setTestimonial((current) => (current + 1) % testimonials.length);
    }, 5500);
    return () => window.clearInterval(id);
  }, [testimonialPaused]);

  const goToTestimonial = (index: number) => {
    setTestimonial((index + testimonials.length) % testimonials.length);
  };

  const resetFinder = () => {
    setStep(1);
    setConcern(null);
    setDetailAnswers([null, null]);
  };

  const selectConcern = (index: number) => {
    setConcern(index);
    setDetailAnswers([null, null]);
  };

  return (
    <>
      <section className={styles.introSection} aria-labelledby="intro-title">
        <div className={`${styles.container} ${styles.doctorProfile}`}>
          <div className={`${styles.profileVisual} reveal-left`}>
            <Image src="/images/dr-ak-dhar-consultation.png" alt={t("Dr. (Brig.) A. K. Dhar in his clinic coat")} width={787} height={802} sizes="(max-width: 700px) 82vw, 430px" />
            <div className={styles.profileQuote}><span>“</span><p>{t("Clarity in every conversation.")}<br />{t("Confidence in every next step.")}</p></div>
          </div>
          <div className={`${styles.profileCopy} reveal-right`}>
            <span className={styles.sectionKicker}>{t("ABOUT THE DOCTOR")}</span>
            <h2 id="intro-title">{t("A trusted name in cancer care.")}</h2>
            <p className={styles.profileLead}>{t("Dr. (Brig.) A. K. Dhar is a senior medical oncologist with more than 35 years of experience caring for people with cancer.")}</p>
            <p>{t("As Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, he brings together deep expertise, honest guidance and the patience to make complex decisions feel clearer.")}</p>
            <ul className={styles.profileHighlights}>
              <li><Check size={16} />{t("35+ years in medical oncology")}</li>
              <li><Check size={16} />{t("Clinical Director & Head, Medical Oncology")}</li>
              <li><Check size={16} />{t("Care for solid tumours and blood cancers")}</li>
              <li><Check size={16} />{t("Marengo Asia Hospitals, Gurugram")}</li>
            </ul>
            <div className={styles.profileSignature}><strong>Dr. (Brig.) A. K. Dhar</strong><span>{t("Medical Oncologist & Cancer Specialist")}</span></div>
            <Link className={styles.profileButton} href={localizeHref("/about")}>{t("More about Dr. Dhar")} <ArrowRight size={17} /></Link>
          </div>
        </div>
      </section>

      <section className={styles.statsBreak} aria-label={t("Practice highlights")}>
        <div className={`${styles.container} ${styles.statsGrid}`}>
          {trustStats.map((stat, index) => (
            <div key={stat.label} className={`${styles.statItem} reveal-scale reveal-delay-${index + 1}`}>
              <strong dir="ltr">{stat.value}</strong>
              <span>{t(stat.label)}</span>
            </div>
          ))}
        </div>
      </section>

      <section className={styles.treatmentSection} aria-labelledby="treatment-title">
        <div className={styles.container}>
          <div className={`${styles.treatmentIntro} reveal`}>
            <div>
              <span className={styles.sectionKicker}>{t("01 / CARE THAT'S RIGHT FOR YOU")}</span>
              <h2 id="treatment-title">{t("Every diagnosis is different.")}<br /><em>{t("Your care should be, too.")}</em></h2>
            </div>
            <div className={styles.treatmentIntroCopy}>
              <p>{t("From prevention to complex pathways, understand your options at your own pace.")}</p>
              <Link className={styles.textLink} href={localizeHref("/treatments")}>{t("View all treatments")} <span><ArrowUpRight size={16} /></span></Link>
            </div>
          </div>

          <div className={`${styles.treatmentCard} reveal reveal-delay-1`}>
            <div className={styles.treatmentTabs} role="tablist" aria-label={t("Treatment pathways")}>
              {treatmentGroups.map((item, index) => {
                const Icon = item.Icon;
                const selected = treatment === index;
                return (
                  <button
                    key={item.slug}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    className={selected ? styles.activeTreatment : undefined}
                    onClick={() => setTreatment(index)}
                  >
                    <Icon size={18} strokeWidth={1.6} />
                    <span className={styles.tabLabel}>{t(item.label)}</span>
                    {selected ? <ArrowRight size={16} /> : <ArrowUpRight size={16} />}
                  </button>
                );
              })}
            </div>

            <div className={styles.treatmentVisual}>
              <Image
                key={active.image}
                src={active.image}
                alt={t(active.imageAlt)}
                fill
                sizes="(max-width: 900px) 90vw, 360px"
                className={styles.treatmentImage}
              />
            </div>

            <div className={styles.treatmentPanel} role="tabpanel">
              <div key={active.slug} className={styles.treatmentPanelInner}>
                <span className={styles.panelKicker}>{String(treatment + 1).padStart(2, "0")} / {t("SPECIALIST CARE")}</span>
                <h3>
                  <ActiveIcon size={24} strokeWidth={1.5} />
                  {t(active.label)}
                </h3>
                <p>{t(active.text)}</p>
                <div className={styles.treatmentMeta}>
                  <div>
                    <small>{t("Focus")}</small>
                    <strong>{t(active.focus)}</strong>
                  </div>
                  <div>
                    <small>{t("Approach")}</small>
                    <strong>{t(active.approach)}</strong>
                  </div>
                </div>
                <Link className={styles.treatmentExplore} href={localizeHref(`/treatments/${active.slug}/`)}>
                  {t("Explore this treatment")}
                  <span aria-hidden="true"><ArrowRight size={16} strokeWidth={1.8} /></span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.finderSection} aria-labelledby="finder-title">
        <div className={`${styles.container} ${styles.finderWrap}`}>
          <div className={`${styles.finderHeading} reveal`}>
            <span className={styles.sectionKicker}>{t("02 / FIND YOUR STARTING POINT")}</span>
            <h2 id="finder-title">{t("Not sure what care you need?")}</h2>
            <p>{t("Answer a few short questions. We will help you find the right place to begin.")}</p>
          </div>

          <div className={`${styles.finderGrid} reveal reveal-delay-1`}>
            <div className={styles.finderCard}>
              <div className={styles.finderTop}>
                <span>{t("Step")} {step} {t("of")} 3</span>
                <button type="button" onClick={resetFinder}>
                  {t("Start over")}
                </button>
              </div>
              <div className={styles.progress} aria-hidden="true">
                <span style={{ width: `${step * 33.33}%` }} />
              </div>

              <div className={styles.finderBody}>
                <div
                  className={step === 1 ? undefined : styles.finderSizer}
                  aria-hidden={step !== 1}
                >
                  <h3>{t("What brings you here today?")}</h3>
                  <div className={styles.concerns}>
                    {concerns.map((item, index) => (
                      <button
                        key={item.title}
                        type="button"
                        tabIndex={step === 1 ? undefined : -1}
                        className={concern === index ? styles.selectedConcern : undefined}
                        onClick={() => selectConcern(index)}
                      >
                        <span className={styles.concernCopy}>
                          <strong>{t(item.title)}</strong>
                          <small>{t(item.detail)}</small>
                        </span>
                        <span className={styles.concernIcon}>
                          {concern === index ? <Check size={17} strokeWidth={2.2} /> : <ArrowRight size={16} />}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {step === 2 && activeConcern && (
                  <div className={styles.finderOverlay}>
                    <div className={styles.detailStep}>
                      <h3>{t("A few details will help")}</h3>
                      {activeConcern.details.map((group, groupIndex) => (
                        <div key={group.prompt} className={styles.detailGroup}>
                          <p className={styles.detailPrompt}>{t(group.prompt)}</p>
                          <div className={styles.detailOptions}>
                            {group.options.map((option, optionIndex) => (
                              <button
                                key={option}
                                type="button"
                                className={detailAnswers[groupIndex] === optionIndex ? styles.selectedDetail : undefined}
                                onClick={() => {
                                  const next: [number | null, number | null] = [...detailAnswers];
                                  next[groupIndex] = optionIndex;
                                  setDetailAnswers(next);
                                }}
                              >
                                {t(option)}
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className={styles.finderOverlay}>
                    <div className={styles.stepMessage}>
                      <ClipboardCheck size={34} strokeWidth={1.4} />
                      <h3>{t("Your next step is ready.")}</h3>
                      <p>
                        {t("Book a consultation")}
                        {activeConcern ? ` ${t("for")} ${t(activeConcern.title).toLowerCase()}` : ""}. {t("Bring any scans, pathology reports or prescriptions you already have — our team will guide you from there.")}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              <div className={styles.finderActions}>
                {step > 1 && (
                  <button type="button" className={styles.backButton} onClick={() => setStep(step - 1)}>
                    {t("Back")}
                  </button>
                )}
                {step === 3 ? (
                  <Link className={styles.continueButton} href={localizeHref("/contact")}>
                    {t("Book a consultation")} <ArrowUpRight size={17} />
                  </Link>
                ) : (
                  <button
                    type="button"
                    className={styles.continueButton}
                    disabled={(step === 1 && concern === null) || (step === 2 && !step2Ready)}
                    onClick={() => setStep(Math.min(3, step + 1))}
                  >
                    {t("Continue")} <ArrowUpRight size={17} />
                  </button>
                )}
              </div>
            </div>

            <aside className={styles.finderAside}>
              <div className={styles.asideCard}>
                <div className={styles.iconBubble}>
                  <Stethoscope size={22} strokeWidth={1.5} />
                </div>
                <h3>{activeConcern ? t(activeConcern.title) : t("A calm, considered next step.")}</h3>
                <p>
                  {activeConcern
                    ? t(activeConcern.aside)
                    : t("You do not have to navigate cancer care alone. Start with the question that is on your mind.")}
                </p>
                <Link href={localizeHref("/contact")}>
                  {t("Know more")} <ArrowRight size={16} />
                </Link>
              </div>

              <div className={styles.nextCard}>
                <span>{t("What happens next?")}</span>
                <p><i>1</i> {t("Share symptoms or reports")}</p>
                <p><i>2</i> {t("Doctor reviews the concern")}</p>
                <p><i>3</i> {t("Get a clear treatment plan")}</p>
              </div>

              <a className={styles.helpCard} href="tel:+919810818266">
                <Phone size={21} strokeWidth={1.5} />
                <span>
                  <strong>{t("Need help right now?")}</strong>
                  <small>{t("Call the clinic team")}</small>
                </span>
                <ArrowRight size={18} />
              </a>
            </aside>
          </div>
        </div>
      </section>

      <section className={styles.testimonialsSection} aria-labelledby="testimonials-title">
        <div className={styles.container}>
          <div className={`${styles.testimonialsHeader} reveal`}>
            <div>
              <span className={styles.sectionKicker}>{t("03 / PATIENT STORIES")}</span>
              <h2 id="testimonials-title">
                {t("Words from people")}
                <br />
                <em>{t("we've walked with.")}</em>
              </h2>
            </div>
            <Link className={styles.textLink} href={localizeHref("/contact")}>
              {t("Share your experience")}
              <span aria-hidden="true">
                <ArrowRight size={16} />
              </span>
            </Link>
          </div>

          <div
            className={`${styles.testimonialStage} reveal reveal-delay-1`}
            onMouseEnter={() => setTestimonialPaused(true)}
            onMouseLeave={() => setTestimonialPaused(false)}
          >
            <aside className={styles.testimonialPanel} aria-hidden="true">
              <Quote size={36} strokeWidth={1.4} />
              <p>{t("Care that makes a difference.")}</p>
              <small>{t("Individual experiences. Personal journeys.")}</small>
            </aside>

            <div className={styles.testimonialMain}>
              <div className={styles.testimonialViewport}>
                <div className={styles.testimonialSizer} aria-hidden="true">
                  {testimonials.map((item) => (
                    <div key={item.name} className={styles.testimonialSlide}>
                      <span className={styles.testimonialContext}>{t(item.context)}</span>
                      <blockquote>{t(item.quote)}</blockquote>
                      <div className={styles.testimonialAuthor}>
                        <strong>{t(item.name)}</strong>
                        <span>{t(item.place)}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.testimonialActive}>
                  <div key={activeTestimonial.name} className={styles.testimonialSlide}>
                    <span className={styles.testimonialContext}>{t(activeTestimonial.context)}</span>
                    <blockquote>{t(activeTestimonial.quote)}</blockquote>
                    <div className={styles.testimonialAuthor}>
                      <strong>{t(activeTestimonial.name)}</strong>
                      <span>{t(activeTestimonial.place)}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className={styles.testimonialControls}>
                <div className={styles.testimonialNav}>
                  <button
                    type="button"
                    aria-label={t("Previous testimonial")}
                    onClick={() => goToTestimonial(testimonial - 1)}
                  >
                    <ArrowLeft size={18} strokeWidth={1.8} />
                  </button>
                  <button
                    type="button"
                    className={styles.testimonialNext}
                    aria-label={t("Next testimonial")}
                    onClick={() => goToTestimonial(testimonial + 1)}
                  >
                    <ArrowRight size={18} strokeWidth={1.8} />
                  </button>
                  <span>
                    {testimonial + 1} / {testimonials.length}
                  </span>
                </div>

                <div className={styles.testimonialDots} role="tablist" aria-label={t("Testimonials")}>
                  {testimonials.map((item, index) => (
                    <button
                      key={item.name}
                      type="button"
                      role="tab"
                      aria-selected={testimonial === index}
                      aria-label={`${t("Show testimonial from")} ${t(item.name)}`}
                      className={testimonial === index ? styles.activeDot : undefined}
                      onClick={() => goToTestimonial(index)}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="faq-title">
        <div className={styles.container}>
          <div className={styles.faqGrid}>
            <div className={`${styles.faqIntro} reveal-left`}>
              <span className={styles.sectionKicker}>{t("COMMON QUESTIONS")}</span>
              <h2 id="faq-title">
                {t("You can ask")}
                <br />
                <em>{t("anything.")}</em>
              </h2>
              <p>{t("We believe an informed patient is an empowered patient. Here are a few questions people often bring to their first visit.")}</p>
              <Link className={styles.faqCta} href={localizeHref("/contact")}>
                {t("Ask the clinic team")}
                <ArrowRight size={17} />
              </Link>
            </div>
            <div className={`${styles.faqList} reveal-right`}>
              {faqs.map(([question, answer], index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    className={`${styles.faqItem}${isOpen ? ` ${styles.faqItemOpen}` : ""}`}
                    key={question}
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaq(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${index}`}
                      id={`faq-button-${index}`}
                    >
                      <span className={styles.faqIndex}>{String(index + 1).padStart(2, "0")}</span>
                      <span className={styles.faqQuestion}>{t(question)}</span>
                      <ChevronDown size={18} />
                    </button>
                    <div
                      id={`faq-panel-${index}`}
                      role="region"
                      aria-labelledby={`faq-button-${index}`}
                      className={styles.faqAnswer}
                      data-open={isOpen ? "true" : "false"}
                    >
                      <div className={styles.faqAnswerInner}>
                        <p>{t(answer)}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <AppointmentSection />

      <SiteFooter />
    </>
  );
}

