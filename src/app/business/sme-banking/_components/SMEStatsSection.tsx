import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { smeStats, smeStatsImage } from '../_data/stats';

export default function SMEStatsSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[556px_583px] lg:items-center lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:col-start-1 lg:row-start-1">
            Supporting Nepal&rsquo;s businesses with tailored financial
            solutions and dedicated relationship managers.
          </h2>
          <div className="relative h-[201px] w-full overflow-hidden rounded-lg lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[437px] lg:w-[583px] lg:rounded-3xl lg:rounded-tl-[192px]">
            <Image
              src={smeStatsImage.src}
              alt={smeStatsImage.alt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col items-start gap-12 lg:col-start-1 lg:row-start-2 lg:flex-row lg:items-center">
            {smeStats.map((stat) => (
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
