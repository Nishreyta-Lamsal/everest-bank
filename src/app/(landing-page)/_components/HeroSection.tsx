import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon, PlayIcon } from '@/components/icons';
import { buttonClasses } from '@/components/ui/buttons/Button';
import CarouselDots from '@/components/ui/carousel/CarouselDots';

export default function HeroSection() {
  return (
    <section className="w-full pt-15">
      <LayoutWrapper>
        <div className="flex items-end gap-6">
          <div className="flex h-130 w-155 shrink-0 flex-col items-start justify-between">
            <div className="flex flex-col items-start gap-12">
              <h1 className="font-heading text-display-1-desktop-md text-grey-500">
                Consistent, Strong
                <br />
                and Dependable
              </h1>
              <div className="flex w-117.5 flex-col items-start gap-4">
                <p className="text-body-2-desktop text-grey-400">
                  Trusted banking solutions designed to help you save, grow, and
                  achieve your financial goals with confidence.
                </p>
                <Link
                  href="#"
                  className={buttonClasses({ variant: 'primary', size: 'lg' })}
                >
                  Open Your Account in 3 Minutes
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center gap-6">
              <div className="relative size-41.5 shrink-0">
                <Image
                  src="/images/hero/savings-video-thumbnail.png"
                  alt="Watch how EBL Touch makes saving easy"
                  fill
                  className="rounded-full object-cover"
                />
                <button
                  type="button"
                  aria-label="Play video"
                  className="text-white absolute inset-0 m-auto flex size-8 items-center justify-center backdrop-blur-xs"
                >
                  <PlayIcon width={32} height={32} />
                </button>
              </div>
              <div className="bg-white flex h-40 w-101.25 shrink-0 flex-col items-start justify-between p-4">
                <p className="font-heading text-heading-h4-desktop text-grey-500 w-83.25">
                  Build healthy financial habits with secure and rewarding
                  savings solutions.
                </p>
                <Link
                  href="#"
                  className="text-red-700 flex items-center justify-center gap-1 text-body-4-desktop-md font-medium"
                >
                  Start saving
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            </div>
          </div>
          <div className="relative h-138 w-155 shrink-0">
            <Image
              src="/images/hero/hero-card-photo.png"
              alt="A customer holding an Everest Bank card"
              fill
              className="rounded-bl-2xl rounded-tl-2xl rounded-br-2xl rounded-tr-[124px] object-cover"
            />
            <CarouselDots
              total={5}
              activeIndex={0}
              className="absolute bottom-6 left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
