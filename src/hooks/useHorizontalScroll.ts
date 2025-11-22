"use client";

import { type RefObject, useEffect, useRef } from "react";

const LERP_FACTOR = 0.07; // este valor relentiaza la parada
const STOP_THRESHOLD = 0.1;

export function useHorizontalScroll(ref: RefObject<HTMLElement | null>) {
  const targetScroll = useRef(0);
  const currentScroll = useRef(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    targetScroll.current = element.scrollLeft;
    currentScroll.current = element.scrollLeft;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaX !== 0) return;
      e.preventDefault();

      const maxScroll = element.scrollWidth - element.clientWidth;
      targetScroll.current += e.deltaY;
      targetScroll.current = Math.max(0, Math.min(targetScroll.current, maxScroll));

      if (rafId.current === null) {
        startAnimationLoop();
      }
    };

    const startAnimationLoop = () => {
      const animate = () => {
        const diff = targetScroll.current - currentScroll.current;

        if (Math.abs(diff) < STOP_THRESHOLD) {
          currentScroll.current = targetScroll.current;
          element.scrollLeft = currentScroll.current;
          if (rafId.current) cancelAnimationFrame(rafId.current);
          rafId.current = null;
          return;
        }

        currentScroll.current += diff * LERP_FACTOR;
        element.scrollLeft = currentScroll.current;
        rafId.current = requestAnimationFrame(animate);
      };
      rafId.current = requestAnimationFrame(animate);
    };

    element.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      element.removeEventListener("wheel", handleWheel);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [ref]);
}