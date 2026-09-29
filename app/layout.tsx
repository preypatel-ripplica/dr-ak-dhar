import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Dr. (Brig.) A. K. Dhar — Senior Medical Oncologist & Cancer Specialist",
    template: "%s | Dr. (Brig.) A. K. Dhar",
  },
  description: "Dr. (Brig.) A. K. Dhar is Clinical Director & Head of Medical Oncology at Marengo Asia Hospitals, Gurugram with 35+ years of experience in breast cancer, blood cancer, lung cancer, immunotherapy, and targeted cancer care.",
  keywords: ["Dr AK Dhar", "Medical Oncologist Gurugram", "Cancer Specialist Delhi NCR", "Marengo Asia Hospitals Oncology", "Breast Cancer Specialist", "Immunotherapy Specialist", "Blood Cancer Oncologist"],
  authors: [{ name: "Dr. (Brig.) A. K. Dhar" }],
  openGraph: {
    title: "Dr. (Brig.) A. K. Dhar — Senior Medical Oncologist",
    description: "Personalised cancer care pathways backed by 35+ years of clinical oncology experience at Marengo Asia Hospitals, Gurugram.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
