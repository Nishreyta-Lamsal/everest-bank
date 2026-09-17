import NoticesAndNewsListRow from './NoticesAndNewsListRow';

import type { NoticesAndNewsEntry } from '@/types/admin';

type NoticesAndNewsListProps = {
  items: NoticesAndNewsEntry[];
  kind: 'notice' | 'news';
  isPending?: boolean;
  isError?: boolean;
  emptyLabel?: string;
};

function Message({ children }: { children: string }) {
  return (
    <p className="text-paragraph-sm px-4 py-6 text-neutral-700/68">
      {children}
    </p>
  );
}

export default function NoticesAndNewsList({
  items,
  kind,
  isPending,
  isError,
  emptyLabel = 'Nothing here yet.',
}: NoticesAndNewsListProps) {
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
    return <Message>Could not load this list.</Message>;
  }

  if (items.length === 0) {
    return <Message>{emptyLabel}</Message>;
  }

  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((entry, index) => (
        <NoticesAndNewsListRow
          key={entry.id}
          entry={entry}
          kind={kind}
          openMenuUpward={index === items.length - 1 && items.length > 1}
        />
      ))}
    </div>
  );
}
