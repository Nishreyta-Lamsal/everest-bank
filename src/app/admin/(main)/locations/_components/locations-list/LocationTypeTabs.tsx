'use client';

import { cn } from '@/lib/utils';

import type { LocationTypeCounts } from '@/types/admin';

type LocationTypeTabsProps = {
  counts?: LocationTypeCounts;
  active: string;
  onChange: (typeSlug: string) => void;
};

/**
 * Tabs come from the counts the list endpoint already returns, so a new
 * location type shows up here without a code change.
 */
export default function LocationTypeTabs({
  counts,
  active,
  onChange,
}: LocationTypeTabsProps) {
  const tabs = [
    { slug: 'all', label: 'All', count: counts?.all ?? 0 },
    ...(counts?.types ?? []).map((type) => ({
      slug: type.slug,
      label: type.label,
      count: type.count,
    })),
  ];

  return (
    <div className="flex flex-wrap items-start gap-2">
      {tabs.map((tab) => (
        <button
          key={tab.slug}
          type="button"
          onClick={() => onChange(tab.slug)}
          className={cn(
            'text-paragraph-sm-medium flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2',
            tab.slug === active
              ? 'border border-black/5 bg-slate-950 text-white'
              : 'bg-white/50 text-neutral-700',
          )}
        >
          <span>{tab.label}</span>
          <span>{tab.count}</span>
        </button>
      ))}
    </div>
  );
}
