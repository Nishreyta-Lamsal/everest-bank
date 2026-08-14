import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';

import { digitalBankingFeatures } from '../_data';

export default function BusinessDigitalBankingSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 xl:pt-8 xl:pb-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-8 xl:flex-row xl:items-center xl:gap-22">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 w-full xl:hidden">
            Run your business banking from one dashboard.
          </h2>

          <div className="relative h-59.75 w-full overflow-hidden rounded-lg md:h-106.5 xl:w-155 xl:shrink-0">
            <Image
              src="/images/business/digital-banking.png"
              alt="A relationship manager holding a laptop, giving a thumbs up"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex w-full flex-col items-start gap-10 xl:h-90.5 xl:w-139 xl:justify-between">
            <div className="flex flex-col items-start gap-6 xl:gap-8">
              <h2 className="font-heading text-heading-h2-desktop-md text-grey-500 hidden xl:block">
                Run your business banking from one dashboard.
              </h2>
              <div className="flex flex-col items-start gap-6">
                {digitalBankingFeatures.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-4 xl:gap-2">
                    <Icon className="size-6 shrink-0 text-orange-500" />
                    <p className="font-heading text-title-2-mobile md:text-heading-h4-desktop text-grey-500">
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
                className="xl:text-body-3-desktop-md w-full xl:h-11.5"
              >
                Explore digital business banking
              </Button>
            </Link>
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
