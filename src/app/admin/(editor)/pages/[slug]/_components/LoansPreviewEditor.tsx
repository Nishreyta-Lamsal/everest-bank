'use client';

import { useState } from 'react';

import FieldLabel from './FieldLabel';
import MediaField from './MediaField';
import LinkTargetSelect from './LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
// import { icon } from '@/components/admin/icons';
// import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  LoansPreviewCard,
  LoansPreviewContent,
  PageSectionRead,
} from '@/types/admin';

type LoansPreviewEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function LoansPreviewEditor({
  slug,
  section,
}: LoansPreviewEditorProps) {
  const content = localizedContent<LoansPreviewContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [cards, setCards] = useState<LoansPreviewCard[]>(content.cards ?? []);
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<LoansPreviewContent>(slug, section, () => ({
      heading,
      cards,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateCard(index: number, next: LoansPreviewCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, loan cards and the section link"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Heading">
        <Textarea
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Loan cards</p>

        {cards.map((card, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <div className="flex w-full items-center justify-between">
              <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                Card {index + 1}
                {card.title ? ` · ${card.title}` : ''}
              </p>
              {/* <button
                type="button"
                onClick={() => setCards(cards.filter((_, i) => i !== index))}
                aria-label={`Remove card ${index + 1}`}
                className="text-slate-600"
              >
                <icon.trash className="size-4" />
              </button> */}
            </div>

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

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={card.href ?? ''}
                onChange={(href) => updateCard(index, { ...card, href })}
              />
            </FieldLabel>

            <MediaField
              label="Card image"
              media={card.image}
              isUploading={isUploading}
              onUpload={(file) =>
                uploadImage(file, (media) =>
                  updateCard(index, { ...card, image: media }),
                )
              }
            />
          </div>
        ))}

        {/* <Button
          variant="secondary"
          size="small"
          className="self-start"
          onClick={() => setCards([...cards, { title: '' }])}
        >
          Add card
        </Button> */}
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Section link
        </p>
        <FieldLabel label="Link label">
          <Input
            variant="filled"
            size="medium"
            value={ctaLabel}
            onChange={(event) => setCtaLabel(event.target.value)}
          />
        </FieldLabel>
        <FieldLabel label="Links to">
          <LinkTargetSelect value={ctaHref} onChange={setCtaHref} />
        </FieldLabel>
      </div>
    </SectionEditorShell>
  );
}
