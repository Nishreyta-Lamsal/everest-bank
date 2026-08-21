import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import type { BusinessFinancingMediaCard } from '../../_data';

export default function FinancingMediaCard({
  label,
  image,
  imageAlt,
  href,
}: BusinessFinancingMediaCard) {
  return (
    <Link
      href={href}
      className="group relative flex h-[286px] w-full flex-col overflow-hidden rounded-tl-[124px] rounded-tr-lg rounded-br-lg rounded-bl-lg md:h-[514px] xl:flex-1"
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-b from-black/0 to-black/80" />
      <div className="relative mt-auto flex w-full items-center justify-between px-4 py-4 xl:p-6">
        <p className="font-heading text-heading-h3-desktop leading-none text-white">
          {label}
        </p>
        <ArrowUpRightIcon className="size-[24px] shrink-0 text-white" />
      </div>
    </Link>
  );
}
