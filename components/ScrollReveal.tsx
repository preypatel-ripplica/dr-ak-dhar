"use client";

import React, { useEffect, useRef, useState } from "react";
import styles from "./ScrollReveal.module.css";

interface ScrollRevealProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: "fade-up" | "fade-in" | "slide-right" | "slide-left" | "scale-up";
  delay?: number; // in ms
  duration?: number; // in ms
  staggerChildren?: boolean;
  staggerDelay?: number; // in ms per child
  className?: string;
  threshold?: number;
  once?: boolean;
  style?: React.CSSProperties;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 900,
  staggerChildren = false,
  staggerDelay = 120,
  className = "",
  threshold = 0.08,
  once = true,
  style = {},
  ...restProps
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setIsRevealed(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          if (once) {
            observer.unobserve(entry.target);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      {
        threshold,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    observer.observe(node);

    return () => {
      if (node) observer.unobserve(node);
    };
  }, [threshold, once]);

  const variantClass = styles[variant] || styles["fade-up"];
  const revealedClass = isRevealed ? styles.revealed : "";
  const staggerClass = staggerChildren ? styles.staggerContainer : "";

  return (
    <div
      ref={ref}
      className={`${styles.revealBase} ${variantClass} ${revealedClass} ${staggerClass} ${className}`.trim()}
      style={{
        transitionDelay: `${delay}ms`,
        transitionDuration: `${duration}ms`,
        ["--stagger-delay" as string]: `${staggerDelay}ms`,
        ...style,
      }}
      {...restProps}
    >
      {children}
    </div>
  );
}
