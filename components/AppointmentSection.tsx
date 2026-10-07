"use client";

import { useState, type FormEvent, type MouseEvent } from "react";
import { ArrowUpRight, MessageCircle, Phone } from "lucide-react";
import styles from "./HomeSections.module.css";
import { useI18n } from "./I18nProvider";

export default function AppointmentSection() {
  const { t } = useI18n();
  const [appointment, setAppointment] = useState({
    email: "",
    name: "",
    phone: "",
    details: "",
  });

  const submitAppointment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(`Appointment request — ${appointment.name || "Patient"}`);
    const body = encodeURIComponent(
      [
        `Name: ${appointment.name}`,
        `Email: ${appointment.email}`,
        `Phone: ${appointment.phone}`,
        "",
        appointment.details || "No additional details provided.",
      ].join("\n"),
    );
    window.location.href = `mailto:info@canceronco.in?subject=${subject}&body=${body}`;
  };

  return (
    <section id="appointment" className={styles.appointmentSection} aria-labelledby="appointment-title">
      <div className={styles.container}>
        <div className={styles.appointmentGrid}>
          <div className={`${styles.appointmentCopy} reveal-left`}>
            <span className={styles.sectionKicker}>{t("LET'S TAKE THE NEXT STEP")}</span>
            <h2 id="appointment-title">
              {t("Your care deserves")}
              <br />
              <em>{t("a conversation.")}</em>
            </h2>
            <p>
              {t("Share a few details and the clinic team will help arrange a consultation with Dr. Dhar. Prefer to talk now? Reach the appointment desk directly.")}
            </p>

            <div className={styles.appointmentReach}>
              <span>{t("Reach us directly")}</span>
              <a href="tel:+919810818266" className={styles.appointmentReachLink}>
                <span className={styles.appointmentReachIcon}>
                  <Phone size={18} strokeWidth={1.7} />
                </span>
                <span>
                  <small>{t("Call")}</small>
                  <strong>+91 98108 18266</strong>
                </span>
                <ArrowUpRight size={16} />
              </a>
              <a
                href="https://wa.me/919810818266"
                target="_blank"
                rel="noreferrer"
                className={styles.appointmentReachLink}
              >
                <span className={styles.appointmentReachIcon}>
                  <MessageCircle size={18} strokeWidth={1.7} />
                </span>
                <span>
                  <small>WhatsApp</small>
                  <strong>{t("Message the clinic")}</strong>
                </span>
                <ArrowUpRight size={16} />
              </a>
            </div>

            <div className={styles.appointmentClinic}>
              <span>{t("Clinic")}</span>
              <strong>Marengo Asia Hospitals</strong>
              <small>Gurugram, Haryana</small>
              <a
                className={styles.appointmentDirections}
                href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram"
                target="_blank"
                rel="noreferrer"
              >
                {t("Get directions")}
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <form className={`${styles.appointmentForm} reveal-right`} onSubmit={submitAppointment}>
            <span className={styles.sectionKicker}>{t("WE'RE HERE TO HELP")}</span>
            <h3>{t("Request an appointment")}</h3>
            <p>{t("Tell us a little about yourself to get started.")}</p>

            <label>
              {t("Email address")}
              <input
                type="email"
                required
                placeholder="you@example.com"
                value={appointment.email}
                onChange={(event) => setAppointment({ ...appointment, email: event.target.value })}
              />
            </label>

            <label>
              {t("Your name")}
              <input
                type="text"
                required
                placeholder={t("Full name")}
                value={appointment.name}
                onChange={(event) => setAppointment({ ...appointment, name: event.target.value })}
              />
            </label>

            <label>
              {t("Phone number")}
              <input
                type="tel"
                required
                placeholder={t("Your mobile number")}
                value={appointment.phone}
                onChange={(event) => setAppointment({ ...appointment, phone: event.target.value })}
              />
            </label>

            <label>
              {t("Additional details")} <small>{t("optional")}</small>
              <textarea
                rows={3}
                placeholder={t("Share your concern, reports ready, or preferred timing")}
                value={appointment.details}
                onChange={(event) => setAppointment({ ...appointment, details: event.target.value })}
              />
            </label>

            <button type="submit" className={styles.appointmentSubmit}>
              {t("Send appointment request")}
              <ArrowUpRight size={17} />
            </button>

            <p className={styles.appointmentNote}>
              {t("By sending this form, you agree to be contacted about your request. The team will confirm availability and timing.")}
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

export function scrollToId(id: string, event?: MouseEvent<HTMLAnchorElement>) {
  event?.preventDefault();
  const target = document.getElementById(id);
  if (!target) return;
  target.scrollIntoView({ behavior: "smooth", block: "start" });
  if (typeof window !== "undefined") {
    window.history.replaceState(null, "", `#${id}`);
  }
}
