"use client";

import { useRef, useState, useCallback, useEffect } from "react";

// Technologies displayed in the marquee — easily editable
const TECH_ITEMS = [
  "Golang",
  "NestJS",
  "Laravel",
  "Node.js",
  "PostgreSQL",
  "MySQL",
  "Redis",
  "Docker",
  "REST API",
  "Next.js",
  "React",
  "TypeScript",
  "Git",
  "JWT",
  "OpenAPI",
  "Firebase",
  "WebSocket",
  "Linux",
  "CI/CD",
  "Tailwind CSS",
];

export function TechMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouseX, setMouseX] = useState<number | null>(null);
  const [isPaused, setIsPaused] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMouseX(e.clientX - rect.left);
    },
    []
  );

  const handleMouseEnter = useCallback(() => setIsPaused(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsPaused(false);
    setMouseX(null);
  }, []);

  // Prefers reduced motion
  const [reducedMotion, setReducedMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Duplicate items for seamless loop (3 copies)
  const allItems = [...TECH_ITEMS, ...TECH_ITEMS, ...TECH_ITEMS];

  return (
    <div
      className="mx-auto max-w-6xl px-6"
      aria-hidden="true"
    >
      <div
        ref={containerRef}
        className="relative overflow-hidden border-y border-border-primary py-4 select-none"
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <div
          className="flex w-max gap-0"
          style={{
            animation: reducedMotion
              ? "none"
              : `marquee-scroll 40s linear infinite`,
            animationPlayState: isPaused ? "paused" : "running",
          }}
        >
          {allItems.map((tech, i) => (
            <MarqueeItem
              key={`${tech}-${i}`}
              label={tech}
              index={i}
              mouseX={mouseX}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* Fade edges — wide gradients for smooth falloff */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/6 bg-linear-to-r from-bg-primary via-bg-primary/60 to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/6 bg-linear-to-l from-bg-primary via-bg-primary/60 to-transparent" />
      </div>

      <style jsx>{`
        @keyframes marquee-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-100% / 3));
          }
        }
      `}</style>
    </div>
  );
}

// --------------------------------------------------------------------------
// Individual marquee item with cursor proximity effect
// --------------------------------------------------------------------------

interface MarqueeItemProps {
  label: string;
  index: number;
  mouseX: number | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
}

function MarqueeItem({ label, mouseX }: MarqueeItemProps) {
  const itemRef = useRef<HTMLSpanElement>(null);
  const [proximity, setProximity] = useState(0); // 0 = far, 1 = closest

  useEffect(() => {
    if (mouseX === null || !itemRef.current) {
      setProximity(0);
      return;
    }

    const rect = itemRef.current.getBoundingClientRect();
    const parent = itemRef.current.closest("[class*='overflow-hidden']");
    if (!parent) return;

    const parentRect = parent.getBoundingClientRect();
    const itemCenter = rect.left + rect.width / 2 - parentRect.left;
    const distance = Math.abs(mouseX - itemCenter);
    const maxDistance = 120;
    const p = Math.max(0, 1 - distance / maxDistance);
    setProximity(p);
  }, [mouseX]);

  return (
    <span
      ref={itemRef}
      className="inline-flex items-center gap-4 whitespace-nowrap px-6 font-mono text-sm transition-all duration-150"
      style={{
        color: proximity > 0.3
          ? `color-mix(in srgb, var(--accent) ${Math.round(proximity * 100)}%, var(--fg-muted) ${Math.round((1 - proximity) * 100)}%)`
          : "var(--fg-muted)",
        transform: `scale(${1 + proximity * 0.15})`,
      }}
    >
      {label}
      <span className="text-border-primary">·</span>
    </span>
  );
}
