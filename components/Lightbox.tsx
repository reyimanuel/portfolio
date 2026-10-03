"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
}

/**
 * Accessible fullscreen image lightbox with keyboard navigation.
 * Uses createPortal to attach directly to document.body, completely preventing
 * parent CSS stacking context / transform containment clipping bugs.
 * Features smooth opening/closing transitions and image navigation.
 */
export function Lightbox({
  images,
  alt,
  initialIndex = 0,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Trigger smooth entrance animation on next frame
    const timer = requestAnimationFrame(() => {
      setIsOpen(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    // Allow closing animation to play before unmounting
    setTimeout(() => {
      onClose();
    }, 240);
  }, [onClose]);

  const goNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  }, [images.length]);

  const goPrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          handleClose();
          break;
        case "ArrowRight":
          goNext();
          break;
        case "ArrowLeft":
          goPrev();
          break;
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKey);
    };
  }, [handleClose, goNext, goPrev]);

  if (!mounted || typeof document === "undefined") {
    return null;
  }

  return createPortal(
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/85 backdrop-blur-md transition-opacity duration-240 ease-out select-none ${
        isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      onClick={handleClose}
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Top Header Controls */}
      <div
        className={`absolute top-4 inset-x-6 flex items-center justify-between z-10 pointer-events-none transition-all duration-250 ease-out ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
        }`}
      >
        {/* Counter */}
        {images.length > 1 ? (
          <div className="pointer-events-auto rounded-full border border-border-primary bg-bg-secondary/90 px-3.5 py-1 font-mono text-xs text-fg-secondary shadow-lg">
            {currentIndex + 1} / {images.length}
          </div>
        ) : (
          <div />
        )}

        {/* Close button */}
        <button
          onClick={handleClose}
          className="pointer-events-auto flex h-10 w-10 items-center justify-center rounded-full border border-border-primary bg-bg-secondary/90 text-fg-secondary shadow-lg transition-all duration-200 hover:bg-bg-tertiary hover:text-fg-primary hover:scale-105 active:scale-95"
          aria-label="Close preview"
        >
          <svg
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1.75}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      {/* Main image container: smooth scale + fade entrance and exit */}
      <div
        className={`relative mx-auto flex h-[75vh] w-[92vw] max-w-5xl items-center justify-center transition-all duration-300 ease-out ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${alt} — preview ${currentIndex + 1}`}
          fill
          className="rounded-lg object-contain drop-shadow-2xl select-none transition-opacity duration-200"
          sizes="(max-width: 1024px) 95vw, 1200px"
          priority
        />
      </div>

      {/* Navigation arrows (desktop & tablet) */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goPrev();
            }}
            className={`absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border-primary bg-bg-secondary/90 text-fg-secondary shadow-lg transition-all duration-250 ease-out hover:bg-bg-tertiary hover:text-fg-primary hover:scale-105 active:scale-95 ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 pointer-events-none"
            }`}
            aria-label="Previous image"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goNext();
            }}
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border-primary bg-bg-secondary/90 text-fg-secondary shadow-lg transition-all duration-250 ease-out hover:bg-bg-tertiary hover:text-fg-primary hover:scale-105 active:scale-95 ${
              isOpen
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-4 pointer-events-none"
            }`}
            aria-label="Next image"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        </>
      )}

      {/* Bottom Thumbnail Strip */}
      {images.length > 1 && (
        <div
          className={`absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2.5 rounded-xl border border-border-primary bg-bg-secondary/85 p-2 shadow-xl backdrop-blur-md transition-all duration-250 ease-out ${
            isOpen
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`relative h-12 w-14 overflow-hidden rounded-md border transition-all duration-200 ${
                i === currentIndex
                  ? "border-accent ring-2 ring-accent/40 opacity-100 scale-105"
                  : "border-border-primary opacity-50 hover:opacity-85"
              }`}
              aria-label={`View screenshot ${i + 1}`}
            >
              <Image
                src={img}
                alt=""
                fill
                className="object-cover"
                sizes="64px"
              />
            </button>
          ))}
        </div>
      )}
    </div>,
    document.body
  );
}
