import { Hero } from "@/components/Hero";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceTimeline } from "@/components/ExperienceTimeline";
import { EngineeringApproach } from "@/components/EngineeringApproach";
import { TechStackSection } from "@/components/TechStackSection";
import { MetricsSection } from "@/components/MetricsSection";
import { CommunitySection } from "@/components/CommunitySection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { TechMarquee } from "@/components/TechMarquee";
import { ScrollReveal } from "@/components/ScrollReveal";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Tech marquee divider */}
      <TechMarquee />

      <ScrollReveal>
        <AboutSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <CommunitySection />
      </ScrollReveal>

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <ScrollReveal>
        <ExperienceTimeline />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <EngineeringApproach />
      </ScrollReveal>

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <ScrollReveal>
        <ProjectsSection />
      </ScrollReveal>

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <ScrollReveal>
        <TechStackSection />
      </ScrollReveal>

      <ScrollReveal delay={100}>
        <MetricsSection />
      </ScrollReveal>

      <ContactSection />
    </>
  );
}
