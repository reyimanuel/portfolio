import { skills } from '@/data/portfolio';
import { SkillGroup } from '@/components/SkillGroup';
import { SectionHeader } from '@/components/SectionHeader';

export function TechStackSection() {
  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <SectionHeader
          number="06"
          label="STACK"
          title="Technologies"
          description="Tools and technologies I work with regularly."
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-12">
          {skills.map((group) => (
            <SkillGroup key={group.category} group={group} />
          ))}
        </div>
      </div>
    </section>
  );
}
