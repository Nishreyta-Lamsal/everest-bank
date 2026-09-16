'use client';

import { BAR_THICKNESS, VIZ, percent } from './viz';

import type { SummaryOption } from '@/types/admin';

type OptionBarChartProps = {
  options: SummaryOption[];
  /** Denominator for the share, so skipped answers are not counted as zero. */
  answered: number;
};

/**
 * Horizontal bars, one hue. The job is comparing magnitude between a field's
 * options, not telling series apart, so a single hue with the option name
 * beside each bar carries identity - no legend, no cycled colours.
 *
 * Horizontal rather than vertical because option labels are words
 * ("Sudurpashchim", "VISA Credit Card") which do not fit under a column.
 */
export default function OptionBarChart({
  options,
  answered,
}: OptionBarChartProps) {
  // Bars are scaled against the largest option, so the biggest bar fills the
  // track and small differences stay visible.
  const largest = Math.max(...options.map((option) => option.count), 1);

  return (
    <ul className="flex w-full flex-col gap-3">
      {options.map((option) => {
        const share = percent(option.count, answered);

        return (
          <li key={option.value} className="flex w-full flex-col gap-1.5">
            <div className="flex items-baseline justify-between gap-3">
              <span className="min-w-0 truncate text-[13px] text-neutral-900">
                {option.label}
              </span>
              {/* Direct label: one value per bar, at its end. The reader never
                  has to hover to get the number. */}
              <span className="shrink-0 text-[12px] text-neutral-700 tabular-nums">
                {option.count}
                <span className="text-neutral-700/68"> · {share}%</span>
              </span>
            </div>

            <div
              className="w-full overflow-hidden rounded-[4px]"
              style={{ height: BAR_THICKNESS, background: VIZ.track }}
              role="img"
              aria-label={`${option.label}: ${option.count} of ${answered} answers, ${share} percent`}
              title={`${option.label} — ${option.count} of ${answered} (${share}%)`}
            >
              <div
                // Rounded at the data end, square at the baseline.
                className="h-full rounded-r-[4px] transition-[width] duration-300"
                style={{
                  width: `${(option.count / largest) * 100}%`,
                  background: VIZ.series,
                }}
              />
            </div>
          </li>
        );
      })}
    </ul>
  );
}
