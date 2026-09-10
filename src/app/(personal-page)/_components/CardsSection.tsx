import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import type { PersonalPageSection } from '@/api/services/personal/personal-page.service';

import { getSectionContent } from '@/lib/get-section-content';
import { cn } from '@/lib/utils';

import { cardTiles } from '../_data';

type CardsSectionProps = {
  sections?: PersonalPageSection[];
};

export default function CardsSection({ sections }: CardsSectionProps) {
  const content = getSectionContent(sections, 'cards_preview');

  const headingLines = content?.heading_lines || [
    'Pay Smarter, Earn More, ',
    'Bank Better.',
  ];
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Know more about the cards';
  const backgroundImageSrc =
    content?.background_image?.src || '/images/cards/card-showcase-bg.png';
  const tiles =
    content?.tiles.map((tile) => ({
      href: tile.href,
      title: tile.title,
      roundedCorner: tile.rounded_corner,
    })) || cardTiles;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-6 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md order-1 lg:order-0 lg:w-[581px]">
            {headingLines.map((line, index) => (
              <span key={line}>
                {index > 0 && <br />}
                {line}
              </span>
            ))}
          </h2>
          <Link
            href={ctaHref}
            className="order-3 block w-full lg:order-0 lg:inline-block lg:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full lg:w-auto">
              {ctaLabel}
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-8 lg:order-0 lg:col-span-2 lg:flex-row lg:items-center lg:gap-10">
            {tiles.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  'group relative h-[239px] w-full overflow-hidden rounded-lg md:h-[324px]',
                  card.roundedCorner === 'right'
                    ? 'lg:rounded-tr-[120px]'
                    : 'lg:rounded-tl-[120px]',
                )}
              >
                <Image
                  src={backgroundImageSrc}
                  alt=""
                  fill
                  className="object-cover object-bottom transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)]" />
                <div className="absolute top-45.75 left-4 w-[238px] lg:inset-x-6 lg:top-60.5 lg:flex lg:w-auto lg:items-center lg:justify-between">
                  <h3 className="font-heading text-heading-h3-mobile lg:text-heading-h3-desktop text-white lg:w-[366px]">
                    {card.title}
                  </h3>
                  <icon.arrowUpRight className="hidden size-[32px] shrink-0 text-white lg:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
