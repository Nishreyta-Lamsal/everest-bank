'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card as UiCard } from '@/components/admin/ui/card';
import CardEditDrawer from './CardEditDrawer';

import {
  useCardGroup,
  useReorderCards,
} from '@/hooks/api/admin/use-card-groups';

import type { Card } from '@/types/admin';

type CardGroupPanelProps = {
  slug: string;
};

/** One group and its cards, with the page names the cards point at. */
export default function CardGroupPanel({ slug }: CardGroupPanelProps) {
  const [drawer, setDrawer] = useState<
    { mode: 'closed' } | { mode: 'new' } | { mode: 'edit'; card: Card }
  >({ mode: 'closed' });

  const { data: group, isPending } = useCardGroup(slug);
  const reorderCards = useReorderCards(slug);

  if (isPending || !group) {
    return (
      <UiCard className="flex h-[148px] items-center justify-center">
        <p className="text-paragraph-sm text-neutral-700/68">Loading…</p>
      </UiCard>
    );
  }

  const cards = group.cards;

  function move(index: number, direction: -1 | 1) {
    const next = [...cards];
    const target = index + direction;
    [next[index], next[target]] = [next[target], next[index]];
    reorderCards.mutate(next.map((card) => card.id));
  }

  return (
    <>
      <UiCard className="flex w-full flex-col gap-3">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-0.5">
            <p className="text-paragraph-lg-bold text-neutral-900">
              {group.title}
            </p>
            <p className="text-[12px] text-neutral-700/68">
              Shown wherever the site asks for “{group.slug}”.
            </p>
          </div>
          <Button
            type="button"
            variant="outline"
            size="small"
            onClick={() => setDrawer({ mode: 'new' })}
          >
            <icon.plus />
            Add card
          </Button>
        </div>

        <div className="flex w-full flex-col gap-1">
          {cards.map((card, index) => (
            <div
              key={card.id}
              className="hover:bg-black-alpha-5 flex w-full items-center gap-2 rounded-lg px-2 py-2"
            >
              <div className="flex shrink-0 flex-col">
                <button
                  type="button"
                  aria-label={`Move ${card.title} up`}
                  disabled={index === 0 || reorderCards.isPending}
                  onClick={() => move(index, -1)}
                  className="flex size-4 cursor-pointer items-center justify-center text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <icon.chevronDown className="size-3 rotate-180" />
                </button>
                <button
                  type="button"
                  aria-label={`Move ${card.title} down`}
                  disabled={
                    index === cards.length - 1 || reorderCards.isPending
                  }
                  onClick={() => move(index, 1)}
                  className="flex size-4 cursor-pointer items-center justify-center text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <icon.chevronDown className="size-3" />
                </button>
              </div>

              {card.image?.file_url ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={card.image.file_url}
                  alt=""
                  className="size-10 shrink-0 rounded-[4px] object-cover"
                />
              ) : (
                <div className="flex size-10 shrink-0 items-center justify-center rounded-[4px] bg-slate-100">
                  <icon.image className="size-4 text-slate-400" />
                </div>
              )}

              <button
                type="button"
                onClick={() => setDrawer({ mode: 'edit', card })}
                className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-0.5 text-left"
              >
                <span className="flex w-full min-w-0 items-center gap-1.5">
                  <span className="truncate text-[14px] text-neutral-900">
                    {card.title}
                  </span>
                  {!card.is_active && (
                    <span className="text-[11px] text-neutral-500">
                      (hidden)
                    </span>
                  )}
                </span>
                <span className="truncate text-[12px] text-neutral-700/68">
                  {card.page ? `Page: ${card.resolved_href}` : card.href}
                  {' · '}
                  {card.screens.length === 0
                    ? 'every page'
                    : card.screens
                        .map(
                          (key) =>
                            group.available_screens.find(
                              (screen) => screen.key === key,
                            )?.label ?? key,
                        )
                        .join(', ')}
                </span>
              </button>

              <icon.chevronRight className="size-4 shrink-0 text-[#7d7c7d]" />
            </div>
          ))}

          {cards.length === 0 && (
            <p className="py-6 text-center text-[12px] text-neutral-700/68">
              No cards yet. The section is hidden on the site until one is
              added.
            </p>
          )}
        </div>
      </UiCard>

      {drawer.mode !== 'closed' && (
        <CardEditDrawer
          key={drawer.mode === 'edit' ? drawer.card.id : 'new'}
          groupSlug={slug}
          card={drawer.mode === 'edit' ? drawer.card : null}
          screens={group.available_screens}
          onClose={() => setDrawer({ mode: 'closed' })}
        />
      )}
    </>
  );
}
