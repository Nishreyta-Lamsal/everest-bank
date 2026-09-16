import { cn } from '@/lib/utils';

type StatTileProps = {
  label: string;
  value: string | number;
  hint?: string;
  className?: string;
};

/**
 * A handful of headline numbers reads better as tiles than as a bar chart of
 * four bars, so the top row is tiles rather than a chart.
 */
export default function StatTile({
  label,
  value,
  hint,
  className,
}: StatTileProps) {
  return (
    <div
      className={cn(
        'flex flex-1 flex-col gap-1 rounded-lg border border-black/5 bg-white px-4 py-3',
        className,
      )}
    >
      <p className="text-[12px] text-neutral-700/68">{label}</p>
      <p className="text-[28px] leading-none font-semibold text-neutral-900 tabular-nums">
        {value}
      </p>
      {hint && <p className="text-[12px] text-neutral-700/68">{hint}</p>}
    </div>
  );
}
