import StatHighlightCard from './StatHighlightCard';

import type { StatHighlight } from '../../../_data/dashboard-stat-highlights';

type StatHighlightListProps = {
  items: StatHighlight[];
};

export default function StatHighlightList({ items }: StatHighlightListProps) {
  return (
    <div className="flex w-full flex-col items-start gap-3.75 xl:w-[330px]">
      {items.map((stat) => (
        <StatHighlightCard key={stat.id} stat={stat} />
      ))}
    </div>
  );
}
