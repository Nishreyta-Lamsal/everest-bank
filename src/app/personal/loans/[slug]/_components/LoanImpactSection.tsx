import Link from 'next/link';
import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { GreenEnergyIcon } from '@/components/icons';

import type { LoanImpact } from '../_data';

type LoanImpactSectionProps = {
  data: LoanImpact;
};

export default function LoanImpactSection({ data }: LoanImpactSectionProps) {
  return (
    <section className="relative w-full overflow-hidden bg-red-600 py-16 lg:py-30">
      <LayoutWrapper>
        <div className="relative flex w-full flex-col items-start gap-10 lg:items-end lg:gap-24.5">
          <Image
            src="/icons/plant.svg"
            alt=""
            width={350}
            height={500}
            className="pointer-events-none absolute bottom-[25%] left-[58%] h-[161px] w-auto lg:top-auto lg:-bottom-[25%] lg:left-[5%] lg:h-[400px] xl:h-[500px]"
          />

          <div className="flex w-full flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h0-desktop-md w-full text-white lg:w-[675px]">
              {data.heading}
            </h2>
            <p className="text-body-3-mobile lg:text-body-2-desktop text-white-90 w-full lg:w-[410px]">
              {data.description}
            </p>
          </div>

          <div className="flex w-full flex-col items-start gap-10 lg:w-auto lg:flex-row lg:items-end lg:gap-18">
            <Link
              href={data.applyHref}
              className="order-2 flex h-[154px] w-full shrink-0 flex-col items-start justify-between rounded-lg rounded-tl-[60px] bg-red-700 p-8 transition-colors duration-200 hover:bg-red-800 lg:order-1 lg:h-auto lg:w-[340px] lg:justify-start lg:gap-10"
            >
              <GreenEnergyIcon className="size-[32px] text-white lg:size-[52px]" />
              <span className="font-heading text-title-0-mobile-md lg:text-heading-h3-desktop-md text-white">
                Apply for Loan
              </span>
            </Link>

            <div className="order-1 flex w-full flex-col items-start gap-12 lg:order-2 lg:w-auto lg:gap-17">
              {data.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-4 lg:gap-5.75"
                >
                  <p className="font-heading text-heading-h3-mobile-sb lg:text-heading-h3-desktop-sb text-white">
                    {stat.value}
                  </p>
                  <p className="font-heading text-title-2-mobile lg:text-title-1-desktop text-white-90">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
