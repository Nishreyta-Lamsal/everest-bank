import type { ProductInterestSegment } from '../../../_data/dashboard-product-interest';

type ProductInterestLegendProps = {
  segments: ProductInterestSegment[];
};

export default function ProductInterestLegend({
  segments,
}: ProductInterestLegendProps) {
  return (
    <div className="flex w-[120px] flex-col gap-3">
      {segments.map((segment) => (
        <div
          key={segment.label}
          className="flex w-full items-center justify-between"
        >
          <div className="flex items-center gap-1">
            <span
              className="size-2 shrink-0 rounded-full"
              style={{ backgroundColor: segment.color }}
            />
            <p className="text-paragraph-mini text-[rgba(0,0,0,0.7)]">
              {segment.label}
            </p>
          </div>
          <p className="text-paragraph-mini text-[rgba(0,0,0,0.9)]">
            {segment.percentage}%
          </p>
        </div>
      ))}
    </div>
  );
}
