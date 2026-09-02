'use client';

import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import StepList from './StepList';
import Button from '@/components/ui/buttons/Button';

import { useScrollStepper } from '@/hooks/animations/useScrollStepper';

import type { StepEntry } from '@/types';

type StepSectionProps = {
  heading: string;
  steps: StepEntry[];
  ctaLabel: string;
  ctaHref?: string;
};

export default function StepSection({
  heading,
  steps,
  ctaLabel,
  ctaHref = '#',
}: StepSectionProps) {
  const { sectionRef, activeIndex, onSelect } = useScrollStepper(steps.length);
  const activeStep = steps[activeIndex];

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h4-desktop-md text-grey-500 w-full lg:w-[640px]">
              {heading}
            </h2>
            <Link href={ctaHref} className="hidden lg:inline-block">
              <Button variant="secondary" size="md">
                {ctaLabel}
              </Button>
            </Link>
          </div>

          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <StepList
              steps={steps}
              activeIndex={activeIndex}
              onSelect={onSelect}
            />
            <div className="relative order-1 h-[239px] w-full shrink-0 overflow-hidden rounded-lg md:h-[380px] lg:order-2 lg:h-[437px] lg:w-[583px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image
                key={activeStep.image}
                src={activeStep.image}
                alt={activeStep.alt}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          <Link href={ctaHref} className="w-full lg:hidden">
            <Button variant="secondary" size="sm" className="w-full">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
    </section>
  );
}
