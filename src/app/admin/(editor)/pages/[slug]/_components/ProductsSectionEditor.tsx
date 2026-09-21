'use client';

import { useState } from 'react';

import ProductCardFieldGroup from './ProductCardFieldGroup';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  PageSectionRead,
  ProductCard,
  ProductsContent,
} from '@/types/admin';

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

  const [topCards, setTopCards] = useState<ProductCard[]>(
    content.top_cards ?? [],
  );
  const [bottomCards, setBottomCards] = useState<ProductCard[]>(
    content.bottom_cards ?? [],
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ProductsContent>(slug, section, () => ({
      top_cards: topCards,
      bottom_cards: bottomCards,
    }));

  const groups: Array<{
    key: CardGroup;
    heading: string;
    cards: ProductCard[];
    setCards: (cards: ProductCard[]) => void;
    showMedia: boolean;
  }> = [
    {
      key: 'top_cards',
      heading: 'Top row cards',
      cards: topCards,
      setCards: setTopCards,
      showMedia: true,
    },
    {
      key: 'bottom_cards',
      heading: 'Bottom row cards',
      cards: bottomCards,
      setCards: setBottomCards,
      showMedia: false,
    },
  ];

  return (
    <SectionEditorShell
      title={section.label}
      description="Cards shown in this section, with icons and links"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {groups.map(({ key, heading, cards, setCards, showMedia }) => (
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
                showMedia={showMedia}
                onMediaSelect={(media) =>
                  setCards(
                    cards.map((c, i) =>
                      i === index ? { ...c, decoration_src: media } : c,
                    ),
                  )
                }
                onMediaRemove={() =>
                  setCards(
                    cards.map((c, i) =>
                      i === index ? { ...c, decoration_src: undefined } : c,
                    ),
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
    </SectionEditorShell>
  );
}
