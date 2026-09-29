import type { Metadata } from "next";
import ContactPage from "@/components/ContactPage";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Dr. (Brig.) A. K. Dhar’s clinic at Marengo Asia Hospitals, Gurugram — call, WhatsApp, or request an appointment online.",
};

export default function Contact() {
  return <ContactPage />;
}
