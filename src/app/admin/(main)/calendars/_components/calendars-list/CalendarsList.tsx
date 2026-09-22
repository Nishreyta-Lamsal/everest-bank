import CalendarRow from './CalendarRow';

import type { CalendarRead } from '@/api/services/admin/calendar.service';

type CalendarsListProps = {
  items: CalendarRead[];
  isPending?: boolean;
  isError?: boolean;
};

function Message({ children }: { children: string }) {
  return (
    <p className="text-paragraph-sm px-4 py-6 text-neutral-700/68">
      {children}
    </p>
  );
}

export default function CalendarsList({
  items,
  isPending,
  isError,
}: CalendarsListProps) {
  if (isPending) {
    return (
      <div className="flex w-full flex-col gap-2 py-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[74px] w-full animate-pulse rounded-[6px] bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <Message>Could not load calendars.</Message>;
  }

  if (items.length === 0) {
    return <Message>No calendars yet.</Message>;
  }

  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((entry, index) => (
        <CalendarRow
          key={entry.id}
          entry={entry}
          openMenuUpward={index === items.length - 1 && items.length > 1}
        />
      ))}
    </div>
  );
}
