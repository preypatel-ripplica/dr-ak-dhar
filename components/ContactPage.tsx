"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
} from "lucide-react";
import SiteHeader from "./SiteHeader";
import SiteFooter from "./SiteFooter";
import AppointmentSection, { scrollToId } from "./AppointmentSection";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import styles from "./ContactPage.module.css";

const phone = "+91 98108 18266";
const phoneHref = "tel:+919810818266";
const whatsappHref = "https://wa.me/919810818266";
const email = "info@canceronco.in";
const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram";

export default function ContactPage() {
  useScrollReveal();

  return (
    <>
      <SiteHeader active="contact" />

      <main id="main" tabIndex={-1}>
        <section className={styles.hero} aria-labelledby="contact-hero-title">
          <div className={`${styles.container} ${styles.heroGrid}`}>
            <div className={`${styles.heroCopy} reveal-left`}>
              <p className={styles.eyebrow}>
                <span />
                CONTACT &amp; APPOINTMENTS
              </p>
              <h1 id="contact-hero-title">
                Let&apos;s plan
                <br />
                <em>your visit.</em>
              </h1>
              <p className={styles.lead}>
                Reach the appointment desk at Marengo Asia Hospitals, Gurugram — or send a short request and the team
                will confirm timing with you.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.primaryButton} href={phoneHref}>
                  <Phone size={17} strokeWidth={1.8} />
                  Call {phone}
                </a>
                <a className={styles.whatsappButton} href={whatsappHref} target="_blank" rel="noreferrer">
                  <MessageCircle size={17} strokeWidth={1.8} />
                  Chat on WhatsApp
                </a>
              </div>
              <a
                className={styles.formJump}
                href="#appointment"
                onClick={(event) => scrollToId("appointment", event)}
              >
                Or send an appointment request
                <ArrowUpRight size={15} />
              </a>
            </div>

            <aside className={`${styles.heroCard} reveal-right`}>
              <span>CLINIC DESK</span>
              <a href={phoneHref}>{phone}</a>
              <p>For appointments, reports, and visit planning with Dr. (Brig.) A. K. Dhar.</p>
              <ul>
                <li>
                  <Clock3 size={16} strokeWidth={1.7} />
                  By appointment
                </li>
                <li>
                  <MapPin size={16} strokeWidth={1.7} />
                  Gurugram &amp; Delhi NCR
                </li>
              </ul>
            </aside>
          </div>
        </section>

        <section className={styles.location} aria-labelledby="location-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} reveal`}>
              <span className={styles.kicker}>WHERE TO MEET</span>
              <h2 id="location-title">
                Find the clinic
                <br />
                <em>in Gurugram.</em>
              </h2>
              <p>Appointments are confirmed in advance. Use the map for directions before your visit.</p>
            </div>

            <article className={`${styles.locationCard} reveal`}>
              <div className={styles.locationCopy}>
                <span className={styles.locationCity}>Gurugram</span>
                <h3>Marengo Asia Hospitals</h3>
                <p>
                  Golf Course Ext Rd, Sushant Lok II, Sector 56, Gurugram, Ghata, Haryana 122011
                </p>

                <div className={styles.locationMeta}>
                  <div>
                    <small>Timings</small>
                    <strong>By appointment</strong>
                  </div>
                  <div>
                    <small>Doctor</small>
                    <strong>Dr. (Brig.) A. K. Dhar</strong>
                  </div>
                </div>

                <div className={styles.locationActions}>
                  <a href={mapUrl} target="_blank" rel="noreferrer">
                    Open in Google Maps
                    <ArrowUpRight size={15} />
                  </a>
                  <a href={phoneHref}>
                    Call the desk
                    <Phone size={15} strokeWidth={1.8} />
                  </a>
                </div>
              </div>

              <a className={styles.mapPanel} href={mapUrl} target="_blank" rel="noreferrer" aria-label="Open Marengo Asia Hospitals in Google Maps">
                <Image
                  src="/images/marengo-asia-hospitals.jpg"
                  alt="Marengo Asia Hospitals, Gurugram"
                  fill
                  sizes="(max-width: 900px) 100vw, 520px"
                  className={styles.mapImage}
                />
                <span className={styles.mapCaption}>
                  <MapPin size={14} strokeWidth={1.8} />
                  Sector 56 · Gurugram
                </span>
              </a>
            </article>
          </div>
        </section>

        <section className={styles.reach} aria-labelledby="reach-title">
          <div className={styles.container}>
            <div className={`${styles.sectionHead} reveal`}>
              <span className={styles.kicker}>QUICK REACH</span>
              <h2 id="reach-title">
                Prefer to talk
                <br />
                <em>directly?</em>
              </h2>
            </div>

            <div className={styles.reachGrid}>
              <a className={`${styles.reachCard} reveal reveal-delay-1`} href={phoneHref}>
                <span className={styles.reachIcon}>
                  <Phone size={20} strokeWidth={1.6} />
                </span>
                <small>Call</small>
                <strong>{phone}</strong>
                <p>Speak with the appointment desk</p>
              </a>
              <a
                className={`${styles.reachCard} reveal reveal-delay-2`}
                href={whatsappHref}
                target="_blank"
                rel="noreferrer"
              >
                <span className={styles.reachIcon}>
                  <MessageCircle size={20} strokeWidth={1.6} />
                </span>
                <small>WhatsApp</small>
                <strong>Message the clinic</strong>
                <p>Quick questions and scheduling help</p>
              </a>
              <a className={`${styles.reachCard} reveal reveal-delay-3`} href={`mailto:${email}`}>
                <span className={styles.reachIcon}>
                  <Mail size={20} strokeWidth={1.6} />
                </span>
                <small>Email</small>
                <strong>{email}</strong>
                <p>Share reports or written queries</p>
              </a>
            </div>
          </div>
        </section>

        <AppointmentSection />
      </main>

      <SiteFooter />
    </>
  );
}
