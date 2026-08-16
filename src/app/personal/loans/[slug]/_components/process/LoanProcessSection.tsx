'use client';

import { useRef, useState } from 'react';

import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import LoanProcessList from './LoanProcessList';
import Button from '@/components/ui/buttons/Button';
import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

import { loanProcessSteps } from '../../_data';

const STEP_SCROLL_DISTANCE = 500;

export default function LoanProcessSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const activeStep = loanProcessSteps[activeIndex];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!sectionRef.current) return;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 18%',
          end: `+=${STEP_SCROLL_DISTANCE * (loanProcessSteps.length - 1)}`,
          pin: true,
          scrub: true,
          snap: 1 / (loanProcessSteps.length - 1),
          onUpdate: (self) => {
            setActiveIndex(
              Math.round(self.progress * (loanProcessSteps.length - 1)),
            );
          },
        });

        scrollTriggerRef.current = trigger;

        return () => {
          scrollTriggerRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef },
  );

  function handleSelect(index: number) {
    const trigger = scrollTriggerRef.current;

    if (!trigger) {
      setActiveIndex(index);
      return;
    }

    const progress = index / (loanProcessSteps.length - 1);
    trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
  }

  return (
    <section ref={sectionRef} className="w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10 lg:gap-12">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500 w-full lg:w-[640px]">
              From application to cultivation, a simple path forward.
            </h2>
            <Link href="#" className="hidden lg:inline-block">
              <Button variant="secondary" size="md">
                Apply for loan
              </Button>
            </Link>
          </div>

          <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
            <LoanProcessList
              steps={loanProcessSteps}
              activeIndex={activeIndex}
              onSelect={handleSelect}
            />
            <div className="relative order-1 h-[239px] w-full shrink-0 overflow-hidden rounded-lg md:h-[380px] lg:order-2 lg:h-[384px] lg:w-[513px] lg:rounded-3xl lg:rounded-tl-[192px]">
              <Image
                key={activeStep.image}
                src={activeStep.image}
                alt={activeStep.alt}
                fill
                className="object-cover transition-opacity duration-300"
              />
            </div>
          </div>

          <Link href="#" className="w-full lg:hidden">
            <Button variant="secondary" size="sm" className="w-full">
              Apply for loan
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
    </section>
  );
}
