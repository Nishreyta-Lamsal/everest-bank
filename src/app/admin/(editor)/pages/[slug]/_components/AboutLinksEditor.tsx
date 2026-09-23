'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { AboutLinksContent, PageSectionRead } from '@/types/admin';

type AboutLinksEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type AboutLinkCard = NonNullable<AboutLinksContent['cards']>[number];

export default function AboutLinksEditor({
  slug,
  section,
}: AboutLinksEditorProps) {
  const content = localizedContent<AboutLinksContent>(section.content);

  const [cards, setCards] = useState<AboutLinkCard[]>(content.cards ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<AboutLinksContent>(slug, section, () => ({
      cards,
    }));

  function updateCard(index: number, next: AboutLinkCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Title, image and link target for each card in the grid"
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

            <FieldLabel label="Image">
              {card.image?.src ? (
                <ImagePreview
                  src={card.image.src}
                  alt={card.image.alt}
                  onReplace={(picked) =>
                    updateCard(index, {
                      ...card,
                      image: toSectionMedia(picked),
                    })
                  }
                />
              ) : (
                <ImageDropzone
                  onMediaSelected={(picked) =>
                    updateCard(index, {
                      ...card,
                      image: toSectionMedia(picked),
                    })
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
      </div>
    </SectionEditorShell>
  );
}
