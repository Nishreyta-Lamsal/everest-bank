import Image from 'next/image';

import ContentQuote from '@/components/shared/content/ContentQuote';
import { icon } from '@/components/icons';

import { iconMap } from '@/constants';

import type { CorporateMissionAndVisionBodyBlock as CorporateMissionAndVisionBodyBlockData } from './CorporateMissionAndVisionContentSection';

type CorporateMissionAndVisionBodyBlockProps = {
  block: CorporateMissionAndVisionBodyBlockData;
};

export default function CorporateMissionAndVisionBodyBlock({
  block,
}: CorporateMissionAndVisionBodyBlockProps) {
  if (block.type === 'images') {
    if (!block.images.length) return null;

    const isFullWidth = block.layout === 'full_width';

    if (isFullWidth) {
      const [image] = block.images;

      return (
        <div className="relative hidden h-85 w-full overflow-hidden rounded-lg lg:block">
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover"
          />
        </div>
      );
    }

    return (
      <div className="flex w-full flex-col gap-6 lg:flex-row">
        {block.images.map((image) => (
          <div
            key={image.src}
            className="relative h-[201px] w-full overflow-hidden rounded-lg lg:h-[199px]"
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    );
  }

  if (block.type === 'card') {
    const Icon = iconMap[block.icon] ?? icon.eye;

    return (
      <div className="bg-cream-25 flex w-full flex-col items-start gap-6 rounded-lg p-6">
        <div className="flex items-center gap-2">
          <Icon className="text-orange-500" />
          <h3 className="font-heading text-title-1-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
            {block.heading}
          </h3>
        </div>
        <div className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 flex flex-col gap-4">
          {block.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    );
  }

  if (block.type === 'quote') {
    return <ContentQuote title={block.title} />;
  }

  return (
    <div className="flex flex-col items-start gap-4 lg:gap-6">
      <h2 className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500">
        {block.heading}
      </h2>
      <div className="text-body-3-mobile lg:text-body-2-desktop text-grey-500 flex flex-col gap-4">
        {block.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
