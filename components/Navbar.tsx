"use client";

import { useState, useEffect } from "react";
import { navLinks, profile } from "@/data/portfolio";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useActiveSection } from "@/hooks/useScrollReveal";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const activeSection = useActiveSection(navLinks.map((l) => l.href));

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
    <>
      <header className="sticky top-0 z-40 w-full border-b border-border-subtle bg-bg-primary/95 backdrop-blur-md">
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
                  className={`relative text-sm transition-colors duration-200 hover:text-fg-primary ${
                    link.href === activeSection ? "text-accent" : "text-fg-secondary"
                  }`}
                >
                  {link.label}
                  {link.href === activeSection && (
                    <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-accent rounded-full" />
                  )}
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
            >
              <svg
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={1.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M3.75 17.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
}

// Separate component to handle its own conditional mounting and animation logic robustly
function MobileMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [mounted, setMounted] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setMounted(true);
      // Double requestAnimationFrame ensures the initial styles are applied before transitioning
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setShow(true);
        });
      });
    } else {
      setShow(false);
      // Allow CSS transitions to complete before unmounting from DOM
      const timer = setTimeout(() => setMounted(false), 400);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!mounted) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-bg-primary md:hidden transition-opacity duration-300 ease-out ${
        show ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      {/* Mobile Overlay Header - Exactly matches the main header layout to prevent "shrinking" visual bugs */}
      <div className="w-full border-b border-border-subtle">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <a
            href="#"
            onClick={onClose}
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
              onClick={onClose}
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Links - Scrollable layout starting from the top to prevent cutoffs */}
      <nav
        className="flex flex-1 flex-col overflow-y-auto px-8 pt-12 pb-24 space-y-6"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link, index) => {
          // Forward stagger on open, reverse stagger on close
          const delay = show
            ? index * 75 + 100 // Open: top to bottom, slight initial pause
            : (navLinks.length - 1 - index) * 50; // Close: bottom to top, fast

          return (
            <a
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={`group flex items-baseline gap-4 border-b border-border-subtle py-3 text-2xl font-medium tracking-tight text-fg-primary transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:text-accent ${
                show ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
              }`}
              style={{ transitionDelay: `${delay}ms` }}
            >
              <span className="font-mono text-xs text-accent uppercase tracking-wider">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <span>{link.label}</span>
            </a>
          );
        })}
      </nav>
    </div>
  );
}
