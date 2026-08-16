import { useRef } from 'react';

import { gsap, SplitText, useGSAP } from '@/lib/gsap';

export function useTextRevealOnScroll(
  revealColor: string = 'var(--color-grey-500)',
  start: string = 'top 65%',
) {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);

  useGSAP(
    () => {
      if (!textRef.current) return;

      const split = SplitText.create(textRef.current, {
        type: 'words',
        wordsClass: 'word',
      });

      gsap.to(split.words, {
        color: revealColor,
        stagger: 0.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: start,
        },
      });

      return () => split.revert();
    },
    { scope: sectionRef },
  );

  return { sectionRef, textRef };
}
