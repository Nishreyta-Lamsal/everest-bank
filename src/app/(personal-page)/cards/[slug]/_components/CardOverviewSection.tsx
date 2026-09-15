import Image from 'next/image';

import { cn } from '@/lib/utils';

import type { CardFace } from '../_data';

type CardOverviewSectionProps = {
  heading: string;
  description: string;
  cardFaces: CardFace[];
  brandsHeading: string;
  brands: string[];
};

export default function CardOverviewSection({
  heading,
  description,
  cardFaces,
  brandsHeading,
  brands,
}: CardOverviewSectionProps) {
  return (
    <div className="flex w-full flex-col items-start gap-8 lg:gap-[54px]">
      <div className="flex w-full flex-wrap items-start gap-4">
        {cardFaces.map((face, index) => (
          <div
            key={face.image}
            className={cn(
              'relative aspect-[87/55] w-full max-w-[175px] flex-1 overflow-hidden rounded-[8px]',
              index === 0 &&
                'border-4 border-white shadow-[0_0_0_6px_rgba(186,32,37,0.5)]',
            )}
          >
            <Image
              src={face.image}
              alt={face.imageAlt}
              fill
              className="h-full w-full object-cover"
            />
          </div>
        ))}
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
          {brands.map((brand) => (
            <li key={brand}>{brand}</li>
          ))}
        </ol>
      </div>
    </div>
  );
}
