import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import type { StatEntry } from '@/types';

type StatsHighlightSectionProps = {
  heading: string;
  stats: StatEntry[];
  image: string;
  imageAlt: string;
};

export default function StatsHighlightSection({
  heading,
  stats,
  image,
  imageAlt,
}: StatsHighlightSectionProps) {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[556px_583px] lg:items-center lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:col-start-1 lg:row-start-1">
            {heading}
          </h2>
          <div className="relative h-[201px] w-full overflow-hidden rounded-lg md:h-[437px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:w-[583px] lg:rounded-3xl lg:rounded-tl-[192px]">
            <Image src={image} alt={imageAlt} fill className="object-cover" />
          </div>
          <div className="flex flex-col items-start gap-12 lg:col-start-1 lg:row-start-2 lg:flex-row lg:items-center">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-start gap-4">
                <p className="font-heading text-heading-h3-mobile-md lg:text-display-2-desktop-md text-red-500">
                  {stat.value}
                </p>
                <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
