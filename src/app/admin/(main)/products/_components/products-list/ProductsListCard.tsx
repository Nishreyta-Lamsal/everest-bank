import { Card } from '@/components/admin/ui/card';
import ProductsList from './ProductsList';

import { productsListEntries } from '@/data/admin';

export default function ProductsListCard() {
  return (
    <Card variant="primary" className="w-full overflow-hidden px-4 py-3">
      <ProductsList items={productsListEntries} />
    </Card>
  );
}
