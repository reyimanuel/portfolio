import { projects } from "@/data/portfolio";
import { ProjectCard } from "@/components/ProjectCard";
import { SectionHeader } from "@/components/SectionHeader";

export function ProjectsSection() {
  return (
    <section id="projects" className="py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader
          number="05"
          label="PROJECTS"
          title="Selected Work"
          description="A selection of projects that reflect how I approach engineering problems."
        />

        <div className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
