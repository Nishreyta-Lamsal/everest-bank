'use client';

import { useEffect } from 'react';

import { useProducts } from '@/store/ProductsProvider';

import { cn } from '@/lib/utils';

import { usePages } from '@/hooks/api/admin/use-pages';

export default function ProductsFilterTabs() {
  const { data } = usePages();

  const pages = data?.pages ?? [];

  const { pageId, setPageId, setProductType } = useProducts();

  const firstPageId = pages[0]?.id;
  const activeTab = pageId ?? firstPageId;

  useEffect(() => {
    if (pageId === undefined && firstPageId !== undefined) {
      setPageId(firstPageId);
    }
  }, [pageId, firstPageId, setPageId]);

  return (
    <div className="flex items-start gap-2">
      {pages.map((page) => {
        const active = page.id === activeTab;

        return (
          <button
            key={page.id}
            type="button"
            onClick={() => {
              setPageId(page.id);
              setProductType(undefined);
            }}
            className={cn(
              'text-paragraph-sm-medium flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2',
              active
                ? 'border border-black/5 bg-slate-950 text-white'
                : 'bg-white/50 text-neutral-700',
            )}
          >
            <p>{page.title}</p>
          </button>
        );
      })}
    </div>
  );
}
