import type { TrafficSource } from '../../../_data/dashboard-product-interest';

type TrafficSourceListProps = {
  items: TrafficSource[];
};

export default function TrafficSourceList({ items }: TrafficSourceListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-0.5">
      {items.map((source) => (
        <div
          key={source.id}
          className="flex w-full items-center justify-between py-1"
        >
          <p className="text-paragraph-mini text-[rgba(0,0,0,0.7)]">
            {source.label}
          </p>
          <div className="flex w-[172px] items-center gap-3">
            <span
              className="h-[8px] w-[129px] shrink-0 rounded-[6px]"
              style={{ backgroundColor: source.color }}
            />
            <p className="text-paragraph-mini text-[rgba(0,0,0,0.9)]">
              {source.percentageLabel}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
