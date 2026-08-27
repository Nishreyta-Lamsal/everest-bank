import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';

import { aboutOverviewCards, aboutOverviewStats } from '../_data';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutOverviewSectionProps = {
  sections?: AboutPageSection[];
};

export default function AboutOverviewSection({
  sections,
}: AboutOverviewSectionProps) {
  const content = getSectionContent(sections, 'about_overview');

  const intro =
    content?.intro ||
    'With a strong nationwide presence and a legacy of trust, Everest Bank continues to deliver responsible banking solutions that create lasting value for customers and communities across Nepal.';
  const stats = content?.stats || aboutOverviewStats;
  const centerImageSrc =
    content?.center_image?.src || '/images/about/impact.png';
  const centerImageAlt =
    content?.center_image?.alt ||
    'A hand handing over car keys to another person';
  const cards =
    content?.cards.map((card) => ({
      title: card.title,
      linkLabel: card.link_label,
      href: card.href,
    })) || aboutOverviewCards;

  const [leadingCard, trailingCard] = cards;

  return (
    <section className="w-full pt-8 pb-16 lg:py-[120px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-16 lg:gap-15">
          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">
            <p className="font-heading text-title-1-mobile-md text-grey-500 leading-[1.4] lg:max-w-[751px] lg:text-[40px] lg:leading-[1.2] lg:font-medium">
              {intro}
            </p>
            <div className="flex flex-col gap-10 lg:w-[298px] lg:shrink-0 lg:justify-center lg:gap-12">
              {stats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <p className="font-heading lg:text-display-2-desktop-md text-heading-h2-mobile-md text-red-500">
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
            {leadingCard && (
              <div className="bg-grey-bluish-grey flex h-[142px] flex-col justify-between rounded-2xl p-4 lg:h-[280px] lg:p-6">
                <h3 className="font-heading text-title-1-mobile lg:text-heading-h3-desktop text-grey-500">
                  {leadingCard.title}
                </h3>
                <Link
                  href={leadingCard.href}
                  className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline"
                >
                  {leadingCard.linkLabel}
                  <ArrowUpRightIcon className="size-[16px] shrink-0" />
                </Link>
              </div>
            )}

            <div className="relative h-[239px] overflow-hidden rounded-lg lg:h-[280px] lg:rounded-2xl lg:rounded-tl-[260px]">
              <Image
                src={centerImageSrc}
                alt={centerImageAlt}
                fill
                className="object-cover"
              />
            </div>

            {trailingCard && (
              <div className="bg-grey-bluish-grey flex h-[142px] flex-col justify-between rounded-2xl p-4 lg:h-[280px] lg:p-6">
                <h3 className="font-heading text-title-1-mobile lg:text-heading-h3-desktop text-grey-500">
                  {trailingCard.title}
                </h3>
                <Link
                  href={trailingCard.href}
                  className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline"
                >
                  {trailingCard.linkLabel}
                  <ArrowUpRightIcon className="size-[16px] shrink-0" />
                </Link>
              </div>
            )}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
