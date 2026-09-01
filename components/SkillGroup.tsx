import { SkillCategory } from '@/data/portfolio';

export interface SkillGroupProps {
  group: SkillCategory;
}

export function SkillGroup({ group }: SkillGroupProps) {
  return (
    <div className="space-y-3">
      <h3 className="font-mono text-xs text-fg-muted uppercase tracking-wider">
        {group.category}
      </h3>
      <div className="flex flex-wrap gap-2">
        {group.items.map((item) => (
          <span
            key={item}
            className="font-mono text-xs text-fg-secondary bg-bg-secondary border border-border-primary px-3 py-1.5 rounded-sm hover:text-accent hover:border-accent/30 transition-colors"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}
