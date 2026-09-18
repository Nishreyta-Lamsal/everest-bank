'use client';

import { useRouter } from 'next/navigation';

import { Card } from '@/components/admin/ui/card';
import { icon } from '@/components/admin/icons';
import ProductsList from './ProductsList';

import { useProducts } from '@/store/ProductsProvider';

import { usePages } from '@/hooks/api/admin/use-pages';

import { ADMIN_ROUTE } from '@/constants/admin';

export default function ProductsListCard() {
  const router = useRouter();
  const { pageId, productType, setProductType } = useProducts();

  // One level down from the tab: the product types under it, or — once a type
  // is picked — the products under that type.
  const isDrilledIn = productType !== undefined;

  const { data, isPending, isError, refetch } = usePages(
    isDrilledIn
      ? { kind: 'product', parent: productType.id }
      : { kind: 'product_type', parent: pageId },
    { enabled: isDrilledIn || pageId !== undefined },
  );

  const items = data?.pages ?? [];
  const emptyLabel = isDrilledIn
    ? 'No products under this type yet.'
    : 'No products yet.';

  return (
    <Card variant="primary" className="w-full overflow-hidden px-4 py-3">
      {isDrilledIn && (
        <div className="flex items-center gap-2 border-b border-black/3 px-4 pt-1 pb-3">
          <button
            type="button"
            onClick={() => setProductType(undefined)}
            className="text-paragraph-sm-medium flex cursor-pointer items-center gap-1.5 text-neutral-700 transition-colors hover:text-slate-950"
          >
            <icon.arrowLeft className="size-4" />
            All product types
          </button>
          <span className="text-neutral-700/40">/</span>
          <p className="text-paragraph-sm-medium min-w-0 truncate text-slate-950">
            {productType.title}
          </p>
        </div>
      )}

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
            className="text-paragraph-sm-medium cursor-pointer text-slate-950 underline"
          >
            Try again
          </button>
        </div>
      )}

      {!isPending && !isError && items.length === 0 && (
        <div className="flex h-[148px] items-center justify-center px-4">
          <p className="text-paragraph-sm text-neutral-700/68">{emptyLabel}</p>
        </div>
      )}

      {items.length > 0 && (
        <ProductsList
          items={items}
          canDelete={isDrilledIn}
          onSelect={(page) => {
            // A product type opens its children; a product opens its editor.
            if (isDrilledIn) {
              router.push(`${ADMIN_ROUTE.PRODUCTS}/${page.slug}`);

              return;
            }

            setProductType({ id: page.id, title: page.title });
          }}
        />
      )}
    </Card>
  );
}
