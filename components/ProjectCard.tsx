"use client";

import { useState } from "react";
import Image from "next/image";
import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [activeImage, setActiveImage] = useState(0);
  const hasMultipleImages = project.images.length > 1;

  return (
    <article className="group overflow-hidden rounded-lg border border-border-primary transition-colors duration-300 hover:border-fg-muted/20">
      {/* Image showcase */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-bg-secondary">
        {project.images.length > 0 ? (
          <>
            {/* Active image */}
            <Image
              src={project.images[activeImage]}
              alt={`${project.title} — screenshot ${activeImage + 1}`}
              fill
              loading="eager"
              className="object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 768px) 100vw, 50vw"
            />

            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-linear-to-t from-bg-primary/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Thumbnail dots / selectors */}
            {hasMultipleImages && (
              <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
                {project.images.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-1.5 rounded-full transition-all duration-200 ${
                      i === activeImage
                        ? "w-6 bg-accent"
                        : "w-1.5 bg-fg-muted/40 hover:bg-fg-muted/70"
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
        <span className="rounded-sm bg-accent-muted px-2 py-0.5 font-mono text-xs uppercase tracking-wider text-accent">
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

      {/* Thumbnail strip (when multiple images) */}
      {hasMultipleImages && (
        <div className="flex gap-1 border-t border-border-subtle px-5 py-3 md:px-6">
          {project.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setActiveImage(i)}
              className={`relative aspect-16/10 flex-1 overflow-hidden rounded-sm transition-all duration-200 ${
                i === activeImage
                  ? "ring-1 ring-accent ring-offset-1 ring-offset-bg-primary"
                  : "opacity-50 hover:opacity-80"
              }`}
              aria-label={`View screenshot ${i + 1}`}
            >
              <Image
                src={img}
                alt={`${project.title} — thumbnail ${i + 1}`}
                fill
                className="object-cover"
                sizes="120px"
              />
            </button>
          ))}
        </div>
      )}
    </article>
  );
}
