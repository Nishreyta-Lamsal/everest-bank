import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import PageTable from './PageTable';

import { ADMIN_ROUTE } from '@/constants/admin';

import { topPages } from '../../../_data/dashboard-top-pages';

export default function TopPagesCard() {
  return (
    <Card
      variant="secondary"
      className="flex flex-1 flex-col items-start gap-6"
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
          Top pages by traffic
        </p>
        <a
          href={ADMIN_ROUTE.PAGES}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[rgba(15,23,42,0.6)]"
        >
          <p className="text-paragraph-sm">View all pages</p>
          <icon.arrowUpRight className="size-4" />
        </a>
      </div>
      <PageTable items={topPages} />
    </Card>
  );
}
