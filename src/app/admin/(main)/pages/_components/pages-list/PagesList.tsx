import PagesListRow from './PagesListRow';

import type { Page } from '@/types/admin';

type PagesListProps = {
  items: Page[];
};

export default function PagesList({ items }: PagesListProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((page) => (
        <PagesListRow key={page.id} page={page} />
      ))}
    </div>
  );
}
