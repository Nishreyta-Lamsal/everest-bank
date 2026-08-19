import Image from 'next/image';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';

import {
  remittanceWhyImage,
  remittanceWhyStats,
} from '../_data/remittance-why';

export default function RemittanceWhySection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-10 lg:py-15">
      <LayoutWrapper>
        <div className="flex flex-col items-start gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex flex-col items-start gap-8 lg:h-[437px] lg:w-[556px] lg:justify-between lg:py-6">
            <div className="flex flex-col items-start gap-4 lg:gap-6">
              <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h3-desktop-md text-grey-500">
                Why Send Money Home With Everest Bank
              </h2>
              <p className="text-body-2-desktop text-grey-400">
                For decades, Everest Bank has helped Nepalese abroad support
                their families back home with a safe, formal channel, the right
                exchange rate, and a payout network that reaches every corner of
                the country.
              </p>
            </div>
            <div className="flex items-center gap-8 lg:gap-12">
              {remittanceWhyStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col items-start gap-4"
                >
                  <p className="font-heading text-heading-h2-mobile-sb lg:text-heading-h2-desktop-sb text-red-500">
                    {stat.value}
                  </p>
                  <p className="text-body-2-desktop text-grey-500">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <div className="relative h-[280px] w-full overflow-hidden rounded-lg lg:h-[437px] lg:w-[583px] lg:rounded-3xl lg:rounded-tl-[192px]">
            <Image
              src={remittanceWhyImage.src}
              alt={remittanceWhyImage.alt}
              fill
              className="object-cover"
            />
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
