'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import CarouselDots from '@/components/ui/carousel/CarouselDots';

import { cn } from '@/lib/utils';

type HeroImageCarouselSlide = {
  src: string;
  alt: string;
};

type HeroImageCarouselProps = {
  slides: HeroImageCarouselSlide[];
  ariaLabel: string;
  className?: string;
};

const AUTO_ADVANCE_DELAY = 5000;

export default function HeroImageCarousel({
  slides,
  ariaLabel,
  className,
}: HeroImageCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  function stopAutoAdvance() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  function startAutoAdvance() {
    stopAutoAdvance();

    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, AUTO_ADVANCE_DELAY);
  }

  useEffect(() => {
    startAutoAdvance();

    return stopAutoAdvance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides.length]);

  function goToSlide(index: number) {
    setActiveIndex(index);
    startAutoAdvance();
  }

  return (
    <div
      role="region"
      aria-label={ariaLabel}
      className={cn(
        'relative h-59.75 w-full overflow-hidden lg:h-67.75 lg:w-76 lg:shrink-0 xl:h-138 xl:w-155',
        className,
      )}
    >
      {slides.map((slide, index) => (
        <Image
          key={index}
          src={slide.src}
          alt={slide.alt}
          fill
          aria-hidden={index !== activeIndex}
          className={cn(
            'rounded-tl-xl rounded-tr-[64px] rounded-br-xl rounded-bl-xl object-cover transition-opacity duration-500 lg:rounded-tl-2xl lg:rounded-tr-[61px] lg:rounded-br-2xl lg:rounded-bl-2xl xl:rounded-tr-[124px]',
            index === activeIndex ? 'opacity-100' : 'opacity-0',
          )}
        />
      ))}
      <CarouselDots
        total={slides.length}
        activeIndex={activeIndex}
        onSelect={goToSlide}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 lg:bottom-6"
      />
    </div>
  );
}
