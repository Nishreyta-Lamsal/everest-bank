import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import PillTabs from '@/components/ui/navigation/PillTabs';

import { ROUTE } from '@/constants';
import { locationTabs } from '@/data';

export default function AtmHeroSection() {
  return (
    <section className="relative h-[292px] w-full overflow-hidden bg-[#d9d9d9] lg:h-[308px] lg:bg-[#fff5ed]">
      <Image
        src="/images/shared/mountain-hero-base.png"
        alt=""
        fill
        priority
        className="hidden object-cover lg:block"
      />
      <div className="absolute inset-0 overflow-hidden">
        <Image
          src="/images/shared/mountain-hero-panorama.png"
          alt="Stylized illustration of a snow-capped mountain range"
          width={1440}
          height={542}
          priority
          className="absolute top-[-36.58%] left-[-58.36%] h-[136.48%] w-[216.73%] max-w-none object-cover lg:top-[-70.82%] lg:left-0 lg:h-[175.98%] lg:w-full"
        />
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 lg:bottom-11">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-grey-500">
              ATM
            </h1>
            <PillTabs
              items={locationTabs}
              activeHref={ROUTE.ATM}
              label="Location type"
              variant="secondary"
            />
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
