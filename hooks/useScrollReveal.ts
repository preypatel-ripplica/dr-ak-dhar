"use client";

import { useEffect } from "react";

const REVEAL_SELECTOR = ".reveal, .reveal-left, .reveal-right, .reveal-scale";

function isElementInView(el: Element) {
  const rect = el.getBoundingClientRect();
  if (rect.width === 0 && rect.height === 0) return false;

  const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
  const bottomLimit = viewportHeight - 40;
  const visibleTop = Math.max(rect.top, 0);
  const visibleBottom = Math.min(rect.bottom, bottomLimit);
  const visibleHeight = visibleBottom - visibleTop;

  if (visibleHeight <= 0) return false;
  return visibleHeight / Math.max(rect.height, 1) >= 0.12 || rect.top < bottomLimit * 0.92;
}

export function useScrollReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR));
    if (!elements.length) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const pending = new Set(elements);

    const reveal = (el: HTMLElement) => {
      if (!pending.has(el)) return;
      el.classList.add("is-visible");
      pending.delete(el);
      observer?.unobserve(el);
    };

    const checkPending = () => {
      pending.forEach((el) => {
        if (isElementInView(el)) reveal(el);
      });
      if (pending.size === 0) detach();
    };

    let observer: IntersectionObserver | null = null;
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) reveal(entry.target as HTMLElement);
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
      );
      pending.forEach((el) => observer?.observe(el));
    }

    const onScrollOrResize = () => checkPending();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    let detached = false;
    const detach = () => {
      if (detached) return;
      detached = true;
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
      observer?.disconnect();
    };

    checkPending();
    const raf = window.requestAnimationFrame(checkPending);
    const timeout = window.setTimeout(checkPending, 100);

    return () => {
      window.cancelAnimationFrame(raf);
      window.clearTimeout(timeout);
      detach();
    };
  }, []);
}
