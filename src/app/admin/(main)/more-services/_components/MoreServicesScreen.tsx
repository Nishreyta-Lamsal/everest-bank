'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import MoreServicePanel from './MoreServicePanel';
import CardEditDrawer from './CardEditDrawer';

import { useMoreServices } from '@/hooks/api/admin/use-more-services';

import { cn } from '@/lib/utils';

export default function MoreServicesScreen() {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const { data: groups, isPending, isError, refetch } = useMoreServices();

  const selected = activeSlug ?? groups?.[0]?.slug ?? null;

  const canAdd = Boolean(groups && groups.length > 0 && selected);

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex w-full items-center justify-between gap-2">
        <div className="flex flex-col gap-1">
          <p className="text-heading-3 text-neutral-900">More Services</p>
          <p className="text-paragraph-sm text-neutral-700">
            Card rows reused across several pages. Editing one here changes
            every page that shows it.
          </p>
        </div>

        {canAdd && (
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsAddOpen(true)}
          >
            <icon.plus />
            Add card
          </Button>
        )}
      </section>

      {isPending && (
        <Card className="flex h-[148px] items-center justify-center">
          <p className="text-paragraph-sm text-neutral-700/68">Loading…</p>
        </Card>
      )}

      {isError && (
        <Card className="flex h-[148px] flex-col items-center justify-center gap-3">
          <p className="text-paragraph-sm text-neutral-700/68">
            Could not load more services.
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
            No more services yet.
          </p>
        </Card>
      )}

      {groups && groups.length > 1 && selected && (
        <div className="flex flex-wrap items-center gap-2">
          {groups.map((option) => (
            <button
              key={option.slug}
              type="button"
              onClick={() => setActiveSlug(option.slug)}
              className={cn(
                'text-paragraph-sm-medium flex cursor-pointer items-center gap-2 rounded-full px-6 py-2',
                option.slug === selected
                  ? 'border border-black/5 bg-slate-950 text-white'
                  : 'bg-white/50 text-neutral-700',
              )}
            >
              <span>{option.title}</span>
              <span>{option.cards_count ?? 0}</span>
            </button>
          ))}
        </div>
      )}

      {groups && groups.length > 0 && selected && (
        <>
          <MoreServicePanel slug={selected} />

          {isAddOpen && (
            <CardEditDrawer
              groupSlug={selected}
              card={null}
              isOpen={isAddOpen}
              onClose={() => setIsAddOpen(false)}
            />
          )}
        </>
      )}
    </div>
  );
}
