import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import type { PersonalPageSection } from '@/api/services/personal/personal-page.service';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';
import { actionBadges } from '../_data';

type AppPromoSectionProps = {
  sections: PersonalPageSection[];
};

export default function AppPromoSection({ sections }: AppPromoSectionProps) {
  const content = getSectionContent(sections, 'app_promo');

  const heading =
    content?.heading ||
    'Save smarter, stay connected, and achieve more with modern banking.';
  const heroImageSrc =
    content?.hero_image?.src || '/images/app-promo/woman-with-card-photo.png';
  const heroImageAlt =
    content?.hero_image?.alt ||
    'A woman checking her balance on her phone while holding an Everest Bank card';
  const appStoreBadges = content?.app_store_badges || [
    {
      src: '/images/app-promo/google-play-badge.png',
      alt: 'Get it on Google Play',
    },
    {
      src: '/images/app-promo/app-store-badge.png',
      alt: 'Download on the App Store',
    },
  ];
  const qrCodeSrc =
    content?.qr_code?.src || '/images/footer/ebl-touch-app-qr.png';
  const qrCodeAlt =
    content?.qr_code?.alt || 'Scan to download the Everest Bank App';
  const qrCaptionLines = content?.qr_code?.caption_lines || [
    'Scan to download',
    'Everest Bank App',
  ];
  const phoneMockupSrc =
    content?.phone_mockup?.src || '/images/app-promo/phone-mockup.png';
  const phoneMockupAlt = content?.phone_mockup?.alt || 'Phone mockup';
  const badges =
    content?.badges.map((badge) => ({
      href: badge.href,
      label: badge.label,
      icon: iconMap[badge.icon],
    })) || actionBadges;

  return (
    <section className="bg-grey-bluish-grey relative w-full overflow-hidden py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between lg:gap-22">
          <div className="relative h-[239px] w-full overflow-hidden rounded-lg md:h-[404px] lg:max-w-[620px] lg:rounded-tr-[88px]">
            <Image
              src={heroImageSrc}
              alt={heroImageAlt}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-4 lg:h-[404px] lg:gap-18">
            <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[469px]">
              {heading}
            </h2>
            <div className="flex items-center gap-4 lg:hidden">
              {appStoreBadges.map((badge) => (
                <Image
                  key={badge.src}
                  src={badge.src}
                  alt={badge.alt}
                  width={120}
                  height={40}
                />
              ))}
            </div>
            <div className="hidden w-[136px] flex-col items-center gap-6 lg:flex">
              <Image
                src={qrCodeSrc}
                alt={qrCodeAlt}
                width={120}
                height={120}
                className="size-[120px]"
              />
              <p className="text-body-3-desktop text-grey-400 text-center">
                {qrCaptionLines.map((line, index) => (
                  <span key={line}>
                    {index > 0 && <br />}
                    {line}
                  </span>
                ))}
              </p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
      <div className="scrollbar-hidden mt-10 flex gap-4 overflow-x-auto pl-4 md:pl-8 lg:mt-8 lg:w-full lg:max-w-[1400px] lg:gap-8 lg:overflow-visible lg:px-8 xl:mx-auto">
        {badges.map((badge) => (
          <Link
            key={badge.label}
            href={badge.href}
            className="flex h-[91px] w-[185px] shrink-0 flex-col items-start justify-between rounded-lg rounded-tl-[32px] bg-red-500 p-4 text-white transition-colors hover:bg-red-700"
          >
            {badge.icon && <badge.icon className="size-5 md:size-8" />}
            <p className="font-heading text-title-2-mobile lg:text-title-3-desktop">
              {badge.label}
            </p>
          </Link>
        ))}
      </div>
      <Image
        src={phoneMockupSrc}
        alt={phoneMockupAlt}
        width={713}
        height={825}
        className="pointer-events-none absolute top-70.75 right-22 hidden w-[260px] lg:block xl:w-[311px]"
      />
    </section>
  );
}
