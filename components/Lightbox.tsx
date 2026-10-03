"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface LightboxProps {
  images: string[];
  alt: string;
  initialIndex?: number;
  onClose: () => void;
  triggerRect?: DOMRect | null;
  onIndexChange?: (index: number) => void;
}

/**
 * Accessible fullscreen image lightbox with keyboard navigation.
 * Uses createPortal to attach directly to document.body, completely preventing
 * parent CSS stacking context / transform containment clipping bugs.
 * Features FLIP animation (shared element transition) when opening/closing from a source rect.
 */
export function Lightbox({
  images,
  alt,
  initialIndex = 0,
  onClose,
  triggerRect,
  onIndexChange,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Standard viewport bounds for the expanded image
  const TARGET_TOP = "12.5vh";
  const TARGET_LEFT = "4vw";
  const TARGET_WIDTH = "92vw";
  const TARGET_HEIGHT = "75vh";

  // State to manage the FLIP transition style for the image wrapper
  const [style, setStyle] = useState<React.CSSProperties>(
    triggerRect
      ? {
          top: `${triggerRect.top}px`,
          left: `${triggerRect.left}px`,
          width: `${triggerRect.width}px`,
          height: `${triggerRect.height}px`,
          opacity: 1, // Keep fully opaque to simulate lifting from the page
        }
      : {
          top: TARGET_TOP,
          left: TARGET_LEFT,
          width: TARGET_WIDTH,
          height: TARGET_HEIGHT,
          opacity: 0,
          transform: "scale(0.95)",
        }
  );

  useEffect(() => {
    setMounted(true);
    // Double requestAnimationFrame ensures initial strict styles are painted BEFORE transitioning
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setIsOpen(true);
        if (triggerRect) {
          setStyle({
            top: TARGET_TOP,
            left: TARGET_LEFT,
            width: TARGET_WIDTH,
            height: TARGET_HEIGHT,
            opacity: 1,
            transform: "scale(1)", // Ensure final scale is 1
          });
        } else {
          setStyle({
            top: TARGET_TOP,
            left: TARGET_LEFT,
            width: TARGET_WIDTH,
            height: TARGET_HEIGHT,
            opacity: 1,
            transform: "scale(1)",
          });
        }
      });
    });
    return () => cancelAnimationFrame(timer);
  }, [triggerRect]);

  const handleClose = useCallback(() => {
    setIsOpen(false);
    if (triggerRect) {
      // Shrink seamlessly back into the exact DOM bounds of the card on the page
      setStyle({
        top: `${triggerRect.top}px`,
        left: `${triggerRect.left}px`,
        width: `${triggerRect.width}px`,
        height: `${triggerRect.height}px`,
        opacity: 1,
        transform: "scale(1)",
      });
    } else {
      // Fallback close animation
      setStyle((prev) => ({
        ...prev,
        opacity: 0,
        transform: "scale(0.95)",
      }));
    }
    // Match the 400ms duration
    setTimeout(() => {
      onClose();
    }, 400);
  }, [onClose, triggerRect]);

  const setIndex = useCallback(
    (idx: number) => {
      setCurrentIndex(idx);
      onIndexChange?.(idx);
    },
    [onIndexChange]
  );

  const goNext = useCallback(() => {
    setIndex((currentIndex + 1) % images.length);
  }, [currentIndex, images.length, setIndex]);

  const goPrev = useCallback(() => {
    setIndex((currentIndex - 1 + images.length) % images.length);
  }, [currentIndex, images.length, setIndex]);

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
      className="fixed inset-0 z-10000 pointer-events-none flex flex-col items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label="Image preview"
    >
      {/* Dark backdrop fading in smoothly */}
      <div
        className={`absolute inset-0 bg-black/90 backdrop-blur-md transition-opacity duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Top Header Controls */}
      <div
        className={`absolute top-4 inset-x-6 flex items-center justify-between z-20 pointer-events-none transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"
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

      {/* Main Image Container — Animated directly via inline styles for FLIP effect */}
      <div
        className="absolute z-10 flex items-center justify-center overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto"
        style={style}
        onClick={(e) => e.stopPropagation()} // don't close when clicking the image itself
      >
        <Image
          src={images[currentIndex]}
          alt={`${alt} — preview ${currentIndex + 1}`}
          fill
          className="rounded-lg object-contain drop-shadow-2xl select-none"
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
            className={`absolute left-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border-primary bg-bg-secondary/90 text-fg-secondary shadow-lg transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-bg-tertiary hover:text-fg-primary hover:scale-105 active:scale-95 pointer-events-auto ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4 pointer-events-none"
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
            className={`absolute right-4 top-1/2 -translate-y-1/2 flex h-11 w-11 items-center justify-center rounded-full border border-border-primary bg-bg-secondary/90 text-fg-secondary shadow-lg transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] hover:bg-bg-tertiary hover:text-fg-primary hover:scale-105 active:scale-95 pointer-events-auto ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
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
          className={`absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2.5 rounded-xl border border-border-primary bg-bg-secondary/85 p-2 shadow-xl backdrop-blur-md transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] pointer-events-auto ${
            isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {images.map((img, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
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
