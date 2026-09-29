"use client";

import { useState } from "react";
import { ArrowUpRight, Calendar, CheckCircle2, Clock, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import styles from "./HomeContactSection.module.css";
import { DOCTOR_INFO, TREATMENTS } from "@/lib/data";
import ScrollReveal from "./ScrollReveal";

export default function HomeContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    treatment: "Breast cancer",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className={styles.section} id="contact" aria-labelledby="home-contact-title">
      <div className="container">
        <ScrollReveal variant="fade-up">
          <div className={styles.sectionHeader}>
            <span className={styles.kicker}>
              <Phone size={15} /> CLINIC CONSULTATION &amp; CONTACT
            </span>
            <h2 id="home-contact-title" className={styles.title}>
              Book a Consultation with Dr. A. K. Dhar
            </h2>
            <p className={styles.subtitle}>
              Reach out directly to schedule your appointment or receive guidance from our medical oncology care team at Marengo Asia Hospitals.
            </p>
          </div>
        </ScrollReveal>

        <div className={styles.grid}>
          {/* Clinic Information Details */}
          <ScrollReveal variant="slide-right" delay={100} className={styles.infoCol}>
            <div className={styles.infoCard}>
              <h3>Clinic &amp; Hospital Location</h3>
              <p className={styles.leadText}>
                Clinical Director &amp; Head of Medical Oncology at Marengo Asia Hospitals.
              </p>

              <div className={styles.contactDetails}>
                <div className={styles.detailRow}>
                  <MapPin className={styles.detailIcon} size={20} />
                  <div>
                    <strong>Hospital Location</strong>
                    <p>Marengo Asia Hospitals, Sector 56, Gurugram, Haryana &amp; Delhi NCR</p>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <Phone className={styles.detailIcon} size={20} />
                  <div>
                    <strong>Direct Appointment Phone</strong>
                    <a href={`tel:${DOCTOR_INFO.phone}`}>{DOCTOR_INFO.phone}</a>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <Mail className={styles.detailIcon} size={20} />
                  <div>
                    <strong>Email Inquiries</strong>
                    <a href={`mailto:${DOCTOR_INFO.email}`}>{DOCTOR_INFO.email}</a>
                  </div>
                </div>

                <div className={styles.detailRow}>
                  <Clock className={styles.detailIcon} size={20} />
                  <div>
                    <strong>Consultation Hours</strong>
                    <p>{DOCTOR_INFO.consultationHours}</p>
                  </div>
                </div>
              </div>

              <div className={styles.mapAction}>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=Marengo+Asia+Hospitals+Sector+56+Gurugram"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.mapBtn}
                >
                  Get Directions on Google Maps <ArrowUpRight size={16} />
                </a>
              </div>
            </div>

            <div className={styles.experienceBadge}>
              <ShieldCheck size={24} className={styles.badgeIcon} />
              <div>
                <strong>35+ Years of Clinical Practice</strong>
                <span>Specialised care for solid tumours &amp; blood cancers</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Contact Us Form */}
          <ScrollReveal variant="slide-left" delay={200} className={styles.formCol}>
            <div className={styles.formCard}>
              {!submitted ? (
                <>
                  <div className={styles.formHead}>
                    <h3>Send a Consultation Request</h3>
                    <p>Fill in your contact information below. Our clinic coordinator will reach out promptly to confirm your visit time.</p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="home-name">Full Name *</label>
                      <input
                        type="text"
                        id="home-name"
                        required
                        placeholder="e.g. Sunita Sharma"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label htmlFor="home-phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="home-phone"
                          required
                          placeholder="+91 98108 18266"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="home-email">Email Address</label>
                        <input
                          type="email"
                          id="home-email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="home-treatment">Care Pathway / Specialty</label>
                      <select
                        id="home-treatment"
                        value={formData.treatment}
                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      >
                        {TREATMENTS.map((t) => (
                          <option key={t.slug} value={t.title}>
                            {t.title} ({t.category})
                          </option>
                        ))}
                        <option value="Second Opinion Review">Second Opinion Review</option>
                        <option value="General Oncology Consultation">General Oncology Consultation</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="home-message">Message / Test Reports Summary</label>
                      <textarea
                        id="home-message"
                        rows={4}
                        placeholder="Provide any context or test reports available..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Request Consultation Appointment <Send size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successState}>
                  <CheckCircle2 size={54} className={styles.successCheck} />
                  <h3>Request Received Successfully</h3>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our care team will contact you at <strong>{formData.phone}</strong> shortly to finalize your consultation at Marengo Asia Hospitals.
                  </p>
                  <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                    Submit Another Request
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
