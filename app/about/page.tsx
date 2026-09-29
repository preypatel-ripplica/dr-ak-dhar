import type { Metadata } from "next";
import AboutPage from "@/components/AboutPage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Meet Dr. (Brig.) A. K. Dhar — Clinical Director and Head of Medical Oncology at Marengo Asia Hospitals, Gurugram, with over 35 years of experience in cancer care.",
};

export default function About() {
  return <AboutPage />;
}
