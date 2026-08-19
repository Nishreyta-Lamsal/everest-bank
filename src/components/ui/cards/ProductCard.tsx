import type { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

type ProductCardProps = {
  href: string;
  image: string;
  title: string;
  ctaLabel?: string;
} & Omit<ComponentPropsWithoutRef<typeof Link>, 'href' | 'children'>;

export default function ProductCard({
  href,
  image,
  title,
  ctaLabel = 'Apply now',
  className,
  ...otherProps
}: ProductCardProps) {
  return (
    <Link
      href={href}
      className={cn(
        'flex flex-col items-start overflow-hidden rounded-lg',
        className,
      )}
      {...otherProps}
    >
      <div className="relative h-[179px] w-full overflow-hidden md:h-[265px]">
        <Image src={image} alt={title} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-start gap-6 bg-white p-4 lg:h-[160px] lg:justify-between lg:gap-0 lg:p-6">
        <h3 className="font-heading text-heading-h4-mobile text-grey-500 lg:text-heading-h5-desktop">
          {title}
        </h3>
        <span className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 lg:underline">
          {ctaLabel}
          <ArrowUpRightIcon className="size-[16px] shrink-0" />
        </span>
      </div>
    </Link>
  );
}
