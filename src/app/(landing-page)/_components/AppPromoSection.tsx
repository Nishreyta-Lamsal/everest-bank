import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { actionBadges } from '../_data';

export default function AppPromoSection() {
  return (
    <section className="relative w-full overflow-hidden py-15 bg-grey-bluish-grey">
      <LayoutWrapper>
        <div className="flex items-start justify-between gap-22">
          <div className="relative h-101 w-155 shrink-0 overflow-hidden rounded-lg rounded-tr-22">
            <Image
              src="/images/app-promo/woman-with-card-photo.png"
              alt="A woman checking her balance on her phone while holding an Everest Bank card"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex h-101 flex-col gap-18">
            <p className="font-heading text-heading-h1-desktop-md text-grey-500 w-117.25">
              Save smarter, stay connected, and achieve more with modern
              banking.
            </p>
            <div className="flex w-34 flex-col items-center gap-6">
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
        <div className="mt-8 flex gap-8">
          {actionBadges.map((badge) => (
            <Link
              key={badge.label}
              href={badge.href}
              className="bg-red-500 hover:bg-red-700 flex h-22.75 w-46.25 flex-col items-start justify-between rounded-lg rounded-tl-2xl p-4 text-white transition-colors"
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
