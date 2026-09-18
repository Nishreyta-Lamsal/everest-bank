import ProductsListRow from './ProductsListRow';

import type { Page } from '@/types/admin';

type ProductsListProps = {
  items: Page[];
  /** Product types aren't deletable, so only products get the action menu. */
  canDelete?: boolean;
  onSelect: (page: Page) => void;
};

export default function ProductsList({
  items,
  canDelete,
  onSelect,
}: ProductsListProps) {
  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((page) => (
        <ProductsListRow
          key={page.id}
          page={page}
          canDelete={canDelete}
          onSelect={() => onSelect(page)}
        />
      ))}
    </div>
  );
}
