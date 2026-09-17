'use client';

import { icon } from '@/components/admin/icons';

import { useMediaStorage } from '@/hooks/api/admin/use-media-library';

import { formatFileSize } from '@/lib/admin/format-file-size';

import type { MediaType } from '@/types/admin';

const TICK_COUNT = 72;
const GAUGE_SIZE = 120;
const GAUGE_CENTER = GAUGE_SIZE / 2;
const TICK_OUTER_RADIUS = 60;
const TICK_LENGTH = 13;

const TYPE_META: Record<
  MediaType,
  { iconKey: keyof typeof icon; label: string }
> = {
  image: { iconKey: 'image', label: 'Image' },
  video: { iconKey: 'video', label: 'Video' },
  pdf: { iconKey: 'fileText', label: 'PDF' },
  audio: { iconKey: 'fileText', label: 'Audio' },
  document: { iconKey: 'fileText', label: 'Documents' },
};

function round(value: number) {
  return Math.round(value * 1000) / 1000;
}

type StorageGaugeProps = {
  percent: number;
  usedAmount: string;
  totalAmount: string;
};

function StorageGauge({ percent, usedAmount, totalAmount }: StorageGaugeProps) {
  const ticks = Array.from({ length: TICK_COUNT }, (_, index) => {
    const angleRad = (((index / TICK_COUNT) * 360 - 90) * Math.PI) / 180;

    return {
      key: index,
      x1: round(
        GAUGE_CENTER + (TICK_OUTER_RADIUS - TICK_LENGTH) * Math.cos(angleRad),
      ),
      y1: round(
        GAUGE_CENTER + (TICK_OUTER_RADIUS - TICK_LENGTH) * Math.sin(angleRad),
      ),
      x2: round(GAUGE_CENTER + TICK_OUTER_RADIUS * Math.cos(angleRad)),
      y2: round(GAUGE_CENTER + TICK_OUTER_RADIUS * Math.sin(angleRad)),
      isFilled: index / TICK_COUNT <= percent / 100,
    };
  });

  return (
    <div className="relative flex size-[152px] shrink-0 items-center justify-center">
      <svg
        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
        className="absolute inset-0 size-full"
        aria-hidden
      >
        {ticks.map((tick) => (
          <line
            key={tick.key}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            strokeWidth={1.6}
            strokeLinecap="round"
            className={tick.isFilled ? 'stroke-white/95' : 'stroke-white/15'}
          />
        ))}
      </svg>
      <div className="flex max-w-[100px] flex-col items-center gap-1 text-[13px]">
        <p className="text-white/95">{usedAmount}</p>
        <p className="line-clamp-1 text-white/50">out of {totalAmount}</p>
      </div>
    </div>
  );
}

export default function StorageUsageCard() {
  const { data, isPending, isError } = useMediaStorage();

  const usagePercent = Math.round(data?.used_percent ?? 0);

  const categories = Object.entries(data?.by_type ?? {})
    .filter(([, value]) => value.bytes > 0)
    .map(([type, value]) => ({
      iconKey: TYPE_META[type as MediaType]?.iconKey ?? 'fileText',
      label: TYPE_META[type as MediaType]?.label ?? type,
      percentage: Math.round(value.percent),
    }))
    .sort((a, b) => b.percentage - a.percentage);

  return (
    <div className="relative w-full overflow-hidden rounded-[8px] bg-[linear-gradient(166deg,#4c8cff_8%,#2d6bf5_54%,#1e52e0_92%)] p-3 shadow-[inset_0px_0px_8px_0px_rgba(255,255,255,0.74)]">
      <div className="relative flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-medium text-white">Storage Usage</p>
          {!isPending && !isError && (
            <p className="flex items-baseline gap-1">
              <span className="text-[30px] leading-[30px] font-medium text-white">
                {usagePercent}%
              </span>
              <span className="text-[12px] text-white/50">Used</span>
            </p>
          )}
        </div>

        {isError ? (
          <p className="py-6 text-center text-[13px] text-white/70">
            Could not load storage usage.
          </p>
        ) : isPending ? (
          <div className="h-[152px] w-full animate-pulse rounded-[8px] bg-white/15" />
        ) : (
          <div className="flex items-center gap-4">
            <StorageGauge
              percent={usagePercent}
              usedAmount={formatFileSize(data?.used_bytes ?? 0)}
              totalAmount={formatFileSize(data?.quota_bytes ?? 0)}
            />

            <div className="flex flex-1 flex-col gap-1">
              {categories.map((category) => {
                const CategoryIcon = icon[category.iconKey];

                return (
                  <div key={category.label} className="flex flex-1 gap-1">
                    <div className="flex shrink-0 items-center justify-center rounded-[4px] bg-white/15 px-3.5 py-2.5 backdrop-blur-lg">
                      <CategoryIcon className="size-3.5 text-white" />
                    </div>
                    <div className="flex flex-1 flex-col justify-center gap-0.5 rounded-[4px] bg-white/10 px-3.5 py-1 backdrop-blur-lg">
                      <p className="text-[13px] font-medium text-white">
                        {category.percentage}%
                      </p>
                      <p className="text-[12px] text-white/60">
                        {category.label}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
