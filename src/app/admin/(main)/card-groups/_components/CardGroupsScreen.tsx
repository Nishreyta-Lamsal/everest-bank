'use client';

import { useState } from 'react';

import { Card } from '@/components/admin/ui/card';
import CardGroupPanel from './CardGroupPanel';

import { useCardGroups } from '@/hooks/api/admin/use-card-groups';

import { cn } from '@/lib/utils';

export default function CardGroupsScreen() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const { data: groups, isPending, isError, refetch } = useCardGroups();

  // Default to the first group once loaded, without an effect.
  const selected = activeSlug ?? groups?.[0]?.slug ?? null;

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex w-full flex-col gap-1">
        <p className="text-heading-3 text-neutral-900">Card Groups</p>
        <p className="text-paragraph-sm text-neutral-700">
          Card rows reused across several pages. Editing one here changes every
          page that shows it.
        </p>
      </section>

      {isPending && (
        <Card className="flex h-[148px] items-center justify-center">
          <p className="text-paragraph-sm text-neutral-700/68">Loading…</p>
        </Card>
      )}

      {isError && (
        <Card className="flex h-[148px] flex-col items-center justify-center gap-3">
          <p className="text-paragraph-sm text-neutral-700/68">
            Could not load card groups.
          </p>
          <button
            type="button"
            onClick={() => refetch()}
            className="text-paragraph-sm-medium text-slate-950 underline"
          >
            Try again
          </button>
        </Card>
      )}

      {groups && groups.length === 0 && (
        <Card className="flex h-[148px] items-center justify-center">
          <p className="text-paragraph-sm text-neutral-700/68">
            No card groups yet.
          </p>
        </Card>
      )}

      {groups && groups.length > 0 && (
        <>
          {groups.length > 1 && (
            <div className="flex flex-wrap items-start gap-2">
              {groups.map((group) => (
                <button
                  key={group.slug}
                  type="button"
                  onClick={() => setActiveSlug(group.slug)}
                  className={cn(
                    'text-paragraph-sm-medium flex cursor-pointer items-center gap-2 rounded-full px-6 py-2',
                    group.slug === selected
                      ? 'border border-black/5 bg-slate-950 text-white'
                      : 'bg-white/50 text-neutral-700',
                  )}
                >
                  <span>{group.title}</span>
                  <span>{group.cards_count ?? 0}</span>
                </button>
              ))}
            </div>
          )}

          {selected && <CardGroupPanel slug={selected} />}
        </>
      )}
    </div>
  );
}
