'use client';

import { Card } from '@/components/admin/ui/card';
import CardListRow from './CardListRow';

import { useMoreService } from '@/hooks/api/admin/use-more-services';

type MoreServicePanelProps = {
  slug: string;
};

/** One group's cards, with the page names the cards point at. */
export default function MoreServicePanel({ slug }: MoreServicePanelProps) {
  const { data: group, isPending } = useMoreService(slug);

  return (
    <Card variant="primary" className="w-full px-4 py-3">
      {isPending || !group ? (
        <div className="flex w-full flex-col gap-2 py-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[74px] w-full animate-pulse rounded-[6px] bg-slate-100"
            />
          ))}
        </div>
      ) : group.cards.length === 0 ? (
        <p className="text-paragraph-sm px-4 py-6 text-neutral-700/68">
          No cards yet. The section is hidden on the site until one is added.
        </p>
      ) : (
        <div className="flex w-full flex-col divide-y divide-black/3">
          {group.cards.map((card, index) => (
            <CardListRow
              key={card.id}
              card={card}
              groupSlug={slug}
              screens={group.available_screens}
              openMenuUpward={
                index === group.cards.length - 1 && group.cards.length > 1
              }
            />
          ))}
        </div>
      )}
    </Card>
  );
}
