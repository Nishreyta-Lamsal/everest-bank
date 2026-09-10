import { ActivityItem } from './ActivityItem';

import type { ActivityItem as ActivityItemData } from '../../_data/dashboard-activities';

type ActivityListProps = {
  items: ActivityItemData[];
};

export function ActivityList({ items }: ActivityListProps) {
  return (
    <div className="border-black-alpha-5 flex w-full flex-col items-start overflow-hidden rounded-lg border bg-white">
      {items.map((item) => (
        <ActivityItem key={item.id} activity={item} />
      ))}
    </div>
  );
}
