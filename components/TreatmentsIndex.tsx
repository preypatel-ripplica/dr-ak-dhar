"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { treatments } from "@/data/treatments";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AppointmentSection from "./AppointmentSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./TreatmentPage.module.css";

export default function TreatmentsIndex() {
  useScrollReveal();

  return (
    <>
      <SiteHeader active="treatments" />
      <main id="main" tabIndex={-1}>
        <section className={styles.indexHero} aria-labelledby="treatments-title">
          <div className={`${styles.container} reveal`}>
            <span className={styles.kicker}>TREATMENTS</span>
            <h1 id="treatments-title">
              Cancer care pathways,
              <br />
              <em>explained with clarity.</em>
            </h1>
            <p>
              Explore how Dr. (Brig.) A. K. Dhar approaches common cancers and modern systemic therapies —
              from first reports to ongoing support at Marengo Asia Hospitals, Gurugram.
            </p>
          </div>
        </section>

        <section className={styles.container} aria-label="All treatments">
          <div className={styles.indexGrid}>
            {treatments.map((item, index) => (
              <Link
                key={item.slug}
                href={`/treatments/${item.slug}`}
                className={`${styles.indexCard} reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className={styles.indexCardMedia}>
                  <Image src={item.image} alt={item.imageAlt} fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
                <div className={styles.indexCardBody}>
                  <span>{item.readTime.toUpperCase()}</span>
                  <h2>{item.shortTitle}</h2>
                  <p>{item.cardText}</p>
                  <strong>
                    Explore care <ArrowUpRight size={15} />
                  </strong>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <AppointmentSection />
        <SiteFooter />
      </main>
    </>
  );
}
