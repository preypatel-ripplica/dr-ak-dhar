import type { Metadata } from "next";
import TreatmentsIndex from "@/components/TreatmentsIndex";

export const metadata: Metadata = {
  title: "Treatments",
  description:
    "Explore breast cancer, blood cancer, lung cancer, head & neck cancer, immunotherapy, and targeted therapy care with Dr. (Brig.) A. K. Dhar in Gurugram.",
};

export default function TreatmentsPage() {
  return <TreatmentsIndex />;
}
