import ProductsListRow from './ProductsListRow';

import type { ProductsListEntry } from '@/data/admin';

type ProductsListProps = {
  items: ProductsListEntry[];
};

export default function ProductsList({ items }: ProductsListProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((entry) => (
        <ProductsListRow key={entry.id} entry={entry} />
      ))}
    </div>
  );
}
