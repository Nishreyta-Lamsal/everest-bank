'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanFinancingContent, PageSectionRead } from '@/types/admin';

type LoanFinancingEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type FinancingCard = NonNullable<LoanFinancingContent['cards']>[number];

export default function LoanFinancingEditor({
  slug,
  section,
}: LoanFinancingEditorProps) {
  const content = localizedContent<LoanFinancingContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [cards, setCards] = useState<FinancingCard[]>(content.cards ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta_label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta_href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanFinancingContent>(slug, section, () => ({
      heading,
      cards,
      cta_label: ctaLabel,
      cta_href: ctaHref,
    }));

  function updateCard(index: number, next: FinancingCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading, the financing cards and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading">
        <Input
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

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

          <FieldLabel label="Image">
            {card.image?.src ? (
              <ImagePreview
                src={card.image.src}
                alt={card.image.alt}
                onReplace={(picked) =>
                  updateCard(index, { ...card, image: toSectionMedia(picked) })
                }
              />
            ) : (
              <ImageDropzone
                onMediaSelected={(picked) =>
                  updateCard(index, { ...card, image: toSectionMedia(picked) })
                }
              />
            )}
          </FieldLabel>

          <FieldLabel label="Links to">
            <LinkTargetSelect
              value={card.href ?? ''}
              onChange={(href) => updateCard(index, { ...card, href })}
            />
          </FieldLabel>
        </div>
      ))}

      <ButtonFieldGroup
        label="Section link"
        buttonLabel={ctaLabel}
        onButtonLabelChange={setCtaLabel}
        linkTarget={ctaHref}
        onLinkTargetChange={setCtaHref}
        onRemove={() => {
          setCtaLabel('');
          setCtaHref('');
        }}
      />
    </SectionEditorShell>
  );
}
