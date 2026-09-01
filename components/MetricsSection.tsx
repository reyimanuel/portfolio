import { metrics } from '@/data/portfolio';
import { MetricCard } from '@/components/MetricCard';

export function MetricsSection() {
  return (
    <section aria-label="Key Metrics" className="py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="border-y border-border-primary py-12 md:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} metric={metric} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
