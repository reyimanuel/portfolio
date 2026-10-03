"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { profile } from "@/data/portfolio";
import { SystemMapFallback } from "@/components/SystemMap";

// Dynamically load the 3D SystemMap on the client
const SystemMap = dynamic(
  () => import("@/components/SystemMap").then((mod) => mod.SystemMap),
  {
    ssr: false,
    loading: () => <SystemMapFallback />,
  }
);

export function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Trigger entrance animation immediately upon mounting
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  // Smooth staggered reveal helper
  const getRevealStyle = (delayMs: number) => ({
    opacity: mounted ? 1 : 0,
    transform: mounted ? "translateY(0)" : "translateY(22px)",
    transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, transform 750ms cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
  });

  return (
    <section id="hero" className="relative flex min-h-[90vh] items-center py-16 md:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between md:gap-10 lg:gap-14">
          {/* Left content (takes ~55% on desktop) */}
          <div className="flex-1">
            {/* Status indicator */}
            <div
              className="mb-8 flex items-center gap-2 font-mono text-xs text-fg-tertiary"
              style={getRevealStyle(0)}
            >
              <span
                className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow"
                aria-hidden="true"
              />
              <span>Available for opportunities</span>
            </div>

            {/* Eyebrow */}
            <p
              className="mb-4 font-mono text-sm uppercase tracking-[0.2em] text-accent"
              style={getRevealStyle(100)}
            >
              {profile.title}
            </p>

            {/* Main headline — display font */}
            <h1
              className="font-display text-4xl font-normal italic leading-[1.1] tracking-tight text-fg-primary text-balance sm:text-5xl md:text-6xl lg:text-7xl"
              style={getRevealStyle(200)}
            >
              {profile.subtitle}
            </h1>

            {/* Bio brief */}
            <p
              className="mt-6 max-w-xl text-base text-fg-secondary leading-relaxed sm:text-lg"
              style={getRevealStyle(300)}
            >
              {profile.bio}
            </p>

            {/* CTAs */}
            <div
              className="mt-8 flex flex-wrap items-center gap-4"
              style={getRevealStyle(400)}
            >
              <a
                href="#projects"
                className="rounded-md bg-accent px-5 py-2.5 text-sm font-medium text-bg-primary transition-all hover:bg-accent-hover hover:scale-[1.02]"
              >
                View Projects
              </a>
              <a
                href={profile.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-md border border-border-primary px-5 py-2.5 text-sm font-medium text-fg-secondary transition-all hover:bg-bg-secondary hover:text-fg-primary hover:border-fg-muted/40"
              >
                Download CV
              </a>
            </div>

            {/* Social links */}
            <div
              className="mt-6 flex items-center gap-4"
              style={getRevealStyle(500)}
            >
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="text-fg-muted transition-colors hover:text-fg-primary"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  />
                </svg>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="text-fg-muted transition-colors hover:text-fg-primary"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.69 1.69 0 1 0 0-3.38 1.69 1.69 0 0 0 0 3.38M7.86 18.5v-8.37H5.07v8.37z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right side — 3D Interactive System Map */}
          <div
            className="mt-10 w-full shrink-0 md:mt-0 md:w-[420px] lg:w-[460px] h-[360px] lg:h-[400px]"
            style={getRevealStyle(300)}
          >
            <SystemMap />
          </div>
        </div>
      </div>
    </section>
  );
}
