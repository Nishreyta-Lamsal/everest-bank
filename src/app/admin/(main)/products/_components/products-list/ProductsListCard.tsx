'use client';

import { Card } from '@/components/admin/ui/card';
import ProductsList from './ProductsList';

import { useProducts } from '@/store/ProductsProvider';

import { usePages } from '@/hooks/api/admin/use-pages';

export default function ProductsListCard() {
  const { pageId, setProductTypeId } = useProducts();

  const { data, isPending, isError, refetch } = usePages(
    { kind: 'product_type', parent: pageId },
    { enabled: pageId !== undefined },
  );

  const items = data?.pages ?? [];

  return (
    <Card variant="primary" className="w-full overflow-hidden px-4 py-3">
      {isPending && (
        <div className="flex w-full flex-col divide-y divide-black/3">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="flex h-[74px] items-center gap-4 px-4">
              <div className="size-[48px] shrink-0 animate-pulse rounded-[4px] bg-slate-100" />
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="h-[14px] w-[180px] animate-pulse rounded bg-slate-100" />
                <div className="h-[12px] w-[260px] animate-pulse rounded bg-slate-100" />
              </div>
            </div>
          ))}
        </div>
      )}

      {isError && (
        <div className="flex h-[148px] flex-col items-center justify-center gap-3 px-4">
          <p className="text-paragraph-sm text-neutral-700/68">
            Could not load products.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-paragraph-sm-medium text-slate-950 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && items.length === 0 && (
        <div className="flex h-[148px] items-center justify-center px-4">
          <p className="text-paragraph-sm text-neutral-700/68">
            No products yet.
          </p>
        </div>
      )}

      {items.length > 0 && (
        <ProductsList items={items} onSelect={setProductTypeId} />
      )}
    </Card>
  );
}
