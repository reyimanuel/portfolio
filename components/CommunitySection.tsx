import { community } from "@/data/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function CommunitySection() {
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          number="02"
          label="BEYOND CODE"
          title="Organization & Volunteer"
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {community.map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-border-primary p-6"
            >
              <div className="mb-3 font-mono text-xs uppercase tracking-wider text-accent">
                {item.category}
              </div>
              <h3 className="mb-2 text-base font-medium text-fg-primary">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-fg-secondary">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
