import HeroImageCarousel from '@/components/shared/HeroImageCarousel';
import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import TextField from '@/components/ui/inputs/TextField';
import Button from '@/components/ui/buttons/Button';

import { getSectionContent } from '@/lib/get-section-content';

import { remittanceHeroSlides } from '../_data/remittance-hero';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

type RemittanceHeroSectionProps = {
  sections?: RemittancePageSection[];
};

export default function RemittanceHeroSection({
  sections,
}: RemittanceHeroSectionProps) {
  const content = getSectionContent(sections, 'remittance_hero');

  const slides = content?.slides || remittanceHeroSlides;
  const headline =
    content?.headline || 'Simple & Convenient Remittance Solution';
  const subtext =
    content?.subtext ||
    'From your first business account to cross-border trade, Everest Bank gives Nepal’s enterprises the financing, technology, and people to move faster and grow with confidence.';
  const trackingPlaceholder =
    content?.tracking?.placeholder || 'Enter Remit Number';
  const trackingAriaLabel =
    content?.tracking?.aria_label || 'Remit tracking number';
  const trackingButtonLabel =
    content?.tracking?.button_label || 'Track Remit Number';
  const trackingHint =
    content?.tracking?.hint || 'Use 8-14 digit tracking number';
  const carouselAriaLabel =
    content?.carousel_aria_label || 'Everest Bank remittance highlights';

  return (
    <section className="w-full pt-6 lg:pt-15">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-6">
          <HeroImageCarousel
            slides={slides}
            ariaLabel={carouselAriaLabel}
            className="lg:order-2"
          />
          <div className="flex flex-col items-start gap-8 lg:order-1 lg:h-[449px] lg:w-[620px] lg:shrink-0 lg:justify-between">
            <div className="flex flex-col items-start gap-4 lg:gap-8">
              <h1 className="font-heading text-display-1-mobile-md lg:text-display-1-desktop-md text-grey-500 lg:max-w-[576px]">
                {headline}
              </h1>
              <p className="text-body-1-mobile text-grey-400 hidden lg:block">
                {subtext}
              </p>
            </div>

            <div className="bg-grey-bluish-grey flex w-full max-w-[560px] flex-col items-end gap-3 rounded-2xl p-4 lg:gap-4 lg:p-6">
              <div className="flex w-full flex-col items-start gap-3 lg:gap-4">
                <TextField
                  type="text"
                  placeholder={trackingPlaceholder}
                  aria-label={trackingAriaLabel}
                />
                <Button
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px]"
                >
                  {trackingButtonLabel}
                </Button>
              </div>
              <p className="text-caption-1 lg:text-body-4-desktop text-grey-400">
                {trackingHint}
              </p>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
