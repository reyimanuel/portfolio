import { principles } from "@/data/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function EngineeringApproach() {
  return (
    <section className="py-24 md:py-32" aria-labelledby="approach-title">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="04"
          label="APPROACH"
          title="How I Build"
          description="Principles that guide my engineering decisions."
        />

        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border-primary">
          {principles.map((principle, index) => (
            <article
              key={`${principle.title}-${index}`}
              className="bg-bg-primary p-6 md:p-8"
            >
              <h3 className="font-mono text-sm text-accent uppercase tracking-wider mb-3">
                {principle.title}
              </h3>
              <p className="text-sm text-fg-secondary leading-relaxed">
                {principle.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
