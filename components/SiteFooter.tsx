"use client";

import { ArrowUpRight, MessageCircle } from "lucide-react";
import styles from "./HomeSections.module.css";

const footerTreatments = [
  ["Breast cancer", "breast-cancer"],
  ["Blood cancer", "blood-cancer"],
  ["Lung cancer", "lung-cancer"],
  ["Head & neck cancer", "head-neck-cancer"],
  ["Immunotherapy", "immunotherapy"],
  ["Targeted therapy", "targeted-therapy"],
];

function LinkedInIcon({ size = 16 }: { size?: number; strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" fill="currentColor">
      <path d="M6.94 8.5H3.5V20h3.44V8.5zM5.22 3C4.05 3 3.1 3.96 3.1 5.14c0 1.17.94 2.13 2.12 2.13h.02c1.18 0 2.12-.96 2.12-2.13C7.34 3.96 6.4 3 5.22 3zM20.5 13.28c0-3.53-1.89-5.18-4.4-5.18-2.03 0-2.94 1.12-3.44 1.9V8.5H9.22c.05 1.05 0 11.5 0 11.5h3.44v-6.42c0-.34.02-.68.13-.92.27-.68.9-1.39 1.95-1.39 1.37 0 1.92 1.05 1.92 2.58V20H20.5v-6.72z" />
    </svg>
  );
}

const socialLinks = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/dr-brig-anil-kumar-dhar-1272b5361",
    Icon: LinkedInIcon,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/919810818266",
    Icon: MessageCircle,
  },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.container} ${styles.footerGrid}`}>
        <div className={`${styles.footerBrandBlock} reveal`}>
          <span className={styles.footerBrand}>
            Dr. A. K. <strong>Dhar.</strong>
          </span>
          <p>Medical oncology care with clarity, experience and empathy at Marengo Asia Hospitals, Gurugram.</p>
          <div className={styles.footerSocial} aria-label="Social media">
            {socialLinks.map(({ label, href, Icon }) => (
              <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}>
                <Icon size={16} strokeWidth={1.7} />
              </a>
            ))}
          </div>
          <div className={styles.footerAddress}>
            <span>Address</span>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram"
              target="_blank"
              rel="noreferrer"
            >
              Marengo Asia Hospitals, Gurugram
              <ArrowUpRight size={13} />
            </a>
            <a href="mailto:info@canceronco.in">info@canceronco.in</a>
            <a href="tel:+919810818266">+91 98108 18266</a>
          </div>
        </div>
        <div className="reveal reveal-delay-1">
          <span>Treatments</span>
          {footerTreatments.map(([label, slug]) => (
            <a key={slug} href={`/treatments/${slug}`}>
              {label}
            </a>
          ))}
        </div>
        <div className="reveal reveal-delay-2">
          <span>Explore</span>
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/treatments">All treatments</a>
          <a href="/blogs">Blogs</a>
          <a href="/contact">Contact</a>
        </div>
        <div className="reveal reveal-delay-3">
          <span>Patient support</span>
          <a href="/about">Meet Dr. Dhar</a>
          <a href="/contact">Book appointment</a>
          <a href="https://wa.me/919810818266" target="_blank" rel="noreferrer">
            WhatsApp the clinic
          </a>
          <a href="tel:+919810818266">Call the desk</a>
        </div>
      </div>
      <div className={`${styles.container} ${styles.footerBottom}`}>
        <span>© {new Date().getFullYear()} Dr. A. K. Dhar</span>
        <span>Medical oncology · Gurugram & Delhi NCR</span>
      </div>
    </footer>
  );
}
