import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { MediaWithAlt } from '@/types';

type CardOverviewCard = {
  key: string;
  face: Partial<MediaWithAlt>;
};

type CardOverviewSectionProps = {
  heading: string;
  description: string;
  cards: CardOverviewCard[];
  brandsHeading: string;
  brands?: string[];
  selectedKey: string;
  onSelectKey: (key: string) => void;
};

export default function CardOverviewSection({
  heading,
  description,
  cards,
  brandsHeading,
  brands,
  selectedKey,
  onSelectKey,
}: CardOverviewSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:gap-[54px]">
      <div className="flex w-full flex-wrap items-start gap-4">
        {cards.map(({ key, face }) => {
          const faceSrc = face?.src;

          return (
            <button
              key={key}
              type="button"
              aria-pressed={selectedKey === key}
              onClick={() => onSelectKey(key)}
              className={cn(
                'bg-grey-100 relative aspect-[87/55] w-full max-w-[175px] flex-1 cursor-pointer overflow-hidden rounded-[8px]',
                selectedKey === key &&
                  'border-4 border-white shadow-[0_0_0_6px_rgba(186,32,37,0.5)]',
              )}
            >
              {faceSrc && (
                <Image
                  src={faceSrc}
                  alt={face.alt ?? ''}
                  fill
                  sizes="175px"
                  className="h-full w-full object-cover"
                />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
        <h2 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
          {heading}
        </h2>
        <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400">
          {description}
        </p>
      </div>

      <div className="flex w-full flex-col items-start gap-4 lg:gap-6">
        <h3 className="font-heading text-heading-h4-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
          {brandsHeading}
        </h3>
        <ol className="text-body-2-mobile lg:text-body-2-desktop text-grey-500 flex list-decimal flex-col gap-3 pl-6 lg:pl-[27px]">
          {brands?.map((brand, index) => (
            <li key={index}>{brand}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
