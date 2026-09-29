"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2, ChevronRight, Ribbon, Shield, Sparkles } from "lucide-react";
import styles from "./TreatmentInteractive.module.css";
import { TREATMENTS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function TreatmentInteractive() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const activeTreatment = TREATMENTS[selectedIndex];

  return (
    <section className={styles.section} id="treatments" aria-labelledby="treatments-title">
      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className={styles.headerRow}>
            <div>
              <span className={styles.kicker}>
                <Ribbon size={16} /> SPECIALISED ONCOLOGY PATHWAYS
              </span>
              <h2 id="treatments-title" className={styles.title}>
                Evidence-based care designed around you.
              </h2>
            </div>
            <Link href="/treatments" className={styles.headerLink}>
              View all 6 care pathways <ArrowUpRight size={18} />
            </Link>
          </div>
        </ScrollReveal>

        <div className={styles.interactiveGrid}>
          {/* Selector Navigation Cards */}
          <ScrollReveal variant="fade-up" delay={100} className={styles.tabsCol} role="tablist" aria-label="Cancer treatment categories">
            {TREATMENTS.map((t, idx) => {
              const isSelected = selectedIndex === idx;
              return (
                <button
                  key={t.slug}
                  role="tab"
                  aria-selected={isSelected}
                  aria-controls={`treatment-panel-${t.slug}`}
                  id={`treatment-tab-${t.slug}`}
                  className={`${styles.tabBtn} ${isSelected ? styles.tabBtnActive : ""}`}
                  onClick={() => setSelectedIndex(idx)}
                >
                  <span className={styles.tabNum}>0{idx + 1}</span>
                  <div className={styles.tabInfo}>
                    <span className={styles.tabTitle}>{t.title}</span>
                    <span className={styles.tabCategory}>{t.category}</span>
                  </div>
                  <ChevronRight size={18} className={styles.tabChevron} />
                </button>
              );
            })}
          </ScrollReveal>

          {/* Detailed Content Panel */}
          <ScrollReveal variant="fade-in" delay={200} className={styles.detailPanel}>
            <div
              id={`treatment-panel-${activeTreatment.slug}`}
              role="tabpanel"
              aria-labelledby={`treatment-tab-${activeTreatment.slug}`}
            >
              <div className={styles.panelBadge}>
                <Sparkles size={14} /> <span>PATHWAY 0{selectedIndex + 1} · {activeTreatment.category}</span>
              </div>

              <h3 className={styles.panelTitle}>{activeTreatment.title}</h3>
              <p className={styles.panelSubtitle}>{activeTreatment.subtitle}</p>

              <div className={styles.overviewBox}>
                <p>{activeTreatment.overview}</p>
              </div>

              <div className={styles.approachesSection}>
                <h4><Shield size={16} /> Key Clinical Approaches</h4>
                <ul className={styles.approachesList}>
                  {activeTreatment.keyApproaches.map((item, i) => (
                    <li key={i}>
                      <CheckCircle2 size={16} className={styles.checkIcon} />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={styles.panelFooter}>
                <Link href={`/${activeTreatment.slug}`} className={styles.exploreBtn}>
                  Explore full {activeTreatment.title} pathway <ArrowRight size={18} />
                </Link>
                <Link href="/contact" className={styles.consultBtn}>
                  Schedule consultation <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
