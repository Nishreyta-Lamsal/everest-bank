'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import CarouselDots from '@/components/ui/carousel/CarouselDots';

import { cn } from '@/lib/utils';

type StatBannerSlide = {
  src: string;
  alt: string;
};

type StatBannerProps = {
  images: StatBannerSlide[];
  title: string;
  description: string;
};

const AUTO_ADVANCE_DELAY = 5000;

export default function StatBanner({
  images,
  title,
  description,
}: StatBannerProps) {
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
      setActiveIndex((current) => (current + 1) % images.length);
    }, AUTO_ADVANCE_DELAY);
  }

  useEffect(() => {
    startAutoAdvance();

    return stopAutoAdvance;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [images.length]);

  function goToSlide(index: number) {
    setActiveIndex(index);
    startAutoAdvance();
  }

  return (
    <section className="relative flex w-full flex-col xl:flex-row">
      <div className="relative h-99 overflow-hidden bg-[#b41518] xl:h-133 xl:flex-708 xl:bg-red-500">
        <Image
          src="/icons/trust/mountain-outline.svg"
          alt="Mountain outline"
          width={839}
          height={336}
          className="absolute -right-1.5 -bottom-1.5 h-40.25 w-auto max-w-none md:h-[63.02%] xl:right-0 xl:bottom-0.5"
        />
      </div>
      <div
        role="region"
        aria-label={`${title} ${description}`}
        className="relative h-73.25 overflow-hidden md:h-133 xl:flex-732"
      >
        {images.map((image, index) => (
          <Image
            key={index}
            src={image.src}
            alt={image.alt}
            fill
            aria-hidden={index !== activeIndex}
            className={cn(
              'object-cover transition-opacity duration-500',
              index === activeIndex ? 'opacity-100' : 'opacity-0',
            )}
          />
        ))}
        <CarouselDots
          total={images.length}
          activeIndex={activeIndex}
          onSelect={goToSlide}
          className="absolute bottom-6 left-1/2 z-10 -translate-x-1/2"
        />
      </div>
      <div className="pointer-events-none absolute inset-0">
        <LayoutWrapper>
          <div className="relative h-99 xl:h-133">
            <p className="font-heading text-display-0-mobile-md xl:text-display-0-desktop-md absolute top-0 left-0 text-white uppercase">
              {title}
            </p>
            <p className="font-heading text-display-2-mobile-md xl:text-display-3-desktop-md absolute top-28.75 left-4 whitespace-nowrap text-white xl:top-[93.77%] xl:left-24">
              {description}
            </p>
          </div>
        </LayoutWrapper>
      </div>
    </section>
  );
}
