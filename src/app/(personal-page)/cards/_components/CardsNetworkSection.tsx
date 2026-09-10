'use client';

import { icon } from '@/components/icons';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { useTextRevealOnScroll } from '@/hooks/animations/useTextRevealOnScroll';

export default function CardsNetworkSection() {
  const { sectionRef, textRef } = useTextRevealOnScroll();

  return (
    <section ref={sectionRef} className="w-full bg-white py-16 lg:py-32">
      <LayoutWrapper>
        <p
          ref={textRef}
          className="font-heading lg:text-heading-h1-desktop-md text-grey-200 mx-auto max-w-[360px] text-center text-[28px] leading-[130%] font-medium md:max-w-[600px] lg:max-w-[1095px]"
        >
          Every card is paired with a network
          <span className="mx-2 inline-flex size-[32px] items-center justify-center rounded-full bg-orange-500 p-2 align-middle lg:size-[60px] lg:p-2.5">
            <icon.network className="size-[18px] text-white lg:size-[34px]" />
          </span>
          built for where you spend so your
          <span className="mx-2 inline-flex size-[32px] items-center justify-center rounded-full bg-orange-500 p-2 align-middle lg:size-[60px] lg:p-2.5">
            <icon.savings className="size-[16px] text-white lg:size-[30px]" />
          </span>
          money moves the way you do, from Kathmandu to the world
        </p>
      </LayoutWrapper>
    </section>
  );
}
