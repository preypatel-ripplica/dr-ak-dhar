"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Heart,
  Quote,
  ShieldCheck,
  Sparkles,
  Star,
  SlidersHorizontal,
  X,
  ArrowRight,
  Clock,
  Award
} from "lucide-react";
import styles from "./TestimonialsSection.module.css";
import { TESTIMONIALS, Testimonial } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function TestimonialsSection() {
  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedStory, setSelectedStory] = useState<Testimonial | null>(null);

  const categories = ["All", "Breast Cancer", "Blood Cancer", "Lung Cancer"];

  const filteredTestimonials = activeFilter === "All"
    ? TESTIMONIALS
    : TESTIMONIALS.filter(
        (t) => t.category.toLowerCase() === activeFilter.toLowerCase()
      );

  // Get count per category for tab badges
  const getCategoryCount = (cat: string) => {
    if (cat === "All") return TESTIMONIALS.length;
    return TESTIMONIALS.filter((t) => t.category.toLowerCase() === cat.toLowerCase()).length;
  };

  return (
    <section className={styles.section} id="testimonials" aria-labelledby="testimonials-title">
      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className={styles.sectionHeader}>
            <div className={styles.kickerBadge}>
              <Heart size={14} className={styles.heartPulse} />
              <span>PATIENT STORIES &amp; CLINICAL OUTCOMES</span>
            </div>

            <h2 id="testimonials-title" className={styles.title}>
              Reassuring care when it matters most.
            </h2>

            <p className={styles.subtitle}>
              Hear directly from patients and caregivers who have walked the medical oncology path with Dr. (Brig.) A. K. Dhar.
            </p>
          </div>
        </ScrollReveal>

        {/* Filter Bar */}
        <ScrollReveal variant="fade-up" delay={100} className={styles.controlsBar}>
          <div className={styles.filterGroup}>
            <span className={styles.filterLabel}>
              <SlidersHorizontal size={14} /> FILTER BY SPECIALTY:
            </span>
            <div className={styles.tabsRow}>
              {categories.map((cat) => {
                const count = getCategoryCount(cat);
                return (
                  <button
                    key={cat}
                    className={`${styles.filterTab} ${activeFilter === cat ? styles.filterTabActive : ""}`}
                    onClick={() => setActiveFilter(cat)}
                  >
                    <span>{cat}</span>
                    <span className={styles.countBadge}>{count}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* 21st.dev Style Glassmorphism Cards Grid */}
        <ScrollReveal variant="fade-up" delay={150} staggerChildren staggerDelay={120} className={styles.grid}>
          {filteredTestimonials.map((item) => (
            <article key={item.id} className={styles.card}>
              <div className={styles.cardGlow} />

              {item.outcomeBadge && (
                <div className={styles.outcomeRibbon}>
                  <Sparkles size={12} />
                  <span>{item.outcomeBadge}</span>
                </div>
              )}

              <div className={styles.cardTop}>
                <div className={styles.quoteBubble}>
                  <Quote size={18} className={styles.quoteIcon} />
                </div>
                <div className={styles.ratingRow}>
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={14} fill="#569FDF" color="#569FDF" />
                  ))}
                  <span className={styles.verifiedBadge}>
                    <CheckCircle2 size={12} /> {item.date || "Verified Care"}
                  </span>
                </div>
              </div>

              <div className={styles.pathwayTagRow}>
                <span className={styles.pathwayTag}>{item.tag || item.category}</span>
              </div>

              <blockquote className={styles.quoteText}>
                &ldquo;{item.quote}&rdquo;
              </blockquote>

              <div className={styles.cardFooter}>
                <div className={styles.patientMeta}>
                  <div className={styles.patientAvatar}>
                    {item.patientName.charAt(0)}
                  </div>
                  <div className={styles.patientDetails}>
                    <h3 className={styles.patientName}>{item.patientName}</h3>
                    <span className={styles.patientCondition}>
                      {item.condition} · {item.location}
                    </span>
                  </div>
                </div>

                {item.fullStoryTimeline && (
                  <button
                    className={styles.readStoryBtn}
                    onClick={() => setSelectedStory(item)}
                  >
                    <span>Full Journey</span>
                    <ArrowRight size={13} />
                  </button>
                )}
              </div>
            </article>
          ))}
        </ScrollReveal>

        {/* Minimalist Trust & Metrics Footer */}
        <ScrollReveal variant="fade-up" delay={250}>
          <div className={styles.trustBanner}>
            <div className={styles.trustItem}>
              <div className={styles.trustIconCircle}><ShieldCheck size={18} /></div>
              <div>
                <strong>4.9 / 5.0 Rating</strong>
                <span>Patient Satisfaction Score</span>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div>
                <strong>35+ Years</strong>
                <span>Oncology Clinical Excellence</span>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div>
                <strong>10,000+</strong>
                <span>Patients &amp; Families Guided</span>
              </div>
            </div>
            <div className={styles.trustDivider} />
            <div className={styles.trustItem}>
              <div>
                <strong>Marengo Asia</strong>
                <span>Sector 56, Gurugram</span>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Expanded Story Timeline Modal */}
        {selectedStory && (
          <div className={styles.modalBackdrop} onClick={() => setSelectedStory(null)}>
            <div
              className={styles.modalContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.modalCloseBtn}
                onClick={() => setSelectedStory(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>

              <div className={styles.modalHeader}>
                <div className={styles.modalAvatarRow}>
                  <div className={styles.modalAvatar}>
                    {selectedStory.patientName.charAt(0)}
                  </div>
                  <div>
                    <h3 className={styles.modalTitle}>{selectedStory.patientName}</h3>
                    <span className={styles.modalSubtitle}>
                      {selectedStory.condition} &bull; {selectedStory.location}
                    </span>
                  </div>
                </div>

                {selectedStory.outcomeBadge && (
                  <div className={styles.modalOutcomeBadge}>
                    <Award size={14} />
                    <span>{selectedStory.outcomeBadge}</span>
                  </div>
                )}
              </div>

              {selectedStory.treatmentDuration && (
                <div className={styles.modalMetaBar}>
                  <div className={styles.modalMetaItem}>
                    <Clock size={14} />
                    <span>Protocol: <strong>{selectedStory.treatmentDuration}</strong></span>
                  </div>
                  <div className={styles.modalMetaItem}>
                    <CheckCircle2 size={14} />
                    <span>Status: <strong>{selectedStory.date}</strong></span>
                  </div>
                </div>
              )}

              {/* Care Highlights */}
              {selectedStory.careHighlights && (
                <div className={styles.modalHighlights}>
                  <h4 className={styles.modalSectionHeading}>Key Clinical Highlights</h4>
                  <ul className={styles.highlightsList}>
                    {selectedStory.careHighlights.map((h, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className={styles.checkIcon} />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Timeline Steps */}
              {selectedStory.fullStoryTimeline && (
                <div className={styles.modalTimeline}>
                  <h4 className={styles.modalSectionHeading}>Patient Journey Timeline</h4>
                  <div className={styles.timelineList}>
                    {selectedStory.fullStoryTimeline.map((step, index) => (
                      <div key={index} className={styles.timelineItem}>
                        <div className={styles.timelineNode}>
                          <span>{index + 1}</span>
                        </div>
                        <div className={styles.timelineBody}>
                          <h5>{step.title}</h5>
                          <p>{step.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className={styles.modalFooter}>
                <a
                  href="/#contact"
                  className={styles.modalCtaBtn}
                  onClick={() => setSelectedStory(null)}
                >
                  <span>Discuss Your Pathway with Dr. Dhar</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
