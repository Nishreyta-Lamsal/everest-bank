import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { loanCards } from '../_data';

export default function LoansSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 xl:grid xl:grid-cols-[1fr_auto] xl:items-end xl:gap-x-6 xl:gap-y-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h1-desktop-md order-1 xl:order-0 xl:w-145.25">
            Financial support designed around life&rsquo;s biggest milestones.
          </h2>
          <Link
            href="#"
            className="order-3 block w-full xl:order-0 xl:inline-block xl:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full xl:w-auto">
              See more about loans
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-8 xl:order-0 xl:col-span-2 xl:flex-row xl:items-start xl:gap-10">
            {loanCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="flex flex-col items-start overflow-hidden rounded-lg xl:flex-1 xl:first:rounded-tl-[88px] xl:last:rounded-tr-[88px]"
              >
                <div className="relative h-44.75 w-full overflow-hidden md:h-65.75">
                  {card.zoomed ? (
                    <Image
                      src={card.image}
                      alt={card.alt}
                      width={card.imageWidth}
                      height={card.imageHeight}
                      className="absolute top-[-49.72%] left-0 h-[299.16%] w-full max-w-none xl:top-[-34.5%] xl:h-[225.1%]"
                    />
                  ) : (
                    <Image
                      src={card.image}
                      alt={card.alt}
                      fill
                      className="object-cover"
                    />
                  )}
                </div>
                <div className="flex w-full flex-col items-start gap-6 bg-white p-4 xl:h-40 xl:justify-between xl:gap-0 xl:p-6">
                  <h3 className="font-heading text-heading-h3-mobile text-grey-500 xl:text-heading-h4-desktop">
                    {card.title}
                  </h3>
                  <span className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 xl:underline">
                    Apply now
                    <ArrowUpRightIcon className="size-4 shrink-0" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
