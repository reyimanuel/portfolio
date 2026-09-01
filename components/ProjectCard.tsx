import type { Project } from "@/data/portfolio";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const number = String(index + 1).padStart(2, "0");

  return (
    <article className="group rounded-lg border border-border-primary transition-all duration-300 hover:border-fg-muted/20">
      {/* Header */}
      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between">
          <span className="font-mono text-5xl font-bold leading-none text-fg-muted/15 md:text-6xl">
            {number}
          </span>
          <span className="rounded-sm bg-accent-muted px-2.5 py-1 font-mono text-xs uppercase tracking-wider text-accent">
            {project.category}
          </span>
        </div>

        <h3 className="mt-6 text-xl font-semibold text-fg-primary transition-colors group-hover:text-accent md:text-2xl">
          {project.title}
        </h3>

        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-fg-secondary">
          {project.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-6 pb-6 md:px-8 md:pb-8">
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-bg-tertiary px-2 py-1 font-mono text-xs text-fg-tertiary"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="mt-6">
          <span className="inline-flex items-center gap-1 font-mono text-sm text-accent transition-colors hover:text-accent-hover">
            View Case Study
            <svg
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </span>
        </div>
      </div>
    </article>
  );
}
