import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';

import { aboutOverviewCards, aboutOverviewStats } from '../_data';

export default function AboutOverviewSection() {
  return (
    <section className="w-full pt-8 pb-16 lg:py-[120px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-16 lg:gap-15">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <p className="font-heading text-title-1-mobile text-grey-500 lg:max-w-[751px] lg:text-[40px] lg:leading-[1.2] lg:font-medium">
              With a strong nationwide presence and a legacy of trust, Everest
              Bank continues to deliver responsible banking solutions that
              create lasting value for customers and communities across Nepal.
            </p>
            <div className="flex flex-col gap-10 lg:w-[298px] lg:shrink-0 lg:justify-center lg:gap-12">
              {aboutOverviewStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <p className="font-heading lg:text-heading-h2-desktop-md text-display-2-mobile-md text-red-500">
                    {stat.value}
                  </p>
                  <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="bg-grey-bluish-grey flex flex-col justify-between gap-26 rounded-2xl p-4 lg:h-[280px] lg:gap-0 lg:p-6">
              <h3 className="font-heading text-title-1-mobile lg:text-heading-h3-desktop text-grey-500">
                {aboutOverviewCards[0].title}
              </h3>
              <Link
                href={aboutOverviewCards[0].href}
                className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline"
              >
                {aboutOverviewCards[0].linkLabel}
                <ArrowUpRightIcon className="size-[16px] shrink-0" />
              </Link>
            </div>

            <div className="relative h-[239px] overflow-hidden rounded-lg lg:h-[280px] lg:rounded-2xl lg:rounded-tl-[260px]">
              <Image
                src="/images/about/impact.png"
                alt="A hand handing over car keys to another person"
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-grey-bluish-grey flex flex-col justify-between gap-26 rounded-2xl p-4 lg:h-[280px] lg:gap-0 lg:p-6">
              <h3 className="font-heading text-title-1-mobile lg:text-heading-h3-desktop text-grey-500">
                {aboutOverviewCards[1].title}
              </h3>
              <Link
                href={aboutOverviewCards[1].href}
                className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline"
              >
                {aboutOverviewCards[1].linkLabel}
                <ArrowUpRightIcon className="size-[16px] shrink-0" />
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
