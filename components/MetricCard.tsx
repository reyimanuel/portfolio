import { Metric } from '@/data/portfolio';

export interface MetricCardProps {
  metric: Metric;
}

export function MetricCard({ metric }: MetricCardProps) {
  return (
    <div className="text-left">
      <div className="font-mono text-4xl md:text-5xl font-bold text-fg-primary tracking-tight">
        {metric.value}
      </div>
      <p className="text-sm text-fg-tertiary mt-2">
        {metric.label}
      </p>
    </div>
  );
}
