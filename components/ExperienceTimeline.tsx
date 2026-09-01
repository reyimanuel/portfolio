import { experiences } from "@/data/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function ExperienceTimeline() {
  return (
    <section
      id="experience"
      className="py-24 md:py-32"
      aria-labelledby="experience-title"
    >
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="02"
          label="EXPERIENCE"
          title="Engineering Timeline"
        />

        <div className="mt-16 flex flex-col">
          {experiences.map((exp, index) => (
            <article
              key={`${exp.organization}-${exp.role}-${index}`}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-12 py-10 border-b border-border-subtle last:border-0"
            >
              {/* Left column (sticky on desktop) */}
              <div className="md:sticky md:top-24 self-start">
                <div className="font-mono text-sm text-accent font-medium">
                  {exp.period}
                </div>
                <div className="text-sm text-fg-muted mt-1">
                  {exp.organization}
                </div>
              </div>

              {/* Right column */}
              <div>
                <h3 className="text-xl font-semibold text-fg-primary">
                  {exp.role}
                </h3>
                <p className="text-fg-secondary mt-2 leading-relaxed">
                  {exp.description}
                </p>

                {/* Responsibilities */}
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {exp.responsibilities.map((resp, respIdx) => (
                      <li key={respIdx} className="flex gap-3 items-start">
                        <span
                          className="text-fg-muted font-mono text-xs mt-1.5 shrink-0 select-none"
                          aria-hidden="true"
                        >
                          —
                        </span>
                        <span className="text-sm text-fg-secondary">
                          {resp}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Tech tags */}
                {exp.technologies && exp.technologies.length > 0 && (
                  <div
                    className="mt-5 flex flex-wrap gap-2"
                    aria-label={`Technologies used at ${exp.organization}`}
                  >
                    {exp.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs text-fg-tertiary bg-bg-tertiary px-2 py-1 rounded-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
