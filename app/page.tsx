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

export default function Home() {
  return (
    <>
      <Hero />

      {/* Tech marquee divider */}
      <TechMarquee />

      <AboutSection />
      <CommunitySection />

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <ExperienceTimeline />
      <EngineeringApproach />

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <ProjectsSection />
      {/* <FeaturedProject /> */}

      {/* Thin divider */}
      <div className="mx-auto max-w-6xl px-6">
        <hr className="border-border-subtle" />
      </div>

      <TechStackSection />
      <MetricsSection />
      <ContactSection />
    </>
  );
}
