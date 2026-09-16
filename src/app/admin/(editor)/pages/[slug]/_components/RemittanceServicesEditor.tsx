'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, RemittanceServicesContent } from '@/types/admin';

type RemittanceServicesEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type ServiceCard = NonNullable<RemittanceServicesContent['cards']>[number];

/**
 * Editor for the `remittance_services` grid: a title, subtitle and link
 * target per card.
 */
export default function RemittanceServicesEditor({
  slug,
  section,
}: RemittanceServicesEditorProps) {
  const content = localizedContent<RemittanceServicesContent>(section.content);

  const [cards, setCards] = useState<ServiceCard[]>(content.cards ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<RemittanceServicesContent>(slug, section, () => ({
      cards,
    }));

  function updateCard(index: number, next: ServiceCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Title, subtitle and link target for each card in the grid"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <div className="flex w-full flex-col gap-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Card {index + 1}
              {card.title ? ` · ${card.title}` : ''}
            </p>

            <FieldLabel label="Title">
              <Input
                variant="filled"
                size="medium"
                value={card.title ?? ''}
                onChange={(event) =>
                  updateCard(index, { ...card, title: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Subtitle">
              <Input
                variant="filled"
                size="medium"
                value={card.subtitle ?? ''}
                onChange={(event) =>
                  updateCard(index, { ...card, subtitle: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={card.href ?? ''}
                onChange={(href) => updateCard(index, { ...card, href })}
              />
            </FieldLabel>
          </div>
        ))}
      </div>
    </SectionEditorShell>
  );
}
