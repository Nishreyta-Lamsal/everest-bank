import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { ROUTE } from '@/constants';

export default function BoardOfDirectorsHeroSection() {
  return (
    <section className="relative h-[312px] w-full overflow-hidden bg-[#d9d9d9] lg:h-[308px] lg:bg-[#fff5ed]">
      <Image
        src="/images/about/board-of-directors/hero-bg-mobile.png"
        alt="Stylized illustration of a snow-capped mountain range"
        fill
        priority
        className="object-cover lg:hidden"
      />
      <Image
        src="/images/about/board-of-directors/hero-bg-base.png"
        alt=""
        fill
        priority
        className="hidden object-cover lg:block"
      />
      <Image
        src="/images/about/board-of-directors/hero-bg-mountain.png"
        alt="Stylized illustration of a snow-capped mountain range"
        fill
        priority
        className="hidden object-cover lg:block"
      />

      <div className="absolute inset-x-0 bottom-6 z-10 lg:bottom-11">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-end lg:justify-between">
            <h1 className="font-heading text-heading-h2-mobile-md md:text-display-1-mobile-md lg:text-display-1-desktop-md text-grey-500">
              Board of Directors
            </h1>
            <Link href={ROUTE.BRANCHES} className="w-full lg:w-auto">
              <Button
                variant="primary"
                size="sm"
                className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
              >
                Contact Bank
              </Button>
            </Link>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
