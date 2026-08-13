import Link from 'next/link';

import HeroImageCarousel from './HeroImageCarousel';
import HeroVideoPlayer from './HeroVideoPlayer';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import { buttonClasses } from '@/components/ui/buttons/Button';

export default function HeroSection() {
  return (
    <section className="w-full pt-6 lg:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:gap-6">
          <div className="flex flex-col gap-8 lg:h-130 lg:w-155 lg:shrink-0 lg:justify-between lg:gap-0">
            <div className="flex flex-col items-start gap-4 lg:gap-12">
              <h1 className="font-heading text-display-1-mobile-md text-grey-500 lg:text-display-1-desktop-md">
                Consistent, Strong
                <br />
                and Dependable
              </h1>
              <div className="flex flex-col items-start gap-4 lg:w-117.5">
                <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop w-79 max-w-full lg:w-full">
                  Trusted banking solutions designed to help you save, grow, and
                  achieve your financial goals with confidence.
                </p>
                <Link
                  href="#"
                  className={buttonClasses({
                    variant: 'primary',
                    size: 'lg',
                    className: 'h-[42px] lg:h-[46px]',
                  })}
                >
                  Open Your Account in 3 Minutes
                  <ArrowUpRightIcon className="size-4 shrink-0" />
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center gap-6">
              <HeroVideoPlayer />
              <div className="flex flex-col items-start gap-4 lg:h-40 lg:w-101.25 lg:shrink-0 lg:justify-between lg:gap-0 lg:bg-white lg:p-4">
                <p className="font-heading text-heading-h4-mobile text-grey-500 lg:text-heading-h4-desktop w-60 lg:w-83.25">
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
          <HeroImageCarousel />
        </div>
      </LayoutWrapper>
    </section>
  );
}
