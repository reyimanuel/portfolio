"use client";

import { useState, useEffect } from "react";
import { navLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ThemeToggle";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isMenuOpen) {
        setIsMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isMenuOpen]);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-primary/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Developer mark */}
        <a
          href="#"
          className="font-mono text-sm font-medium tracking-tight text-fg-primary transition-colors duration-200 hover:text-accent flex items-center gap-1.5"
          aria-label={`${profile.name} - Back to top`}
        >
          <span className="text-accent">&gt;</span>
          <span>{profile.name}</span>
        </a>

        {/* Desktop Navigation */}
        <div className="hidden md:flex md:items-center md:gap-8">
          <nav className="flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-fg-secondary transition-colors duration-200 hover:text-fg-primary"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <ThemeToggle />
        </div>

        {/* Mobile Controls */}
        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setIsMenuOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-border-primary bg-bg-secondary text-fg-secondary transition-colors duration-200 hover:bg-bg-tertiary hover:text-fg-primary"
            aria-label="Open navigation menu"
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
          >
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={1.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Full-screen Mobile Overlay */}
      {isMenuOpen && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-50 flex flex-col bg-bg-primary md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Mobile Overlay Header */}
          <div className="flex h-16 items-center justify-between border-b border-border-subtle px-6">
            <a
              href="#"
              onClick={() => setIsMenuOpen(false)}
              className="font-mono text-sm font-medium tracking-tight text-fg-primary flex items-center gap-1.5"
              aria-label={`${profile.name} - Back to top`}
            >
              <span className="text-accent">&gt;</span>
              <span>{profile.name}</span>
            </a>
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <button
                type="button"
                onClick={() => setIsMenuOpen(false)}
                className="flex h-8 w-8 items-center justify-center rounded-md border border-border-primary bg-bg-secondary text-fg-secondary transition-colors duration-200 hover:bg-bg-tertiary hover:text-fg-primary"
                aria-label="Close navigation menu"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Links */}
          <nav
            className="flex flex-1 flex-col justify-center px-8 space-y-6"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link, index) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMenuOpen(false)}
                className="group flex items-baseline gap-4 border-b border-border-subtle py-3 text-2xl font-medium tracking-tight text-fg-primary transition-colors duration-200 hover:text-accent"
              >
                <span className="font-mono text-xs text-accent uppercase tracking-wider">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
