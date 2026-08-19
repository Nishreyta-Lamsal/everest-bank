import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { digitalBankingFeatures } from '../_data';

export default function BusinessDigitalBankingSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:pt-8 lg:pb-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-10">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 w-full lg:hidden">
            Run your business banking from one dashboard.
          </h2>

          <div className="flex w-full flex-col items-start gap-8 lg:flex-row lg:items-center lg:gap-22">
            <div className="relative h-[239px] w-full overflow-hidden rounded-lg md:h-[426px] lg:w-full lg:max-w-[620px]">
              <Image
                src="/images/business/digital-banking.png"
                alt="A relationship manager holding a laptop, giving a thumbs up"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex w-full flex-col items-start gap-10 lg:h-[362px] lg:w-[556px] lg:justify-between">
              <div className="flex flex-col items-start gap-6 lg:gap-8">
                <h2 className="font-heading text-heading-h2-desktop-md text-grey-500 hidden lg:block">
                  Run your business banking from one dashboard.
                </h2>
                <div className="flex flex-col items-start gap-6 lg:gap-8">
                  {digitalBankingFeatures.map(({ icon: Icon, label }) => (
                    <div
                      key={label}
                      className="flex items-center gap-4 lg:gap-2"
                    >
                      <Icon className="size-[22px] shrink-0 text-orange-500 lg:size-[24px]" />
                      <p className="font-heading text-title-2-desktop md:text-heading-h4-desktop text-grey-500">
                        {label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <Link href="#" className="block w-full">
                <Button
                  variant="secondary"
                  size="sm"
                  className="lg:text-body-3-desktop-md w-full lg:h-[46px]"
                >
                  Explore digital business banking
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
