'use client';

import { useEffect, useState } from 'react';

import ProductCardFieldGroup from './ProductCardFieldGroup';
import SlideEditorHeader from './SlideEditorHeader';
import { usePageEditor } from '@/store/PageEditorContext';
// import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';

import { useUpdatePageSection } from '@/hooks/api/admin/use-page-sections';
import { useUploadMedia } from '@/hooks/api/admin/use-media';
import { localizedContent, mergeLocalizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, ProductCard, ProductsContent } from '@/types/admin';

type ProductsSectionEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type CardGroup = 'top_cards' | 'bottom_cards';

export default function ProductsSectionEditor({
  slug,
  section,
}: ProductsSectionEditorProps) {
  const content = localizedContent<ProductsContent>(section.content);
  const updateSection = useUpdatePageSection(slug, section.id);
  const uploadMedia = useUploadMedia();
  const { registerPublishHandler } = usePageEditor();

  const [shownOnPage, setShownOnPage] = useState(section.is_visible);
  const [topCards, setTopCards] = useState<ProductCard[]>(
    content.top_cards ?? [],
  );
  const [bottomCards, setBottomCards] = useState<ProductCard[]>(
    content.bottom_cards ?? [],
  );

  const groups: Array<{
    key: CardGroup;
    heading: string;
    cards: ProductCard[];
    setCards: (cards: ProductCard[]) => void;
  }> = [
    {
      key: 'top_cards',
      heading: 'Top row cards',
      cards: topCards,
      setCards: setTopCards,
    },
    {
      key: 'bottom_cards',
      heading: 'Bottom row cards',
      cards: bottomCards,
      setCards: setBottomCards,
    },
  ];

  async function publishChanges() {
    await updateSection.mutateAsync({
      is_visible: shownOnPage,
      content: mergeLocalizedContent<ProductsContent>(section.content, {
        top_cards: topCards,
        bottom_cards: bottomCards,
      }),
    });
  }

  // Re-register each render so the handler closes over the latest field values.
  useEffect(() => {
    registerPublishHandler(publishChanges);

    return () => registerPublishHandler(null);
  });

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-8">
        <SlideEditorHeader
          title={section.label}
          description="Cards shown in this section, with icons and links"
          shownOnPage={shownOnPage}
          onShownOnPageChange={setShownOnPage}
        />

        {groups.map(({ key, heading, cards, setCards }) => (
          <div key={key} className="flex w-full flex-col gap-3">
            <p className="text-[16px] font-semibold text-neutral-900">
              {heading}
            </p>

            <div className="flex w-full flex-col gap-4">
              {cards.map((card, index) => (
                <ProductCardFieldGroup
                  key={index}
                  label={`Card ${index + 1}`}
                  card={card}
                  onChange={(next) =>
                    setCards(cards.map((c, i) => (i === index ? next : c)))
                  }
                  onRemove={() => setCards(cards.filter((_, i) => i !== index))}
                  isUploadingDecoration={uploadMedia.isPending}
                  onDecorationUpload={(file) =>
                    uploadMedia.mutate(
                      { file },
                      {
                        onSuccess: (media) => {
                          if (!media.file_url) return;

                          setCards(
                            cards.map((c, i) =>
                              i === index
                                ? {
                                    ...c,
                                    decoration_src: {
                                      src: media.file_url,
                                      alt: media.alt_text || media.title || '',
                                      media_id: media.id,
                                    },
                                  }
                                : c,
                            ),
                          );
                        },
                      },
                    )
                  }
                />
              ))}
            </div>

            {/* <Button
              variant="secondary"
              size="small"
              className="self-start"
              onClick={() => setCards([...cards, { title: '', subtitle: '' }])}
            >
              Add card
            </Button> */}
          </div>
        ))}

        {updateSection.isError && (
          <p className="text-[12px] text-red-600">Could not publish changes.</p>
        )}
      </div>
    </Card>
  );
}
