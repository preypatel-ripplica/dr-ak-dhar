import styles from "./MovingRibbon.module.css";
import { Sparkles } from "lucide-react";

interface MovingRibbonProps {
  items?: string[];
  variant?: "dark" | "accent" | "cream";
}

const DEFAULT_ITEMS = [
  "EXPERT ONCOLOGY CARE",
  "35+ YEARS CLINICAL EXPERIENCE",
  "MARENGO ASIA HOSPITALS GURUGRAM",
  "BREAST CANCER PATHWAYS",
  "BLOOD CANCER & HAEMATOLOGY",
  "LUNG CANCER PRECISION MEDICINE",
  "IMMUNOTHERAPY & TARGETED AGENTS",
  "CLARITY & CONFIDENCE IN EVERY STEP"
];

export default function MovingRibbon({
  items = DEFAULT_ITEMS,
  variant = "dark"
}: MovingRibbonProps) {
  // Duplicate array 6 times to guarantee seamless infinite loop on ultra-wide screens
  const displayItems = [...items, ...items, ...items, ...items, ...items, ...items];

  return (
    <div className={`${styles.ribbonContainer} ${styles[variant]}`} aria-hidden="true">
      <div className={styles.track}>
        {displayItems.map((text, i) => (
          <span key={i} className={styles.item}>
            <Sparkles size={15} className={styles.sparkle} />
            <span>{text}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
