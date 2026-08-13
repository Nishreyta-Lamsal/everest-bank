import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, PlayIcon } from '@/components/icons';
import { buttonClasses } from '@/components/ui/buttons/Button';
import CarouselDots from '@/components/ui/carousel/CarouselDots';

export default function HeroSection() {
  return (
    <section className="w-full pt-6 xl:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col-reverse gap-8 xl:flex-row xl:items-end xl:gap-6">
          <div className="flex flex-col gap-8 xl:h-130 xl:w-155 xl:shrink-0 xl:justify-between xl:gap-0">
            <div className="flex flex-col items-start gap-4 xl:gap-12">
              <h1 className="font-heading text-display-1-mobile-md text-grey-500 xl:text-display-1-desktop-md">
                Consistent, Strong
                <br />
                and Dependable
              </h1>
              <div className="flex flex-col items-start gap-4 xl:w-117.5">
                <p className="text-body-2-mobile text-grey-400 xl:text-body-2-desktop w-79 max-w-full xl:w-full">
                  Trusted banking solutions designed to help you save, grow, and
                  achieve your financial goals with confidence.
                </p>
                <Link
                  href="#"
                  className={buttonClasses({
                    variant: 'primary',
                    size: 'lg',
                    className: 'h-[42px] xl:h-[46px]',
                  })}
                >
                  Open Your Account in 3 Minutes
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center gap-6">
              <div className="relative size-20 shrink-0 xl:size-41.5">
                <Image
                  src="/images/hero/savings-video-thumbnail.png"
                  alt="Watch how EBL Touch makes saving easy"
                  fill
                  className="rounded-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Play video"
                  className="absolute inset-0 m-auto flex size-4 items-center justify-center text-white backdrop-blur-xs xl:size-8"
                >
                  <PlayIcon className="size-4 xl:size-8" />
                </button>
              </div>
              <div className="flex flex-col items-start gap-4 xl:h-40 xl:w-101.25 xl:shrink-0 xl:justify-between xl:gap-0 xl:bg-white xl:p-4">
                <p className="font-heading text-heading-h4-mobile text-grey-500 xl:text-heading-h4-desktop w-60 xl:w-83.25">
                  Build healthy financial habits with secure and rewarding
                  savings solutions.
                </p>
                <Link
                  href="#"
                  className="text-body-4-desktop-md flex items-center justify-center gap-1 font-medium text-red-700"
                >
                  Start saving
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-59.75 w-full xl:h-138 xl:w-155 xl:shrink-0">
            <Image
              src="/images/hero/hero-card-photo.png"
              alt="A customer holding an Everest Bank card"
              fill
              className="rounded-tl-xl rounded-tr-[64px] rounded-br-xl rounded-bl-xl object-cover xl:rounded-tl-2xl xl:rounded-tr-[124px] xl:rounded-br-2xl xl:rounded-bl-2xl"
            />
            <CarouselDots
              total={5}
              activeIndex={0}
              className="absolute bottom-4 left-1/2 -translate-x-1/2 xl:bottom-6"
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
