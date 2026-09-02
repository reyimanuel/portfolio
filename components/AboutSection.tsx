import Image from "next/image";
import { profile } from "@/data/portfolio";
import { SectionHeader } from "@/components/SectionHeader";

export function AboutSection() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader number="01" label="ABOUT" title="A Bit More" />

        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[2fr_1fr] md:gap-16">
          {/* Left column */}
          <div>
            <p className="text-lg leading-relaxed text-fg-secondary whitespace-pre-wrap">
              {profile.bio}
            </p>
            <p className="mt-4 leading-relaxed text-fg-secondary">
              Currently based in {profile.location}. I build clean, maintainable software that scales from APIs and databases to full-stack applications. I enjoy solving complex problems with thoughtful design and code others can learn from.
            </p>
          </div>

          {/* Right column — Photo */}
          <div className="flex items-start justify-center md:justify-end">
            <div className="relative w-full max-w-70">
              {/* Decorative offset border */}
              <div className="absolute -right-2 -bottom-2 h-full w-full rounded-lg border border-accent/20" aria-hidden="true" />

              {/* Photo container */}
              <div className="relative overflow-hidden rounded-lg border border-border-primary bg-linear-to-b from-accent-muted to-bg-secondary">
                <Image
                  src="/about.png"
                  alt={profile.name}
                  width={280}
                  height={350}
                  className="relative z-10 h-auto w-full object-cover object-top"
                  priority={false}
                />
              </div>

              {/* Caption */}
              <p className="mt-4 font-mono text-xs text-fg-muted text-right">
                {profile.location}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
