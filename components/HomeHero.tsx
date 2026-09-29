"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, ClipboardList, HeartHandshake, MapPin, Ribbon, ShieldCheck } from "lucide-react";
import styles from "./HomeHero.module.css";
import HomeSections from "./HomeSections";
import SiteHeader from "./SiteHeader";
import { useScrollReveal } from "@/hooks/useScrollReveal";

const appointmentUrl = "/contact";

export default function HomeHero() {
  useScrollReveal();

  return (
    <>
      <SiteHeader active="home" />

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal-left`}>
              <p className={styles.eyebrow}>
                <span />
                EXPERIENCE WITH EMPATHY
              </p>
              <h1 id="hero-title">
                Expert cancer care.
                <br />
                <em>A reassuring hand.</em>
              </h1>
              <p className={styles.introduction}>
                Expertise you can trust. Time to listen.
                <br />
                Dr. (Brig.) A. K. Dhar helps you understand your options and take the next step with confidence.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={appointmentUrl}>
                  Book an appointment <ArrowUpRight size={19} strokeWidth={1.7} />
                </a>
                <a className={styles.doctorLink} href="/about">
                  Meet your doctor{" "}
                  <span>
                    <ArrowRight size={19} strokeWidth={1.4} />
                  </span>
                </a>
              </div>
              <div className={styles.credentials}>
                <ShieldCheck size={27} strokeWidth={1.35} />
                <div>
                  <strong>35+ years of clinical experience</strong>
                  <span>
                    Clinical Director & Head — Medical Oncology
                    <br />
                    Marengo Asia Hospitals, Gurugram
                  </span>
                </div>
              </div>
            </div>

            <div className={`${styles.portraitStage} reveal-right`}>
              <div className={styles.portraitArch} aria-hidden="true" />
              <div className={styles.portraitOrbit} aria-hidden="true" />
              <span className={styles.portraitWord} aria-hidden="true">
                care.
              </span>
              <Image
                className={styles.portrait}
                src="/images/dr-ak-dhar-original.jpg"
                alt="Dr. (Brig.) A. K. Dhar, Medical Oncologist"
                width={1270}
                height={1600}
                priority
                sizes="(max-width: 600px) 95vw, (max-width: 1000px) 65vw, 560px"
              />
              <div className={styles.portraitNote}>
                <HeartHandshake size={28} strokeWidth={1.3} />
                <span>
                  Personalised care.
                  <br />
                  <strong>A person-first approach.</strong>
                </span>
              </div>
              <div className={styles.portraitCaption}>
                <span>Dr. (Brig.) A. K. Dhar</span>
                <p>
                  MBBS, MD <span>·</span> Medical Oncology
                </p>
              </div>
            </div>
          </div>
        </section>

        <nav className={`${styles.container} ${styles.quickLinks}`} aria-label="Consultation quick links">
          <a className="reveal reveal-delay-1" href="/treatments">
            <Ribbon size={26} strokeWidth={1.35} />
            <span>
              <small>UNDERSTAND YOUR OPTIONS</small>Explore cancer care
            </span>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </span>
          </a>
          <a className="reveal reveal-delay-2" href={appointmentUrl}>
            <ClipboardList size={26} strokeWidth={1.35} />
            <span>
              <small>LET’S TAKE THE NEXT STEP</small>Plan your consultation
            </span>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </span>
          </a>
          <a
            className="reveal reveal-delay-3"
            href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={26} strokeWidth={1.35} />
            <span>
              <small>MARENGO ASIA HOSPITALS</small>Find us in Gurugram
            </span>
            <span className={styles.quickArrow}>
              <ArrowUpRight size={18} strokeWidth={1.4} />
            </span>
          </a>
        </nav>
        <HomeSections />
      </main>
    </>
  );
}
