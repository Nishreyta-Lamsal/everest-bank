import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import { getSectionContent } from '@/lib/get-section-content';

import {
  remittanceWhyImage,
  remittanceWhyStats,
} from '../_data/remittance-why';

import type { RemittancePageSection } from '@/api/services/remittance/remittance-page.service';

type RemittanceWhySectionProps = {
  sections?: RemittancePageSection[];
};

export default function RemittanceWhySection({
  sections,
}: RemittanceWhySectionProps) {
  const content = getSectionContent(sections, 'remittance_why');

  const heading = content?.heading || 'Why Send Money Home With Everest Bank';
  const description =
    content?.description ||
    'For decades, Everest Bank has helped Nepalese abroad support their families back home with a safe, formal channel, the right exchange rate, and a payout network that reaches every corner of the country.';
  const imageSrc = content?.image?.src || remittanceWhyImage.src;
  const imageAlt = content?.image?.alt || remittanceWhyImage.alt;
  const stats = content?.stats || remittanceWhyStats;

  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col items-start gap-10 lg:h-[437px] lg:w-[556px] lg:justify-between lg:gap-8 lg:py-6">
            <div className="flex flex-col items-start gap-10 lg:gap-6">
              <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md text-grey-500 max-w-[325px] lg:max-w-[550px]">
                {heading}
              </h2>
              <div className="relative h-[286px] w-full overflow-hidden rounded-lg lg:hidden">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-400">
                {description}
              </p>
            </div>
            <div className="flex flex-col items-start gap-10 lg:flex-row lg:items-center lg:gap-12">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-3 lg:gap-4"
                >
                  <p className="font-heading text-heading-h3-mobile-md lg:text-display-2-desktop-md text-red-500">
                    {stat.value}
                  </p>
                  <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative hidden h-[437px] w-[583px] overflow-hidden rounded-3xl rounded-tl-[192px] lg:block">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
