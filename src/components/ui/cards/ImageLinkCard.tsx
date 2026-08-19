import type { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type ImageLinkCardProps = {
  href: string;
  image: string;
  title: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'children'>;

export default function ImageLinkCard({
  href,
  image,
  title,
  className,
  ...otherProps
}: ImageLinkCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'group relative h-[201px] w-[308px] shrink-0 overflow-hidden rounded-lg lg:h-[324px] lg:w-auto lg:flex-1',
        className,
      )}
      {...otherProps}
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-300 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.68)]" />
      <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between lg:right-6 lg:bottom-6 lg:left-6">
        <p className="font-heading text-title-1-mobile lg:text-heading-h3-desktop text-white">
          {title}
        </p>
        <ArrowUpRightIcon className="size-[20px] shrink-0 text-white lg:size-[32px]" />
      </div>
    </Link>
  );
}
