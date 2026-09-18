'use client';

import { icon } from '@/components/icons';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { useTextRevealOnScroll } from '@/hooks/animations/useTextRevealOnScroll';

import { getSectionContent } from '@/lib/get-section-content';

import { iconMap } from '@/constants';

import type { CardsNetworkSegment } from '@/api/services/personal/card/card-page.service';
import type { CardPageSection } from '@/api/services/personal/card/card-page.service';

const fallbackSegments: CardsNetworkSegment[] = [
  { type: 'text', value: 'Every card is paired with a network' },
  { type: 'icon', icon: 'network' },
  { type: 'text', value: 'built for where you spend so your' },
  { type: 'icon', icon: 'savings' },
  {
    type: 'text',
    value: 'money moves the way you do, from Kathmandu to the world',
  },
];

type CardsNetworkSectionProps = {
  sections?: CardPageSection[];
};

export default function CardsNetworkSection({
  sections,
}: CardsNetworkSectionProps) {
  const { sectionRef, textRef } = useTextRevealOnScroll();

  const content = getSectionContent(sections, 'cards_network');
  const segments = content?.segments?.length
    ? content.segments
    : fallbackSegments;

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-32">
      <LayoutWrapper>
        <p
          ref={textRef}
          className="font-heading lg:text-heading-h1-desktop-md text-grey-200 mx-auto max-w-[360px] text-center text-[28px] leading-[130%] font-medium md:max-w-[600px] lg:max-w-[1095px]"
        >
          {segments.map((segment, index) => {
            if (segment.type === 'text') {
              return <span key={index}>{segment.value}</span>;
            }

            const Icon = iconMap[segment.icon] ?? icon.network;

            return (
              <span
                key={index}
                className="mx-2 inline-flex size-[32px] items-center justify-center rounded-full bg-orange-500 p-2 align-middle lg:size-[60px] lg:p-2.5"
              >
                <Icon className="size-[18px] text-white lg:size-[34px]" />
              </span>
            );
          })}
        </p>
      </LayoutWrapper>
    </section>
  );
}
