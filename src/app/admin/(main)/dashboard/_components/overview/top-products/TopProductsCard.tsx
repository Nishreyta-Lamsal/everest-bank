import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import ProductTable from './ProductTable';

import { ADMIN_ROUTE } from '@/constants/admin';

import { topProducts } from '../../../_data/dashboard-top-products';

export default function TopProductsCard() {
  return (
    <Card
      variant="secondary"
      className="flex flex-1 flex-col items-start gap-6"
    >
      <div className="flex w-full items-center justify-between">
        <p className="text-paragraph-lg-medium text-[rgba(15,23,42,0.8)]">
          Top performing products this week
        </p>
        <a
          href={ADMIN_ROUTE.PRODUCTS}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-[rgba(15,23,42,0.6)]"
        >
          <p className="text-paragraph-sm">All products</p>
          <icon.arrowUpRight className="size-4" />
        </a>
      </div>
      <ProductTable items={topProducts} />
    </Card>
  );
}
