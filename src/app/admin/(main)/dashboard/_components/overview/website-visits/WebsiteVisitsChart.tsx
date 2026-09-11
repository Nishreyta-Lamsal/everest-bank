import { cn } from '@/lib/utils';

import {
  websiteVisitsAxisLabels,
  websiteVisitsChartData,
  websiteVisitsChartHeight,
  websiteVisitsPeakLabel,
} from '../../../_data/dashboard-website-visits';

export default function WebsiteVisitsChart() {
  return (
    <div className="flex w-full max-w-[712px] items-start gap-4">
      <div
        className="text-paragraph flex shrink-0 flex-col justify-between text-[rgba(15,23,42,0.8)]"
        style={{ height: websiteVisitsChartHeight }}
      >
        {websiteVisitsAxisLabels.map((label) => (
          <p key={label} className="shrink-0">
            {label}
          </p>
        ))}
      </div>
      <div className="flex w-full flex-col gap-3">
        <div
          className="flex w-full items-end justify-between"
          style={{ height: websiteVisitsChartHeight }}
        >
          {websiteVisitsChartData.map((group) => (
            <div key={group.day} className="flex items-end gap-1">
              {group.bars.map((height, index) => (
                <div
                  key={index}
                  className={cn(
                    'w-[8px] bg-linear-to-b',
                    group.highlighted
                      ? 'from-[#ba2025] to-[#a91d22]'
                      : 'from-[#a4dcff] to-[#bbe5ff]',
                  )}
                  style={{ height }}
                />
              ))}
            </div>
          ))}
        </div>
        <div className="text-paragraph flex w-full items-center justify-between text-[rgba(15,23,42,0.8)]">
          {websiteVisitsChartData.map((group) => (
            <p key={group.day} className="shrink-0">
              {group.day}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
