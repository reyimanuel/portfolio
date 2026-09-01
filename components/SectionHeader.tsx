export interface SectionHeaderProps {
  number: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
}

export function SectionHeader({
  number,
  label,
  title,
  description,
  className = "",
}: SectionHeaderProps) {
  const formattedNumber = number.endsWith(".") ? number : `${number}.`;

  return (
    <div
      className={`w-full border-t border-border-primary pt-8 md:pt-10 text-left ${className}`}
    >
      {/* Monospace section indicator */}
      <div className="flex items-center gap-2 font-mono text-sm text-accent tracking-wider uppercase">
        <span>{formattedNumber}</span>
        <span>{label}</span>
      </div>

      {/* Section title */}
      <h2 className="mt-3 text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-fg-primary">
        {title}
      </h2>

      {/* Optional description */}
      {description && (
        <p className="mt-4 text-lg text-fg-secondary max-w-2xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
