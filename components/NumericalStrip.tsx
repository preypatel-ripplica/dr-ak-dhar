"use client";

import styles from "./NumericalStrip.module.css";
import { STATS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function NumericalStrip() {
  return (
    <section className={styles.section} aria-label="Clinical metrics and statistics">
      <ScrollReveal variant="fade-up" staggerChildren staggerDelay={120} className={`container ${styles.grid}`}>
        {STATS.map((stat, i) => (
          <div key={i} className={styles.card}>
            <div className={styles.numberRow}>
              <span className={styles.number}>{stat.number}</span>
            </div>
            <h3 className={styles.label}>{stat.label}</h3>
            <p className={styles.description}>{stat.description}</p>
          </div>
        ))}
      </ScrollReveal>
    </section>
  );
}
