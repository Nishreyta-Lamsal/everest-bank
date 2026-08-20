import Image from 'next/image';
import Link from 'next/link';

import { CircleCheckIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { cn } from '@/lib/utils';

import type { CardOffer } from '../../_data';

type CardOfferItemProps = {
  offer: CardOffer;
  reversed?: boolean;
};

export default function CardOfferItem({
  offer,
  reversed = false,
}: CardOfferItemProps) {
  return (
    <div
      className={cn(
        'flex w-full flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-16',
        reversed && 'lg:flex-row-reverse',
      )}
    >
      <div className="relative order-1 h-[226px] w-full max-w-[530px] shrink-0 overflow-hidden rounded-[28px] md:h-[335px] lg:order-none">
        <Image
          src={offer.image}
          alt={offer.imageAlt}
          fill
          className={cn('object-cover', offer.imageClassName)}
        />
      </div>

      <div className="order-2 flex w-full flex-col items-start gap-8 lg:order-none lg:max-w-[453px] lg:gap-7">
        <div className="flex w-full flex-col items-start gap-3 lg:gap-4.25">
          <h3 className="font-heading text-title-1-mobile-md lg:text-heading-h5-desktop-md text-grey-500">
            {offer.title}
          </h3>
          <p className="text-body-2-mobile lg:text-body-3-desktop text-grey-400">
            {offer.description}
          </p>
        </div>

        <ul className="flex w-full flex-col items-start gap-4 lg:gap-3.5">
          {offer.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <CircleCheckIcon className="text-grey-400 size-[20px] shrink-0" />
              <span className="font-heading text-title-3-mobile text-grey-400">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex w-full items-start gap-4">
          <Link href={offer.learnMoreHref} className="flex-1 lg:flex-none">
            <Button
              variant="secondary"
              size="sm"
              className="w-full lg:h-[42px] lg:w-auto"
            >
              Learn More
            </Button>
          </Link>
          <Link href={offer.applyHref} className="flex-1 lg:flex-none">
            <Button
              variant="primary"
              size="sm"
              className="w-full lg:h-[42px] lg:w-auto"
            >
              Apply Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
