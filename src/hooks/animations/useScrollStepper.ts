import { useRef, useState } from 'react';

import { gsap, ScrollTrigger, useGSAP } from '@/lib/gsap';

import { useIsPreviewFrame } from '@/store/PreviewFrameContext';

const STEP_SCROLL_DISTANCE = 500;

export function useScrollStepper(stepCount: number) {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const isPreviewFrame = useIsPreviewFrame();

  useGSAP(
    () => {
      // Pinning reserves scroll distance against the main window, which the
      // preview iframe doesn't have, it would only show up as dead space.
      if (isPreviewFrame) return;

      const mm = gsap.matchMedia();

      mm.add('(min-width: 1024px)', () => {
        if (!sectionRef.current) return;

        const trigger = ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 6%',
          end: `+=${STEP_SCROLL_DISTANCE * (stepCount - 1)}`,
          pin: true,
          scrub: true,
          snap: 1 / (stepCount - 1),
          onUpdate: (self) => {
            setActiveIndex(Math.round(self.progress * (stepCount - 1)));
          },
        });

        scrollTriggerRef.current = trigger;

        return () => {
          scrollTriggerRef.current = null;
        };
      });

      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [stepCount, isPreviewFrame] },
  );

  function handleSelect(index: number) {
    const trigger = scrollTriggerRef.current;

    if (!trigger) {
      setActiveIndex(index);
      return;
    }

    const progress = index / (stepCount - 1);
    trigger.scroll(trigger.start + progress * (trigger.end - trigger.start));
  }

  return { sectionRef, activeIndex, onSelect: handleSelect };
}
