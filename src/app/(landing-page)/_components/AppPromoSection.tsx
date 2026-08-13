import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { actionBadges } from '../_data';

export default function AppPromoSection() {
  return (
    <section className="bg-grey-bluish-grey relative w-full overflow-hidden py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 xl:flex-row xl:items-start xl:justify-between xl:gap-22">
          <div className="rounded-tr-22 relative h-59.75 w-full overflow-hidden rounded-lg md:h-101 xl:w-155 xl:shrink-0">
            <Image
              src="/images/app-promo/woman-with-card-photo.png"
              alt="A woman checking her balance on her phone while holding an Everest Bank card"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 xl:h-101 xl:gap-18">
            <p className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h1-desktop-md w-full xl:w-117.25">
              Save smarter, stay connected, and achieve more with modern
              banking.
            </p>
            <div className="flex items-center gap-4 xl:hidden">
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
            <div className="hidden w-34 flex-col items-center gap-6 xl:flex">
              <Image
                src="/images/footer/ebl-touch-app-qr.png"
                alt="Scan to download the Everest Bank App"
                width={120}
                height={120}
                className="size-30"
              />
              <p className="text-body-3-desktop text-grey-400 text-center">
                Scan to download
                <br />
                Everest Bank App
              </p>
            </div>
          </div>
        </div>
        <div className="scrollbar-hidden mt-10 flex gap-4 overflow-x-auto xl:mt-8 xl:gap-8 xl:overflow-visible">
          {actionBadges.map((badge) => (
            <Link
              key={badge.label}
              href={badge.href}
              className="flex h-22.75 w-46.25 shrink-0 flex-col items-start justify-between rounded-lg rounded-tl-2xl bg-red-500 p-4 text-white transition-colors hover:bg-red-700"
            >
              <badge.icon className="size-8" />
              <p className="font-heading text-title-2-desktop">{badge.label}</p>
            </Link>
          ))}
        </div>
      </LayoutWrapper>
      <Image
        src="/images/app-promo/phone-mockup.png"
        alt="Phone mockup"
        width={713}
        height={825}
        className="pointer-events-none absolute top-70.75 right-22 hidden w-77.75 xl:block"
      />
    </section>
  );
}
