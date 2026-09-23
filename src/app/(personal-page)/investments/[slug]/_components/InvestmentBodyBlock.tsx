import Image from 'next/image';

import type { InvestmentBodyBlock as InvestmentBodyBlockData } from '../_data';

type InvestmentBodyBlockProps = {
  block: InvestmentBodyBlockData;
};

export default function InvestmentBodyBlock({
  block,
}: InvestmentBodyBlockProps) {
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
