import Link from "next/link";
import { ArrowUpRight, Mail, MapPin, Phone, Ribbon, ShieldCheck } from "lucide-react";
import styles from "./Footer.module.css";
import { DOCTOR_INFO, TREATMENTS } from "@/lib/data";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <Link href="/" className={styles.brand}>
            <span className={styles.brandName}>
              <i>Dr.</i> A. K. <strong>Dhar.</strong>
            </span>
            <span className={styles.brandSpecialty}>MEDICAL ONCOLOGIST</span>
          </Link>
          <p className={styles.brandBio}>
            Medical oncology care with clarity, experience, and empathy. Dedicated to personalized cancer care pathways and evidence-based treatment plans.
          </p>
          <div className={styles.credentialsBadge}>
            <ShieldCheck size={18} />
            <span>35+ Years Clinical Oncology Experience</span>
          </div>
        </div>

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>CARE PATHWAYS</span>
          <ul className={styles.linkList}>
            {TREATMENTS.map((t) => (
              <li key={t.slug}>
                <Link href={`/${t.slug}`}>
                  <Ribbon size={13} /> {t.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className={styles.linkCol}>
          <span className={styles.colTitle}>NAVIGATION</span>
          <ul className={styles.linkList}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/about">About Dr. Dhar</Link></li>
            <li><Link href="/treatments">All Treatments</Link></li>
            <li><Link href="/blogs">Cancer Insights &amp; Blogs</Link></li>
            <li><Link href="/contact">Book Consultation</Link></li>
          </ul>
        </div>

        <div className={styles.contactCol}>
          <span className={styles.colTitle}>CLINIC &amp; CONTACT</span>
          <div className={styles.contactInfo}>
            <div className={styles.contactRow}>
              <MapPin size={18} className={styles.icon} />
              <div>
                <strong>Marengo Asia Hospitals</strong>
                <p>Sector 56, Gurugram, Haryana &amp; Delhi NCR</p>
              </div>
            </div>
            <div className={styles.contactRow}>
              <Phone size={18} className={styles.icon} />
              <div>
                <strong>Direct Phone</strong>
                <a href={`tel:${DOCTOR_INFO.phone}`}>{DOCTOR_INFO.phone}</a>
              </div>
            </div>
            <div className={styles.contactRow}>
              <Mail size={18} className={styles.icon} />
              <div>
                <strong>Email Inquiries</strong>
                <a href={`mailto:${DOCTOR_INFO.email}`}>{DOCTOR_INFO.email}</a>
              </div>
            </div>
          </div>
          <Link href="/contact" className={styles.footerCTA}>
            Book Appointment <ArrowUpRight size={16} />
          </Link>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={`container ${styles.bottomInner}`}>
          <span>&copy; {new Date().getFullYear()} {DOCTOR_INFO.name}. All rights reserved.</span>
          <span>Medical Oncology &amp; Cancer Care · Gurugram &amp; Delhi NCR</span>
        </div>
      </div>
    </footer>
  );
}
