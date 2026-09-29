"use client";

import { useState } from "react";
import { ArrowUpRight, Calendar, CheckCircle2, Clock, Mail, MapPin, Phone, Send, ShieldCheck } from "lucide-react";
import styles from "./contact.module.css";
import { DOCTOR_INFO, TREATMENTS } from "@/lib/data";
import FAQAccordion from "@/components/FAQAccordion";
import ScrollReveal from "@/components/ScrollReveal";

export default function ContactPage() {
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
    <>
      <section className={styles.heroSection}>
        <ScrollReveal variant="fade-up" className={`container ${styles.heroContent}`}>
          <span className={styles.kicker}>
            <Phone size={15} /> CLINIC CONSULTATION &amp; APPOINTMENTS
          </span>
          <h1 className={styles.title}>Book a Consultation</h1>
          <p className={styles.subtitle}>
            Connect with Dr. (Brig.) A. K. Dhar’s oncology team at Marengo Asia Hospitals, Sector 56, Gurugram.
          </p>
        </ScrollReveal>
      </section>

      <section className={styles.mainSection}>
        <div className={`container ${styles.grid}`}>
          {/* Clinic Details Sidebar */}
          <ScrollReveal variant="slide-right" delay={100} className={styles.detailsCol}>
            <div className={styles.infoCard}>
              <h2>Clinic Information</h2>
              <p className={styles.infoLead}>
                Dr. (Brig.) A. K. Dhar consults as Clinical Director &amp; Head of Medical Oncology at Marengo Asia Hospitals.
              </p>

              <div className={styles.contactRows}>
                <div className={styles.row}>
                  <MapPin className={styles.icon} size={20} />
                  <div>
                    <strong>Hospital Location</strong>
                    <p>Marengo Asia Hospitals, Sector 56, Gurugram, Haryana &amp; Delhi NCR</p>
                  </div>
                </div>

                <div className={styles.row}>
                  <Phone className={styles.icon} size={20} />
                  <div>
                    <strong>Direct Appointment Helpline</strong>
                    <a href={`tel:${DOCTOR_INFO.phone}`}>{DOCTOR_INFO.phone}</a>
                  </div>
                </div>

                <div className={styles.row}>
                  <Mail className={styles.icon} size={20} />
                  <div>
                    <strong>Email Inquiries</strong>
                    <a href={`mailto:${DOCTOR_INFO.email}`}>{DOCTOR_INFO.email}</a>
                  </div>
                </div>

                <div className={styles.row}>
                  <Clock className={styles.icon} size={20} />
                  <div>
                    <strong>Consultation Hours</strong>
                    <p>{DOCTOR_INFO.consultationHours}</p>
                  </div>
                </div>
              </div>

              <div className={styles.mapPrompt}>
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

            <div className={styles.reassuranceCard}>
              <ShieldCheck size={24} className={styles.shieldIcon} />
              <div>
                <strong>35+ Years Clinical Oncology Experience</strong>
                <p>Bringing clarity and structured care to every diagnostic review and treatment plan.</p>
              </div>
            </div>
          </ScrollReveal>

          {/* Form Card */}
          <ScrollReveal variant="slide-left" delay={180} className={styles.formCol}>
            <div className={styles.formCard}>
              {!submitted ? (
                <>
                  <div className={styles.formHeader}>
                    <h2>Request an Appointment</h2>
                    <p>Fill out the form below and our clinic team will contact you to confirm your consultation schedule.</p>
                  </div>

                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.fieldGroup}>
                      <label htmlFor="name">Full Name *</label>
                      <input
                        type="text"
                        id="name"
                        required
                        placeholder="e.g. Rajesh Kumar"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </div>

                    <div className={styles.formRow}>
                      <div className={styles.fieldGroup}>
                        <label htmlFor="phone">Phone Number *</label>
                        <input
                          type="tel"
                          id="phone"
                          required
                          placeholder="+91 98765 43210"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>

                      <div className={styles.fieldGroup}>
                        <label htmlFor="email">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          placeholder="name@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="treatment">Primary Area of Concern / Treatment</label>
                      <select
                        id="treatment"
                        value={formData.treatment}
                        onChange={(e) => setFormData({ ...formData, treatment: e.target.value })}
                      >
                        {TREATMENTS.map((t) => (
                          <option key={t.slug} value={t.title}>
                            {t.title} ({t.category})
                          </option>
                        ))}
                        <option value="Second Opinion">Second Opinion Review</option>
                        <option value="General Consultation">General Cancer Consultation</option>
                      </select>
                    </div>

                    <div className={styles.fieldGroup}>
                      <label htmlFor="message">Message / Details about current reports</label>
                      <textarea
                        id="message"
                        rows={4}
                        placeholder="Mention any reports available (e.g., biopsy done, PET scan completed)..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                      Submit Appointment Request <Send size={16} />
                    </button>
                  </form>
                </>
              ) : (
                <div className={styles.successBox}>
                  <CheckCircle2 size={54} className={styles.successIcon} />
                  <h2>Appointment Request Submitted</h2>
                  <p>
                    Thank you, <strong>{formData.name}</strong>. Our clinic care coordinator will call you at <strong>{formData.phone}</strong> shortly to confirm your visit time with Dr. (Brig.) A. K. Dhar.
                  </p>
                  <button className={styles.resetBtn} onClick={() => setSubmitted(false)}>
                    Submit Another Inquiry
                  </button>
                </div>
              )}
            </div>
          </ScrollReveal>
        </div>
      </section>

      <FAQAccordion />
    </>
  );
}
