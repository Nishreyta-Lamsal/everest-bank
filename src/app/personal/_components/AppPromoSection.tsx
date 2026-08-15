import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { actionBadges } from '../_data';

export default function AppPromoSection() {
  return (
    <section className="bg-grey-bluish-grey relative w-full overflow-hidden py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-22">
          <div className="rounded-tr-22 relative h-[239px] w-full overflow-hidden rounded-lg md:h-[404px] lg:max-w-[620px]">
            <Image
              src="/images/app-promo/woman-with-card-photo.png"
              alt="A woman checking her balance on her phone while holding an Everest Bank card"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 lg:h-[404px] lg:gap-18">
            <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[469px]">
              Save smarter, stay connected, and achieve more with modern
              banking.
            </h2>
            <div className="flex items-center gap-4 lg:hidden">
              <Image
                src="/images/app-promo/google-play-badge.png"
                alt="Get it on Google Play"
                width={120}
                height={40}
              />
              <Image
                src="/images/app-promo/app-store-badge.png"
                alt="Download on the App Store"
                width={120}
                height={40}
              />
            </div>
            <div className="hidden w-[136px] flex-col items-center gap-6 lg:flex">
              <Image
                src="/images/footer/ebl-touch-app-qr.png"
                alt="Scan to download the Everest Bank App"
                width={120}
                height={120}
                className="size-[120px]"
              />
              <p className="text-body-3-desktop text-grey-400 text-center">
                Scan to download
                <br />
                Everest Bank App
              </p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
      <div className="scrollbar-hidden mt-10 flex gap-4 overflow-x-auto pl-4 md:pl-8 lg:mt-8 lg:w-full lg:max-w-[1400px] lg:gap-8 lg:overflow-visible lg:px-8 xl:mx-auto">
        {actionBadges.map((badge) => (
          <Link
            key={badge.label}
            href={badge.href}
            className="flex h-[91px] w-[185px] shrink-0 flex-col items-start justify-between rounded-lg rounded-tl-2xl bg-red-500 p-4 text-white transition-colors hover:bg-red-700"
          >
            <badge.icon className="size-[32px]" />
            <p className="font-heading text-title-2-desktop">{badge.label}</p>
          </Link>
        ))}
      </div>
      <Image
        src="/images/app-promo/phone-mockup.png"
        alt="Phone mockup"
        width={713}
        height={825}
        className="pointer-events-none absolute top-70.75 right-22 hidden w-[260px] lg:block xl:w-[311px]"
      />
    </section>
  );
}
