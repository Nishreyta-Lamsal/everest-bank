import Image from 'next/image';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { ArrowUpRightIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import { cardTiles } from '../_data';

export default function CardsSection() {
  return (
    <section className="w-full py-15">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-12">
          <div className="flex w-full items-end justify-between">
            <p className="font-heading text-heading-h1-desktop-md text-grey-500 w-145.25">
              {'Pay Smarter, Earn More, '}
              <br />
              Bank Better.
            </p>
            <Link href="#">
              <Button variant="secondary" size="md">
                Know more about the cards
              </Button>
            </Link>
          </div>
          <div className="flex w-full items-center gap-10">
            {cardTiles.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className={cn(
                  'relative h-81 w-full overflow-hidden rounded-lg',
                  card.roundedCorner === 'right'
                    ? 'rounded-tr-[120px]'
                    : 'rounded-tl-[120px]',
                )}
              >
                <Image
                  src="/images/cards/card-showcase-bg.png"
                  alt=""
                  fill
                  className="object-cover object-bottom"
                />
                <div className="bg-gradient-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)] absolute inset-0" />
                <div className="absolute inset-x-6 top-60.5 flex items-center justify-between">
                  <p className="font-heading text-heading-h2-desktop text-white w-91.5">
                    {card.title}
                  </p>
                  <ArrowUpRightIcon className="text-white size-8 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </LayoutWrapper>
    </section>
  );
}
