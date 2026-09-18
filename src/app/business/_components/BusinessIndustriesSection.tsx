'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';
import IconLinkCard from '@/components/ui/cards/IconLinkCard';
import { icon } from '@/components/icons';

import { gsap, useGSAP } from '@/lib/gsap';
import { getSectionContent } from '@/lib/get-section-content';
import { useIsPreviewFrame } from '@/store/PreviewFrameContext';

import { iconMap } from '@/constants';
import { businessIndustryCards } from '../_data';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessIndustriesSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessIndustriesSection({
  sections,
}: BusinessIndustriesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isPreviewFrame = useIsPreviewFrame();

  const content = getSectionContent(sections, 'business_industries');

  const heading =
    content?.heading || 'Specialists in the sectors that move Nepal’s economy.';
  const description =
    content?.description ||
    'From manufacturing and trade to hospitality, construction, and technology, our banking solutions are tailored to the unique needs of your industry.';
  const sideImageSrc =
    content?.side_image?.src || '/images/business/industries-photo.png';
  const sideImageAlt =
    content?.side_image?.alt ||
    'A relationship manager assisting a business owner at their warehouse desk';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'Explore Industry Solutions';
  const cards =
    content?.cards.map((card) => ({
      icon: iconMap[card.icon] ?? icon.factory,
      title: card.title,
      description: card.description,
      href: card.href,
      linkLabel: card.link_label,
    })) || businessIndustryCards;

  useGSAP(
    () => {
      // Pinning reserves scroll distance against the main window, which the
      // preview iframe doesn't have, it would only show up as dead space.
      if (isPreviewFrame) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        const section = sectionRef.current;
        const row = rowRef.current;
        const track = trackRef.current;
        if (!section || !row || !track) return;

        // Clamp to 0 — a negative distance would flip the tween's x
        // target positive, animating the row the wrong way.
        const scrollDistance = () =>
          Math.max(0, track.scrollWidth - row.offsetWidth);

        const pinDuration = () =>
          scrollDistance() > 0
            ? Math.max(scrollDistance(), window.innerHeight * 0.5)
            : 0;

        const tween = gsap.to(track, {
          x: () => -scrollDistance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 8%',
            end: () => `+=${pinDuration()}`,
            scrub: 1,
            pin: true,
            invalidateOnRefresh: true,
          },
        });

        return () => tween.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [cards.length, isPreviewFrame] },
  );

  return (
    <section ref={sectionRef} className="w-full py-16 lg:pt-30 lg:pb-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full max-w-[335px] lg:max-w-[425px]">
            {heading}
          </h2>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="relative h-[272px] w-full overflow-hidden rounded-lg md:h-[285px] lg:w-[429px] lg:shrink-0 lg:rounded-3xl lg:rounded-tl-[260px]">
              <Image
                src={sideImageSrc}
                alt={sideImageAlt}
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden flex-col items-start gap-12 lg:flex lg:w-[310px] lg:shrink-0">
              <p className="text-body-2-desktop text-grey-600">{description}</p>
              <Link href={ctaHref} className="inline-block">
                <Button variant="secondary" size="lg">
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
      <div
        ref={rowRef}
        className="scrollbar-hidden mt-8 flex gap-4 overflow-x-auto pl-4 md:pl-8 lg:mt-12 lg:w-full lg:max-w-[1400px] lg:overflow-hidden lg:px-8 xl:mx-auto"
      >
        <div ref={trackRef} className="flex gap-4 lg:gap-6">
          {cards.map((card) => (
            <IconLinkCard
              key={card.title}
              icon={card.icon}
              title={card.title}
              description={card.description}
              linkLabel={card.linkLabel}
              href={card.href}
              headerLayout="stacked"
              titleClassName="text-title-0-mobile"
              className="w-[332px] shrink-0 items-start gap-15 lg:min-h-[285px] lg:w-[400px]"
            />
          ))}
        </div>
      </div>
      <LayoutWrapper>
        <Link href={ctaHref} className="mt-8 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            {ctaLabel}
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
