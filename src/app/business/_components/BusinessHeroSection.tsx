import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import HeroImageCarousel from '@/components/shared/HeroImageCarousel';
import Button from '@/components/ui/buttons/Button';
import { VerifiedIcon } from '@/components/icons';

import { businessHeroHighlights, businessHeroSlides } from '../_data';

export default function BusinessHeroSection() {
  return (
    <section className="w-full pt-6 lg:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-25">
          <HeroImageCarousel
            slides={businessHeroSlides}
            ariaLabel="Everest Bank business banking highlights"
            className="lg:order-2"
          />
          <div className="flex flex-col items-start lg:order-1 lg:h-127.5 lg:w-136 lg:shrink-0">
            <h1 className="font-heading text-grey-500 lg:text-display-1-desktop-md text-[36px] leading-[0.92] font-medium lg:order-1">
              Banking that grows
              <br />
              with your business
            </h1>
            <p className="text-body-2-desktop text-grey-400 hidden lg:order-2 lg:mt-8 lg:block">
              From your first business account to cross-border trade, Everest
              Bank gives Nepal&rsquo;s enterprises the financing, technology,
              and people to move faster and grow with confidence.
            </p>
            <div className="order-2 mt-4 flex flex-col items-start gap-3 lg:order-4 lg:mt-auto lg:gap-4">
              {businessHeroHighlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <VerifiedIcon className="size-4.5 shrink-0 text-red-500 lg:size-6" />
                  <p className="text-body-4-desktop text-grey-400 lg:text-body-2-desktop">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-3 mt-8 flex w-full flex-col gap-2 lg:order-3 lg:mt-6 lg:w-auto lg:flex-row lg:flex-wrap lg:gap-4">
              <Link href="#" className="w-full lg:w-auto">
                <Button
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-11.5 lg:w-auto"
                >
                  Open a Business Account
                </Button>
              </Link>
              <Link href="#" className="w-full lg:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-11.5 lg:w-auto"
                >
                  Talk to Relationship Manager
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
