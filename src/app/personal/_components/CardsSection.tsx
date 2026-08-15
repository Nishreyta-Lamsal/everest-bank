import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { cardTiles } from '../_data';

export default function CardsSection() {
  return (
    <section className="bg-grey-bluish-grey w-full py-16 lg:py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-8 lg:grid lg:grid-cols-[1fr_auto] lg:items-end lg:gap-x-6 lg:gap-y-12">
          <h2 className="font-heading text-heading-h2-mobile-md text-grey-500 lg:text-heading-h2-desktop-md order-1 lg:order-0 lg:w-[581px]">
            {'Pay Smarter, Earn More, '}
            <br />
            Bank Better.
          </h2>
          <Link
            href="#"
            className="order-3 block w-full lg:order-0 lg:inline-block lg:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full lg:w-auto">
              Know more about the cards
            </Button>
          </Link>
          <div className="order-2 flex w-full flex-col gap-8 lg:order-0 lg:col-span-2 lg:flex-row lg:items-center lg:gap-10">
            {cardTiles.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  'relative h-[239px] w-full overflow-hidden rounded-lg md:h-[324px]',
                  card.roundedCorner === 'right'
                    ? 'lg:rounded-tr-[120px]'
                    : 'lg:rounded-tl-[120px]',
                )}
              >
                <Image
                  src="/images/cards/card-showcase-bg.png"
                  alt=""
                  fill
                  className="object-cover object-bottom"
                />
                <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)]" />
                <div className="absolute top-45.75 left-4 w-[238px] lg:inset-x-6 lg:top-60.5 lg:flex lg:w-auto lg:items-center lg:justify-between">
                  <h3 className="font-heading text-heading-h3-mobile lg:text-heading-h3-desktop text-white lg:w-[366px]">
                    {card.title}
                  </h3>
                  <ArrowUpRightIcon className="hidden size-[32px] shrink-0 text-white lg:block" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
