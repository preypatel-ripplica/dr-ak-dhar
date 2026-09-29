import Link from "next/link";
import { ArrowUpRight, Calendar, Phone } from "lucide-react";
import styles from "./ContactCTA.module.css";
import { DOCTOR_INFO } from "@/lib/data";

export default function ContactCTA() {
  return (
    <section className={styles.section} aria-label="Book consultation call to action">
      <div className="container">
        <div className={styles.card}>
          <div className={styles.content}>
            <span className={styles.kicker}>READY WHEN YOU ARE</span>
            <h2 className={styles.title}>Let&apos;s take the next step together.</h2>
            <p className={styles.subtitle}>
              Schedule a personalized consultation with Dr. (Brig.) A. K. Dhar or speak with the oncology clinic team.
            </p>
            <div className={styles.metaRow}>
              <span><Calendar size={16} /> Mon - Sat: 9:00 AM - 5:00 PM</span>
              <span><Phone size={16} /> {DOCTOR_INFO.phone}</span>
            </div>
          </div>

          <div className={styles.actions}>
            <Link href="/contact" className={styles.primaryBtn}>
              Book Consultation <ArrowUpRight size={18} />
            </Link>
            <a href={`tel:${DOCTOR_INFO.phone}`} className={styles.phoneBtn}>
              <Phone size={16} /> Call Clinic Team
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
