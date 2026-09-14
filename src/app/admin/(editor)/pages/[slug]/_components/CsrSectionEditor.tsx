'use client';

import { useState } from 'react';

import FieldLabel from './FieldLabel';
import MediaField from './MediaField';
import LinkTargetSelect from './LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import SlideImageThumbnail from './SlideImageThumbnail';
import ImageDropzone from './ImageDropzone';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
// import { icon } from '@/components/admin/icons';
// import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  CsrCard,
  CsrContent,
  PageSectionRead,
  SectionMedia,
} from '@/types/admin';

type CsrSectionEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function CsrSectionEditor({
  slug,
  section,
}: CsrSectionEditorProps) {
  const content = localizedContent<CsrContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [cards, setCards] = useState<CsrCard[]>(content.cards ?? []);
  const [mainImage, setMainImage] = useState(content.main_image);
  const [customerCount, setCustomerCount] = useState(
    content.customer_count ?? '',
  );
  const [avatars, setAvatars] = useState<SectionMedia[]>(
    content.customer_avatars ?? [],
  );
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<CsrContent>(slug, section, () => ({
      heading,
      description,
      cards,
      main_image: mainImage,
      customer_count: customerCount,
      customer_avatars: avatars,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updateCard(index: number, next: CsrCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, description, cards and customer proof"
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

      <FieldLabel label="Description">
        <Textarea
          variant="filled"
          size="medium"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Main image"
        media={mainImage}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setMainImage)}
      />

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Cards</p>

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

        {/* <Button
          variant="secondary"
          size="small"
          className="self-start"
          onClick={() => setCards([...cards, { title: '' }])}
        >
          Add card
        </Button> */}
      </div>

      <FieldLabel label="Customer count">
        <Input
          variant="filled"
          size="medium"
          value={customerCount}
          onChange={(event) => setCustomerCount(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-2">
        <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
          Customer avatars
        </p>
        {avatars.length > 0 && (
          <div className="flex w-full flex-wrap items-center gap-2">
            {avatars.map((avatar, index) => (
              <div key={index} className="flex flex-col items-center gap-1">
                <SlideImageThumbnail src={avatar.src} alt={avatar.alt} />
                {/* <button
                  type="button"
                  onClick={() =>
                    setAvatars(avatars.filter((_, i) => i !== index))
                  }
                  aria-label={`Remove avatar ${index + 1}`}
                  className="text-[11px] text-slate-600"
                >
                  Remove
                </button> */}
              </div>
            ))}
          </div>
        )}
        <ImageDropzone
          isUploading={isUploading}
          onFileSelected={(file) =>
            uploadImage(file, (media) =>
              setAvatars((current) => [...current, media]),
            )
          }
        />
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
