import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { getSectionContent } from '@/lib/get-section-content';

import type { AboutPageSection } from '@/api/services/about/about-page.service';

type AboutHistorySectionProps = {
  sections?: AboutPageSection[];
};

export default function AboutHistorySection({
  sections,
}: AboutHistorySectionProps) {
  const content = getSectionContent(sections, 'about_history');

  const heading =
    content?.heading || 'Rooted in Trust. Growing Through People.';
  const intro =
    content?.intro ||
    'For over three decades, Everest Bank has built a culture of integrity, collaboration, and service excellence that continues to drive its success.';
  const body =
    content?.body ||
    'Behind every milestone is a team dedicated to serving customers, supporting communities, and delivering exceptional banking experiences across Nepal.';
  const imageSrc = content?.image?.src || '/images/about/culture.jpg';
  const imageAlt =
    content?.image?.alt ||
    'A bank employee assisting a customer with a QR code payment';
  const ctaHref = content?.cta?.href || '#';
  const ctaLabel = content?.cta?.label || 'View Our History';

  return (
    <section className="w-full bg-white py-16 lg:pt-[120px] lg:pb-[60px]">
      <LayoutWrapper>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-12">
          <div className="flex flex-col items-start gap-6 lg:w-[429px] lg:shrink-0 lg:gap-8">
            <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 lg:max-w-[425px]">
              {heading}
            </h2>
            <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 lg:max-w-[396px]">
              {intro}
            </p>
          </div>

          <div className="flex flex-col gap-6 lg:flex-1 xl:flex-row xl:items-start xl:gap-12">
            <div className="relative h-[286px] w-full overflow-hidden rounded-lg md:h-[394px] lg:max-w-[429px] lg:rounded-3xl lg:rounded-tl-[260px]">
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                className="object-cover"
              />
            </div>

            <div className="flex flex-col items-start gap-10 lg:h-[394px] lg:w-[310px] lg:shrink-0 xl:justify-between">
              <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400 leading-[1.2] lg:leading-[1.32]">
                {body}
              </p>
              <Link href={ctaHref} className="w-full lg:w-auto">
                <Button
                  variant="secondary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px] lg:w-auto"
                >
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
