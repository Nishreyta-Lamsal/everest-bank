'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import CarouselDots from '@/components/ui/carousel/CarouselDots';

import { cn } from '@/lib/utils';

const SLIDES = [
  {
    src: '/images/hero/hero-card-photo.png',
    alt: 'A customer holding an Everest Bank card',
  },
  {
    src: '/images/hero/hero-card-photo.png',
    alt: 'A customer holding an Everest Bank card',
  },
  {
    src: '/images/hero/hero-card-photo.png',
    alt: 'A customer holding an Everest Bank card',
  },
  {
    src: '/images/hero/hero-card-photo.png',
    alt: 'A customer holding an Everest Bank card',
  },
  {
    src: '/images/hero/hero-card-photo.png',
    alt: 'A customer holding an Everest Bank card',
  },
];

const AUTO_ADVANCE_DELAY = 5000;

export default function HeroImageCarousel() {
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
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTO_ADVANCE_DELAY);
  }

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTO_ADVANCE_DELAY);

    return function cleanup() {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  function goToSlide(index: number) {
    setActiveIndex(index);
    startAutoAdvance();
  }

  return (
    <div
      role="region"
      aria-label="Everest Bank customer highlights"
      className="relative h-59.75 w-full overflow-hidden lg:h-67.75 lg:w-76 lg:shrink-0 xl:h-138 xl:w-155"
    >
      {SLIDES.map((slide, index) => (
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
        total={SLIDES.length}
        activeIndex={activeIndex}
        onSelect={goToSlide}
        className="absolute bottom-4 left-1/2 z-10 -translate-x-1/2 lg:bottom-6"
      />
    </div>
  );
}
