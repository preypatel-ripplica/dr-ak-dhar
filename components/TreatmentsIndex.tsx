"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { treatments as defaultTreatments, type Treatment } from "@/data/treatments";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AppointmentSection from "./AppointmentSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./TreatmentPage.module.css";
import { useI18n } from "./I18nProvider";

export default function TreatmentsIndex({ items }: { items?: Treatment[] }) {
  const { t, localizeHref } = useI18n();
  useScrollReveal();
  const list = items && items.length > 0 ? items : defaultTreatments;

  return (
    <>
      <SiteHeader active="treatments" />
      <main id="main" tabIndex={-1}>
        <section className={styles.indexHero} aria-labelledby="treatments-title">
          <div className={`${styles.container} reveal`}>
            <span className={styles.kicker}>{t("TREATMENTS")}</span>
            <h1 id="treatments-title">
              {t("Cancer care pathways,")}
              <br />
              <em>{t("explained with clarity.")}</em>
            </h1>
            <p>
              {t("Explore how Dr. (Brig.) A. K. Dhar approaches common cancers and modern systemic therapies — from first reports to ongoing support at Marengo Asia Hospitals, Gurugram.")}
            </p>
          </div>
        </section>

        <section className={styles.container} aria-label={t("All treatments")}>
          <div className={styles.indexGrid}>
            {list.map((item, index) => (
              <Link
                key={item.slug}
                href={localizeHref(`/treatments/${item.slug}`)}
                className={`${styles.indexCard} reveal reveal-delay-${(index % 3) + 1}`}
              >
                <div className={styles.indexCardMedia}>
                  <Image src={item.image} alt={t(item.imageAlt)} fill sizes="(max-width: 900px) 100vw, 360px" />
                </div>
                <div className={styles.indexCardBody}>
                  <span>{t(item.readTime.toUpperCase())}</span>
                  <h2>{t(item.shortTitle)}</h2>
                  <p>{t(item.cardText)}</p>
                  <strong>
                    {t("Explore care")} <ArrowUpRight size={15} />
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

