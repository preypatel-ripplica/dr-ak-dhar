import HomeHero from "@/components/HomeHero";
import MovingRibbon from "@/components/MovingRibbon";
import AboutSectionHome from "@/components/AboutSectionHome";
import TreatmentInteractive from "@/components/TreatmentInteractive";
import NumericalStrip from "@/components/NumericalStrip";
import CareSelector from "@/components/CareSelector";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQAccordion from "@/components/FAQAccordion";
import HomeContactSection from "@/components/HomeContactSection";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <MovingRibbon variant="dark" />
      <AboutSectionHome />
      <MovingRibbon
        variant="accent"
        items={[
          "EVIDENCE-BASED CARE",
          "INDIVIDUALIZED CANCER PROTOCOLS",
          "MULTIDISCIPLINARY ONCOLOGY",
          "COMPASSIONATE GUIDANCE",
          "PERSONALIZED CHEMOTHERAPY & IMMUNOTHERAPY",
          "TRUSTED ONCOLOGIST GURUGRAM & DELHI NCR"
        ]}
      />
      <TreatmentInteractive />
      <NumericalStrip />
      <CareSelector />
      <TestimonialsSection />
      <FAQAccordion />
      <HomeContactSection />
    </>
  );
}
