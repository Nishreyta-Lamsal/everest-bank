'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { gsap, useGSAP } from '@/lib/gsap';

import { businessIndustryCards } from '../_data';

export default function BusinessIndustriesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const rowRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
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
    { scope: sectionRef },
  );

  return (
    <section ref={sectionRef} className="w-full py-16 lg:pt-30 lg:pb-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md w-full lg:w-[425px]">
            Specialists in the sectors that move Nepal&rsquo;s economy.
          </h2>
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
            <div className="relative h-[272px] w-full overflow-hidden rounded-lg md:h-[285px] lg:w-[429px] lg:shrink-0 lg:rounded-3xl lg:rounded-tl-[260px]">
              <Image
                src="/images/business/industries-photo.png"
                alt="A relationship manager assisting a business owner at their warehouse desk"
                fill
                className="object-cover"
              />
            </div>
            <div className="hidden flex-col items-start gap-12 lg:flex lg:w-[310px] lg:shrink-0">
              <p className="text-body-2-desktop text-grey-600">
                From manufacturing and trade to hospitality, construction, and
                technology, our banking solutions are tailored to the unique
                needs of your industry.
              </p>
              <Link href="#" className="inline-block">
                <Button variant="secondary" size="lg">
                  Explore Industry Solutions
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
          {businessIndustryCards.map((card) => (
            <div
              key={card.title}
              className="bg-grey-bluish-grey flex w-[332px] shrink-0 flex-col items-start justify-between gap-8 rounded-lg px-4 py-6 lg:min-h-[285px] lg:w-[400px] lg:p-6"
            >
              <div className="flex flex-col items-start gap-4">
                <card.icon className="size-[32px] shrink-0 text-orange-500 lg:size-[48px]" />
                <h3 className="font-heading text-heading-h4-desktop text-grey-500">
                  {card.title}
                </h3>
                <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop">
                  {card.description}
                </p>
              </div>
              <Link
                href={card.href}
                className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline"
              >
                {card.linkLabel}
                <ArrowUpRightIcon className="size-[16px] shrink-0" />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <LayoutWrapper>
        <Link href="#" className="mt-8 block w-full lg:hidden">
          <Button variant="secondary" size="sm" className="w-full">
            Explore Industry Solutions
          </Button>
        </Link>
      </LayoutWrapper>
    </section>
  );
}
