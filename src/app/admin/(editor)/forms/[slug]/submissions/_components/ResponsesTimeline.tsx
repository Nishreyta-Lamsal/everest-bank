'use client';

import { useState } from 'react';

import { VIZ } from './viz';

type ResponsesTimelineProps = {
  points: { date: string; count: number }[];
};

const WIDTH = 720;
const HEIGHT = 160;
const PADDING = { top: 12, right: 12, bottom: 24, left: 32 };

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Submissions per day. One series over time, so a line with a light wash
 * underneath, no legend, and a hover crosshair that reads out the exact day.
 */
export default function ResponsesTimeline({ points }: ResponsesTimelineProps) {
  const [hovered, setHovered] = useState<number | null>(null);

  if (points.length < 2) return null;

  const plotWidth = WIDTH - PADDING.left - PADDING.right;
  const plotHeight = HEIGHT - PADDING.top - PADDING.bottom;
  const peak = Math.max(...points.map((point) => point.count), 1);

  const x = (index: number) =>
    PADDING.left + (index / (points.length - 1)) * plotWidth;
  const y = (count: number) =>
    PADDING.top + plotHeight - (count / peak) * plotHeight;

  const line = points
    .map((point, index) => `${x(index)},${y(point.count)}`)
    .join(' ');
  const area = `${PADDING.left},${PADDING.top + plotHeight} ${line} ${
    PADDING.left + plotWidth
  },${PADDING.top + plotHeight}`;

  const active = hovered === null ? null : points[hovered];

  return (
    <div className="relative w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
        className="w-full"
        role="img"
        aria-label={`Submissions per day, peaking at ${peak}`}
        onMouseLeave={() => setHovered(null)}
      >
        {/* Recessive hairline gridlines: baseline and peak only. */}
        {[0, peak].map((value) => (
          <g key={value}>
            <line
              x1={PADDING.left}
              x2={PADDING.left + plotWidth}
              y1={y(value)}
              y2={y(value)}
              stroke={VIZ.grid}
              strokeWidth={1}
            />
            <text
              x={PADDING.left - 6}
              y={y(value) + 4}
              textAnchor="end"
              fontSize={10}
              fill={VIZ.textSecondary}
            >
              {value}
            </text>
          </g>
        ))}

        <polygon points={area} fill={VIZ.series} opacity={0.1} />
        <polyline
          points={line}
          fill="none"
          stroke={VIZ.series}
          strokeWidth={2}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {active && (
          <>
            <line
              x1={x(hovered as number)}
              x2={x(hovered as number)}
              y1={PADDING.top}
              y2={PADDING.top + plotHeight}
              stroke={VIZ.grid}
              strokeWidth={1}
            />
            <circle
              cx={x(hovered as number)}
              cy={y(active.count)}
              r={4}
              fill={VIZ.series}
              // Surface ring keeps the marker legible where it crosses the line.
              stroke={VIZ.surface}
              strokeWidth={2}
            />
          </>
        )}

        {/* Invisible hit areas, far wider than the marks, so hovering is easy.
            Clamped to the plot so the first and last bands are not half cut
            off by the viewBox edge. */}
        {points.map((point, index) => {
          const band = plotWidth / points.length;
          const left = Math.max(PADDING.left, x(index) - band / 2);
          const right = Math.min(PADDING.left + plotWidth, x(index) + band / 2);

          return (
            <rect
              key={point.date}
              x={left}
              y={PADDING.top}
              width={right - left}
              height={plotHeight}
              fill="transparent"
              onMouseEnter={() => setHovered(index)}
            />
          );
        })}

        <text
          x={PADDING.left}
          y={HEIGHT - 6}
          fontSize={10}
          fill={VIZ.textSecondary}
        >
          {formatDay(points[0].date)}
        </text>
        <text
          x={PADDING.left + plotWidth}
          y={HEIGHT - 6}
          textAnchor="end"
          fontSize={10}
          fill={VIZ.textSecondary}
        >
          {formatDay(points[points.length - 1].date)}
        </text>
      </svg>

      {active && (
        <div
          // The svg fills the container, so the tooltip is positioned against
          // the full viewBox width, not the inner plot width, or it drifts.
          // Centred on the point and clamped so the ends do not overflow.
          aria-hidden
          className="pointer-events-none absolute top-0 -translate-x-1/2 rounded-md bg-slate-950 px-2 py-1 text-[11px] whitespace-nowrap text-white"
          style={{
            left: `clamp(3rem, ${(x(hovered as number) / WIDTH) * 100}%, calc(100% - 3rem))`,
          }}
        >
          {formatDay(active.date)}: {active.count}
        </div>
      )}
    </div>
  );
}
