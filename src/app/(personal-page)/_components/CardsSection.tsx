import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { cardTiles } from '../_data';

export default function CardsSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 xl:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 xl:grid xl:grid-cols-[1fr_auto] xl:items-end xl:gap-x-6 xl:gap-y-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 xl:text-heading-h1-desktop-md order-1 xl:order-0 xl:w-145.25">
            {'Pay Smarter, Earn More, '}
            <br />
            Bank Better.
          </h2>
          <Link
            href="#"
            className="order-3 block w-full xl:order-0 xl:inline-block xl:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full xl:w-auto">
              Know more about the cards
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-8 xl:order-0 xl:col-span-2 xl:flex-row xl:items-center xl:gap-10">
            {cardTiles.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  'relative h-59.75 w-full overflow-hidden rounded-lg md:h-81',
                  card.roundedCorner === 'right'
                    ? 'xl:rounded-tr-[120px]'
                    : 'xl:rounded-tl-[120px]',
                )}
              >
                <Image
                  src="/images/cards/card-showcase-bg.png"
                  alt=""
                  fill
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)]" />
                <div className="absolute top-45.75 left-4 w-59.5 xl:inset-x-6 xl:top-60.5 xl:flex xl:w-auto xl:items-center xl:justify-between">
                  <h3 className="font-heading text-heading-h3-mobile xl:text-heading-h2-desktop text-white xl:w-91.5">
                    {card.title}
                  </h3>
                  <ArrowUpRightIcon className="hidden size-8 shrink-0 text-white xl:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
