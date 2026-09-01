import { profile } from "@/data/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader number="06" label="ABOUT" title="A Bit More" />

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left column */}
          <div>
            <p className="text-lg leading-relaxed text-fg-secondary">
              {profile.bio}
            </p>
            <p className="mt-4 leading-relaxed text-fg-secondary">
              Currently based in {profile.location}. Focused on building backend
              systems that are maintainable, well-documented, and designed to
              last.
            </p>
          </div>

          {/* Right column — "Currently" sidebar */}
          <div className="space-y-6 rounded-lg border border-border-primary p-6">
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-wider text-fg-muted">
                BUILDING
              </div>
              <div className="text-sm text-fg-primary">
                {profile.currentlyBuilding}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-wider text-fg-muted">
                LEARNING
              </div>
              <div className="text-sm text-fg-primary">
                {profile.currentlyLearning}
              </div>
            </div>
            <div>
              <div className="mb-1 font-mono text-xs uppercase tracking-wider text-fg-muted">
                INTERESTED IN
              </div>
              <div className="text-sm text-fg-primary">
                {profile.interestedIn}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
