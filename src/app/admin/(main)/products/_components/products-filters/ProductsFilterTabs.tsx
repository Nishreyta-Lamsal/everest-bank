'use client';

import { useState } from 'react';

import { cn } from '@/lib/utils';

import { productsFilters } from '@/data/admin';

export default function ProductsFilterTabs() {
  const [activeLabel, setActiveLabel] = useState(
    () =>
      productsFilters.find((filter) => filter.active)?.label ??
      productsFilters[0]?.label,
  );

  return (
    <div className="flex items-start gap-2">
      {productsFilters.map((filter) => {
        const active = filter.label === activeLabel;

        return (
          <button
            key={filter.label}
            type="button"
            onClick={() => setActiveLabel(filter.label)}
            className={cn(
              'text-paragraph-sm-medium flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2',
              active
                ? 'border border-black/5 bg-slate-950 text-white'
                : 'bg-white/50 text-neutral-700',
            )}
          >
            <p>{filter.label}</p>
            <p>{filter.count}</p>
          </button>
        );
      })}
    </div>
  );
}
