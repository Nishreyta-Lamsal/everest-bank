import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import StatArcGraphic from './StatArcGraphic';

import type { StatHighlight } from '../../../_data/dashboard-stat-highlights';

type StatHighlightCardProps = {
  stat: StatHighlight;
};

export default function StatHighlightCard({ stat }: StatHighlightCardProps) {
  return (
    <Card
      variant="secondary"
      className="relative flex flex-col items-start gap-4 overflow-hidden p-4"
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-paragraph-medium text-[rgba(15,23,42,0.8)]">
          {stat.label}
        </p>
        <icon.arrowUpRight className="size-4 text-slate-950" />
      </div>
      <div className="flex flex-col gap-px">
        <div className="flex items-center gap-1">
          <p className="text-paragraph-sm text-[rgba(15,23,42,0.6)]">
            {stat.changeLabel}
          </p>
          <icon.trendUp className="size-4 text-[#0b9487]" />
        </div>
        <p className="text-[32px] leading-none text-slate-900">{stat.value}</p>
      </div>
      <StatArcGraphic
        accentColor={stat.accentColor}
        className="absolute top-[58px] left-[234px] h-[133px] w-[128px]"
      />
    </Card>
  );
}
