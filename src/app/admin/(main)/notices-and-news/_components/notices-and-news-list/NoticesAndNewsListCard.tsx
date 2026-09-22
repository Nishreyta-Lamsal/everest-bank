import { Card } from '@/components/admin/ui/card';
import NoticesAndNewsList from './NoticesAndNewsList';

import type { NoticesAndNewsTab } from '../notices-and-news-filters/NoticesAndNewsFilterTabs';
import type { NoticesAndNewsEntry } from '@/types/admin';

type NoticesAndNewsListCardProps = {
  items: NoticesAndNewsEntry[];
  kind: NoticesAndNewsTab;
  isPending?: boolean;
  isError?: boolean;
  emptyLabel?: string;
};

export default function NoticesAndNewsListCard({
  items,
  kind,
  isPending,
  isError,
  emptyLabel,
}: NoticesAndNewsListCardProps) {
  return (
    <Card variant="primary" className="w-full px-4 py-3">
      <NoticesAndNewsList
        items={items}
        kind={kind}
        isPending={isPending}
        isError={isError}
        emptyLabel={emptyLabel}
      />
    </Card>
  );
}
