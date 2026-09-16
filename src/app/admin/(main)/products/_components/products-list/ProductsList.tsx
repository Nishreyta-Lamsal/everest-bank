import ProductsListRow from './ProductsListRow';

import type { Page } from '@/types/admin';

type ProductsListProps = {
  items: Page[];
  onSelect: (id: number) => void;
};

export default function ProductsList({ items, onSelect }: ProductsListProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((page) => (
        <ProductsListRow
          key={page.id}
          page={page}
          onSelect={() => onSelect(page.id)}
        />
      ))}
    </div>
  );
}
