import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CalculatorTabs from '../../_components/CalculatorTabs';

import { ROUTE } from '@/constants';

export default function EligibilityCheckerHeroSection() {
  return (
    <section className="relative h-[292px] w-full overflow-hidden bg-[#7a0d0f] lg:h-[308px]">
      <Image
        src="/images/tools/hero-bg-mountain.svg"
        alt=""
        width={838}
        height={336}
        priority
        className="pointer-events-none absolute right-0 bottom-0 w-[400px] max-w-none lg:right-[-24px] lg:bottom-[-42px] lg:h-[334px] lg:w-[837px]"
      />

      <div className="absolute inset-x-0 bottom-8 z-10 lg:bottom-9.5">
        <LayoutWrapper>
          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-white">
              Eligibility Checker
            </h1>
            <CalculatorTabs activeHref={ROUTE.ELIGIBILITY_CHECKER} />
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
