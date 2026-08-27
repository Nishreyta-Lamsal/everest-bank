import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import HeroImageCarousel from '@/components/shared/HeroImageCarousel';
import Button from '@/components/ui/buttons/Button';
import { VerifiedIcon } from '@/components/icons';

import { getSectionContent } from '@/lib/get-section-content';

import { businessHeroHighlights, businessHeroSlides } from '../_data';

import type { BusinessPageSection } from '@/api/services/business/business-page.service';

type BusinessHeroSectionProps = {
  sections?: BusinessPageSection[];
};

export default function BusinessHeroSection({
  sections,
}: BusinessHeroSectionProps) {
  const content = getSectionContent(sections, 'business_hero');

  const slides = content?.slides || businessHeroSlides;
  const headlineLines = content?.headline_lines || [
    'Banking that grows',
    'with your business',
  ];
  const subtext =
    content?.subtext ||
    'From your first business account to cross-border trade, Everest Bank gives Nepal’s enterprises the financing, technology, and people to move faster and grow with confidence.';
  const highlights = content?.highlights || businessHeroHighlights;
  const primaryButtonHref = content?.primary_button?.href || '#';
  const primaryButtonLabel =
    content?.primary_button?.label || 'Open a Business Account';
  const secondaryButtonHref = content?.secondary_button?.href || '#';
  const secondaryButtonLabel =
    content?.secondary_button?.label || 'Talk to Relationship Manager';
  const carouselAriaLabel =
    content?.carousel_aria_label || 'Everest Bank business banking highlights';

  return (
    <section className="w-full pt-8 lg:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:gap-25">
          <HeroImageCarousel
            slides={slides}
            ariaLabel={carouselAriaLabel}
            className="lg:order-2"
          />
          <div className="flex flex-col items-start lg:order-1 lg:h-[510px] lg:w-[544px] lg:shrink-0">
            <h1 className="font-heading text-display-1-mobile-md text-grey-500 lg:text-display-1-desktop-md lg:order-1">
              {headlineLines.map((line, index) => (
                <span key={line}>
                  {index > 0 && <br />}
                  {line}
                </span>
              ))}
            </h1>
            <p className="text-body-2-desktop text-grey-400 hidden lg:order-2 lg:mt-8 lg:block">
              {subtext}
            </p>
            <div className="order-2 mt-4 flex flex-col items-start gap-3 lg:order-4 lg:mt-auto lg:gap-4">
              {highlights.map((highlight) => (
                <div key={highlight} className="flex items-center gap-2">
                  <VerifiedIcon className="size-[18px] shrink-0 text-red-500 lg:size-[24px]" />
                  <p className="text-body-4-desktop text-grey-400 lg:text-body-2-desktop">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
            <div className="order-3 mt-8 flex w-full flex-col gap-2 lg:order-3 lg:mt-6 lg:w-auto lg:flex-row lg:flex-wrap lg:gap-4">
              <Link href={primaryButtonHref} className="w-full lg:w-auto">
                <Button
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
                >
                  {primaryButtonLabel}
                </Button>
              </Link>
              <Link href={secondaryButtonHref} className="w-full lg:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
                >
                  {secondaryButtonLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
