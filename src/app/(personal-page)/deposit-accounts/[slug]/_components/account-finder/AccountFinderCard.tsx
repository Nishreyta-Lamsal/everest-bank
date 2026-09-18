import Image from 'next/image';
import Link from 'next/link';

import { icon } from '@/components/icons';

import type { AccountFinderAccount } from '../../_types';

type AccountFinderCardProps = {
  account: AccountFinderAccount;
};

export default function AccountFinderCard({ account }: AccountFinderCardProps) {
  return (
    <Link
      href={account.href}
      className="group relative flex h-[250px] w-full shrink-0 flex-col overflow-hidden rounded-lg sm:w-[calc(50%-12px)] lg:w-[405px]"
    >
      {account.image && (
        <Image
          src={account.image}
          alt={account.imageAlt}
          fill
          sizes="(min-width: 1024px) 405px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      {account.overlayImage && (
        <Image
          src={account.overlayImage}
          alt={account.overlayImageAlt ?? ''}
          fill
          sizes="(min-width: 1024px) 405px, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      )}
      <div className="from-black-alpha-0 to-black-alpha-80 absolute inset-0 bg-gradient-to-b" />
      <div className="relative mt-auto flex w-full items-center justify-between gap-4 p-6">
        <span className="font-heading text-title-0-mobile lg:text-heading-h4-desktop text-white">
          {account.title}
        </span>
        <icon.arrowUpRight className="size-6 shrink-0 text-white" />
      </div>
    </Link>
  );
}
