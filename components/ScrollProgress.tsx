"use client";

import { useScrollProgress } from "@/hooks/useScrollReveal";

/**
 * Thin progress bar at the top of the page showing scroll position.
 */
export function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 z-50 h-[2px] bg-accent transition-none"
      style={{ width: `${progress * 100}%` }}
      role="progressbar"
      aria-valuenow={Math.round(progress * 100)}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label="Page scroll progress"
    />
  );
}
