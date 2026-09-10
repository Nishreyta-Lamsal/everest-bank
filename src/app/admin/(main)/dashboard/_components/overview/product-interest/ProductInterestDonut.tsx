import type { ProductInterestSegment } from '../../../_data/dashboard-product-interest';

const SIZE = 130;
const STROKE_WIDTH = 18;
const RADIUS = (SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

type ProductInterestDonutProps = {
  segments: ProductInterestSegment[];
  centerValue: string;
  centerLabel: string;
};

export default function ProductInterestDonut({
  segments,
  centerValue,
  centerLabel,
}: ProductInterestDonutProps) {
  const segmentOffsets = segments.reduce<number[]>((offsets, segment, i) => {
    const previousOffset = offsets[i - 1] ?? 0;
    const previousPercentage = segments[i - 1]?.percentage ?? 0;
    offsets.push(previousOffset + previousPercentage);
    return offsets;
  }, []);

  return (
    <div className="relative size-[130px] shrink-0">
      <svg
        width={SIZE}
        height={SIZE}
        viewBox={`0 0 ${SIZE} ${SIZE}`}
        className="-rotate-90"
      >
        {segments.map((segment, i) => {
          const dash = (segment.percentage / 100) * CIRCUMFERENCE;
          const offset = (segmentOffsets[i] / 100) * CIRCUMFERENCE;

          return (
            <circle
              key={segment.label}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={segment.color}
              strokeWidth={STROKE_WIDTH}
              strokeDasharray={`${dash} ${CIRCUMFERENCE - dash}`}
              strokeDashoffset={-offset}
            />
          );
        })}
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-1">
        <p className="text-paragraph-sm-medium text-neutral-800">
          {centerValue}
        </p>
        <p className="text-paragraph-mini text-[rgba(15,23,42,0.6)]">
          {centerLabel}
        </p>
      </div>
    </div>
  );
}
