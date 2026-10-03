"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";
import { Lightbox } from "@/components/Lightbox";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const hasMultipleImages = project.images.length > 1;

  const showcaseRef = useRef<HTMLDivElement>(null);
  const [lightboxRect, setLightboxRect] = useState<DOMRect | null>(null);

  return (
    <>
      <article className="group overflow-hidden rounded-xl border border-border-primary bg-bg-primary transition-all duration-300 hover:border-fg-muted/30 hover:shadow-xl">
        {/* Image showcase — supports both portrait and landscape gracefully */}
        <div
          ref={showcaseRef}
          className={`relative aspect-16/10 w-full overflow-hidden bg-bg-secondary/70 flex items-center justify-center ${
            project.images.length > 0 ? "cursor-pointer" : ""
          }`}
          onClick={() => {
            if (project.images.length > 0) {
              if (showcaseRef.current) {
                setLightboxRect(showcaseRef.current.getBoundingClientRect());
              }
              setLightboxIndex(activeImage);
              setLightboxOpen(true);
            }
          }}
        >
          {project.images.length > 0 ? (
            <>
              {/* Ambient soft glow background from image colors */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none select-none bg-bg-secondary">
                {project.images.map((img, idx) => (
                  <Image
                    key={`ambient-${img}`}
                    src={img}
                    alt=""
                    fill
                    className={`object-cover blur-2xl scale-125 transition-opacity duration-500 ${
                      idx === activeImage ? "opacity-20" : "opacity-0"
                    }`}
                    aria-hidden="true"
                  />
                ))}
              </div>

              {/* Foreground main images: preloaded in DOM, toggled via opacity */}
              {project.images.map((img, idx) => (
                <Image
                  key={`main-${img}`}
                  src={img}
                  alt={`${project.title} — screenshot ${idx + 1}`}
                  fill
                  priority={idx === 0} // Ensure the first image loads immediately
                  className={`relative z-10 object-contain p-2.5 sm:p-3 transition-all duration-500 drop-shadow-md group-hover:scale-[1.02] ${
                    idx === activeImage ? "opacity-100" : "opacity-0 pointer-events-none"
                  }`}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ))}

              {/* Subtle hover gradient */}
              <div className="absolute inset-0 z-20 bg-linear-to-t from-bg-primary/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" />

              {/* Expand to Lightbox icon overlay */}
              <div className="absolute top-3 right-3 z-30 flex h-8 w-8 items-center justify-center rounded-md border border-border-primary/80 bg-bg-primary/90 text-fg-secondary shadow-md opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.75}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9m11.25-5.25v4.5m0-4.5h-4.5m4.5 0L15 9m-11.25 11.25v-4.5m0 4.5h4.5m-4.5 0L9 15m11.25 5.25v-4.5m0 4.5h-4.5m4.5 0L15 15"
                  />
                </svg>
              </div>

              {/* Thumbnail dots */}
              {hasMultipleImages && (
                <div className="absolute bottom-3 left-1/2 z-30 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-bg-primary/80 px-2.5 py-1 backdrop-blur-sm">
                  {project.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveImage(i);
                      }}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        i === activeImage
                          ? "w-5 bg-accent"
                          : "w-1.5 bg-fg-muted/50 hover:bg-fg-muted"
                      }`}
                      aria-label={`View screenshot ${i + 1}`}
                    />
                  ))}
                </div>
              )}
            </>
          ) : (
            /* Placeholder when no images */
            <div className="flex h-full w-full items-center justify-center">
              <span className="font-mono text-xs text-fg-muted">
                No preview available
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 md:p-6">
          {/* Category */}
          <span className="rounded-sm bg-accent-muted px-2.5 py-0.5 font-mono text-xs uppercase tracking-wider text-accent font-medium">
            {project.category}
          </span>

          {/* Title */}
          <h3 className="mt-3 text-lg font-semibold text-fg-primary md:text-xl">
            {project.title}
          </h3>

          {/* Description */}
          <p className="mt-2 text-sm leading-relaxed text-fg-secondary line-clamp-3">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-sm bg-bg-tertiary px-2 py-0.5 font-mono text-xs text-fg-tertiary"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Thumbnail strip (when multiple images) — supports portrait & landscape */}
        {hasMultipleImages && (
          <div className="flex items-center gap-2 border-t border-border-subtle bg-bg-secondary/40 px-5 py-3 overflow-x-auto">
            {project.images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImage(i)}
                className={`relative h-12 w-14 shrink-0 overflow-hidden rounded-md border transition-all duration-200 bg-bg-tertiary/60 flex items-center justify-center ${
                  i === activeImage
                    ? "border-accent ring-2 ring-accent/40 opacity-100 scale-105"
                    : "border-border-primary opacity-60 hover:opacity-100"
                }`}
                aria-label={`View screenshot ${i + 1}`}
              >
                <Image
                  src={img}
                  alt={`${project.title} — thumbnail ${i + 1}`}
                  fill
                  className="object-contain p-1"
                  sizes="60px"
                />
              </button>
            ))}
          </div>
        )}
      </article>

      {/* Lightbox rendered via React Portal directly into document.body */}
      {lightboxOpen && (
        <Lightbox
          images={project.images}
          alt={project.title}
          initialIndex={lightboxIndex}
          triggerRect={lightboxRect}
          onIndexChange={setActiveImage}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
