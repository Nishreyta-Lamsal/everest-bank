import type { ActivityItem as ActivityItemData } from '../../_data/dashboard-activities';

type ActivityItemProps = {
  activity: ActivityItemData;
};

export function ActivityItem({
  activity: { icon: Icon, title, category, time },
}: ActivityItemProps) {
  return (
    <div className="border-black-alpha-5 flex w-full flex-col items-start justify-center border-b p-4">
      <div className="flex w-full flex-col items-start gap-2 lg:flex-row lg:items-start lg:justify-between lg:gap-4">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
            <Icon className="size-6 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-1 flex-col items-start gap-2">
            <p className="text-paragraph-medium text-black-alpha-95 w-full truncate">
              {title}
            </p>
            <p className="text-paragraph-sm text-neutral-700">{category}</p>
          </div>
        </div>
        <p className="text-paragraph-sm shrink-0 whitespace-nowrap text-neutral-700">
          {time}
        </p>
      </div>
    </div>
  );
}
