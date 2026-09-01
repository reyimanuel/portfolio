import { projects } from "@/data/portfolio";

export function FeaturedProject() {
  const featured = projects.find((p) => p.featured);
  if (!featured) return null;

  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        {/* Header */}
        <p className="mb-8 font-mono text-xs uppercase tracking-wider text-fg-muted">
          CASE STUDY
        </p>
        <h2 className="mb-4 text-2xl font-semibold text-fg-primary md:text-3xl">
          {featured.title}
        </h2>
        <p className="mb-12 font-mono text-sm text-accent">
          {featured.category}
        </p>

        {/* Two-column case study */}
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 md:gap-16">
          {/* Left column */}
          <div>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                PROBLEM
              </h3>
              <p className="leading-relaxed text-fg-secondary">
                {featured.problem}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                APPROACH
              </h3>
              <p className="leading-relaxed text-fg-secondary">
                {featured.approach}
              </p>
            </div>

            <div className="mt-10">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                CONTRIBUTION
              </h3>
              <p className="leading-relaxed text-fg-secondary">
                {featured.contribution}
              </p>
            </div>
          </div>

          {/* Right column */}
          <div>
            <div>
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                IMPLEMENTATION
              </h3>
              <p className="leading-relaxed text-fg-secondary">
                {featured.implementation}
              </p>
            </div>

            {/* Architecture diagram */}
            <div className="mt-10">
              <h3 className="mb-4 font-mono text-xs uppercase tracking-wider text-fg-muted">
                SYSTEM ARCHITECTURE
              </h3>
              <div className="rounded-lg border border-border-primary bg-bg-secondary p-6">
                <div className="flex flex-col items-center gap-0">
                  {[
                    "Frontend",
                    "API Gateway",
                    "Application Layer",
                    "Database",
                    "External Services",
                  ].map((layer, i, arr) => (
                    <div key={layer} className="flex flex-col items-center">
                      <div className="rounded border border-border-primary bg-bg-primary px-6 py-2.5 text-center font-mono text-xs text-fg-secondary">
                        {layer}
                      </div>
                      {i < arr.length - 1 && (
                        <div className="flex flex-col items-center">
                          <div className="h-4 w-px bg-border-primary" />
                          <svg
                            className="h-2 w-2 text-fg-muted"
                            fill="currentColor"
                            viewBox="0 0 8 8"
                            aria-hidden="true"
                          >
                            <path d="M4 6L1 2h6L4 6z" />
                          </svg>
                          <div className="h-2 w-px bg-border-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Outcome */}
            <div className="mt-10">
              <h3 className="mb-3 font-mono text-xs uppercase tracking-wider text-fg-muted">
                OUTCOME
              </h3>
              <p className="leading-relaxed text-fg-secondary">
                {featured.outcome}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
