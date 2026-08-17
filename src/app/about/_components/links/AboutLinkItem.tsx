import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import type { AboutLinkCard } from '../../_data';

type AboutLinkItemProps = {
  card: AboutLinkCard;
};

export default function AboutLinkItem({ card }: AboutLinkItemProps) {
  return (
    <Link
      href={card.href}
      className="relative block h-[372px] w-[335px] shrink-0 overflow-hidden rounded-3xl lg:w-auto lg:shrink"
    >
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover"
      />
      <div className="absolute inset-6 flex items-end justify-between gap-4 lg:inset-8">
        <h3 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-white">
          {card.title}
        </h3>
        <ArrowUpRightIcon className="size-[40px] shrink-0 text-white lg:size-[52px]" />
      </div>
    </Link>
  );
}
