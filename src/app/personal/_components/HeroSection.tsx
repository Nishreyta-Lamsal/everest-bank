import Link from 'next/link';

import HeroVideoPlayer from './HeroVideoPlayer';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import HeroImageCarousel from '@/components/shared/HeroImageCarousel';
import Button from '@/components/ui/buttons/Button';
import { ArrowUpRightIcon } from '@/components/icons';

import { heroSlides } from '../_data';

export default function HeroSection() {
  return (
    <section className="w-full pt-8 lg:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col-reverse gap-8 lg:flex-row lg:items-end lg:gap-6">
          <div className="flex flex-col gap-8 lg:h-[520px] lg:w-[620px] lg:shrink-0 lg:justify-between lg:gap-0">
            <div className="flex flex-col items-start gap-4 lg:gap-12">
              <h1 className="font-heading text-display-1-mobile-md text-grey-500 lg:text-display-1-desktop-md">
                Consistent, Strong
                <br />
                and Dependable
              </h1>
              <div className="flex flex-col items-start gap-4 lg:w-[470px]">
                <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop w-[316px] max-w-full lg:w-full">
                  Trusted banking solutions designed to help you save, grow, and
                  achieve your financial goals with confidence.
                </p>
                <Link href="#">
                  <Button size="lg" rightIcon={<ArrowUpRightIcon />}>
                    Open Your Account in 3 Minutes
                  </Button>
                </Link>
              </div>
            </div>
            <div className="flex w-full items-center gap-6">
              <HeroVideoPlayer />
              <div className="flex flex-col items-start gap-4 lg:h-[160px] lg:w-[405px] lg:shrink-0 lg:justify-between lg:gap-0 lg:bg-white lg:p-4">
                <p className="font-heading text-heading-h5-mobile text-grey-500 lg:text-heading-h5-desktop w-[240px] lg:w-[333px]">
                  Build healthy financial habits with secure and rewarding
                  savings solutions.
                </p>
                <Link
                  href="#"
                  className="text-body-4-desktop-md flex items-center justify-center gap-1 font-medium text-red-700"
                >
                  Start saving
                  <ArrowUpRightIcon className="size-[16px] shrink-0" />
                </Link>
              </div>
            </div>
          </div>
          <HeroImageCarousel
            slides={heroSlides}
            ariaLabel="Everest Bank customer highlights"
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
