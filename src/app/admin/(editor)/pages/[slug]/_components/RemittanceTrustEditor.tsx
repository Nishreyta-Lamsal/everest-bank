'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, RemittanceTrustContent } from '@/types/admin';

type RemittanceTrustEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type TrustCard = NonNullable<RemittanceTrustContent['cards']>[number];
type TrustAvatar = NonNullable<RemittanceTrustContent['avatars']>[number];

/**
 * Editor for the `remittance_trust` section. Distinct from the trust banner
 * (`trust`, `business_trust`): this one has link cards, the customer-count
 * avatar stack and a single supporting image.
 */
export default function RemittanceTrustEditor({
  slug,
  section,
}: RemittanceTrustEditorProps) {
  const content = localizedContent<RemittanceTrustContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [image, setImage] = useState(content.image);
  const [countLabel, setCountLabel] = useState(content.count_label ?? '');
  const [avatars, setAvatars] = useState<TrustAvatar[]>(content.avatars ?? []);
  const [cards, setCards] = useState<TrustCard[]>(content.cards ?? []);

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<RemittanceTrustContent>(slug, section, () => ({
    heading,
    image,
    count_label: countLabel,
    avatars,
    cards,
  }));

  function updateCard(index: number, next: TrustCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, image, customer avatars and the trust cards"
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

      <MediaField
        label="Image"
        media={image}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setImage)}
        onRemove={() => setImage(undefined)}
      />

      <FieldLabel label="Customer count label">
        <Input
          variant="filled"
          size="medium"
          placeholder="100K+ Customers"
          value={countLabel}
          onChange={(event) => setCountLabel(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Customer avatars">
        <div className="flex w-full flex-col gap-2">
          {avatars.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-2">
              {avatars.map((avatar, index) => (
                <ImagePreview
                  key={`${avatar.media_id ?? 'avatar'}-${index}`}
                  src={avatar.src}
                  isUploading={isUploading}
                  onReplace={(file) =>
                    uploadImage(file, (media) =>
                      setAvatars((current) =>
                        current.map((item, i) =>
                          i === index
                            ? { src: media.src, media_id: media.media_id }
                            : item,
                        ),
                      ),
                    )
                  }
                  onRemove={() =>
                    setAvatars(avatars.filter((_, i) => i !== index))
                  }
                />
              ))}
            </div>
          )}
          <ImageDropzone
            isUploading={isUploading}
            onFileSelected={(file) =>
              uploadImage(file, (media) =>
                setAvatars((current) => [
                  ...current,
                  { src: media.src, media_id: media.media_id },
                ]),
              )
            }
          />
        </div>
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Trust cards
        </p>

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
    </SectionEditorShell>
  );
}
