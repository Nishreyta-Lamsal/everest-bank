import Image from 'next/image';
import Link from 'next/link';

import { icon } from '@/components/icons';

import type { AccountFinderCard as AccountFinderCardType } from '../../_types';

type AccountFinderCardProps = {
  card: AccountFinderCardType;
};

export default function AccountFinderCard({ card }: AccountFinderCardProps) {
  return (
    <Link
      href={card.href}
      className="group relative flex h-[250px] w-full shrink-0 flex-col overflow-hidden rounded-lg sm:w-[calc(50%-12px)] lg:w-[405px]"
    >
      <Image
        src={card.image}
        alt={card.imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      {card.overlayImage && (
        <Image
          src={card.overlayImage}
          alt={card.overlayImageAlt ?? ''}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="from-black-alpha-0 to-black-alpha-80 absolute inset-0 bg-gradient-to-b" />
      <div className="relative mt-auto flex w-full items-center justify-between gap-4 p-6">
        <span className="font-heading text-title-0-mobile lg:text-heading-h4-desktop text-white">
          {card.title}
        </span>
        <icon.arrowUpRight className="size-6 shrink-0 text-white" />
      </div>
    </Link>
  );
}
