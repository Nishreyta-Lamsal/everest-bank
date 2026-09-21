'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import FieldPairRow from '@/components/admin/shared/FieldPairRow';
import MediaField from '@/components/admin/shared/MediaField';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { BusinessFinancingContent, PageSectionRead } from '@/types/admin';

type BusinessFinancingEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type MediaCard = NonNullable<BusinessFinancingContent['media_card']>;
type ContentCard = NonNullable<
  BusinessFinancingContent['content_cards']
>[number];

export default function BusinessFinancingEditor({
  slug,
  section,
}: BusinessFinancingEditorProps) {
  const content = localizedContent<BusinessFinancingContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [mediaCard, setMediaCard] = useState<MediaCard | undefined>(
    content.media_card,
  );
  const [contentCards, setContentCards] = useState<ContentCard[]>(
    content.content_cards ?? [],
  );
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<BusinessFinancingContent>(slug, section, () => ({
      heading,
      media_card: mediaCard,
      content_cards: contentCards,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateMediaCard(next: Partial<MediaCard>) {
    setMediaCard((current) => ({ ...(current as MediaCard), ...next }));
  }

  function updateCard(index: number, next: ContentCard) {
    setContentCards(contentCards.map((card, i) => (i === index ? next : card)));
  }

  function removeCard(index: number) {
    setContentCards(contentCards.filter((_, i) => i !== index));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, media card, content cards and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading">
        <Textarea
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3">
        <p className="text-[13px] font-semibold text-neutral-900">Media card</p>

        <FieldLabel label="Label">
          <Input
            variant="filled"
            size="medium"
            value={mediaCard?.label ?? ''}
            onChange={(event) => updateMediaCard({ label: event.target.value })}
          />
        </FieldLabel>

        <MediaField
          label="Image"
          media={mediaCard?.image}
          onSelect={(image) => updateMediaCard({ image })}
        />

        <FieldLabel label="Links to">
          <LinkTargetSelect
            value={mediaCard?.href ?? ''}
            onChange={(href) => updateMediaCard({ href })}
          />
        </FieldLabel>
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Content cards
        </p>

        {contentCards.map((card, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Card {index + 1}
              {card.title ? ` · ${card.title}` : ''}
            </p>

            <FieldPairRow
              label="Title and description"
              primaryValue={card.title ?? ''}
              onPrimaryChange={(title) => updateCard(index, { ...card, title })}
              secondaryValue={card.description ?? ''}
              onSecondaryChange={(description) =>
                updateCard(index, { ...card, description })
              }
              onRemove={() => removeCard(index)}
              removeLabel={`Remove card ${index + 1}`}
            />

            <MediaField
              label="Image"
              media={card.image}
              onSelect={(image) => updateCard(index, { ...card, image })}
            />

            <FieldLabel label="Link label">
              <Input
                variant="filled"
                size="medium"
                value={card.link_label ?? ''}
                onChange={(event) =>
                  updateCard(index, { ...card, link_label: event.target.value })
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
