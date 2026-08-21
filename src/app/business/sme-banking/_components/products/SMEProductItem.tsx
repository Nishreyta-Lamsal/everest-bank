import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { SMEProduct } from '../../_data/products';

type SMEProductItemProps = {
  product: SMEProduct;
  isLast: boolean;
};

export default function SMEProductItem({
  product,
  isLast,
}: SMEProductItemProps) {
  return (
    <Link
      href={product.href}
      className={cn(
        'group flex w-full flex-col items-start gap-5 py-6 lg:flex-row lg:items-center lg:justify-between lg:gap-4',
        !isLast && 'border-grey-25 border-b',
      )}
    >
      <div className="flex w-full items-center gap-4 lg:w-auto">
        <span className="border-grey-25 text-body-2-mobile lg:text-body-1-desktop text-grey-500 flex w-15 shrink-0 items-center justify-center rounded-full border px-2.5 py-3 transition-colors group-hover:text-red-500 lg:w-16 lg:px-4">
          {product.index}
        </span>
        <div className="flex flex-1 items-center justify-between lg:flex-none lg:justify-start lg:gap-4">
          <span className="font-heading text-title-0-mobile-md lg:text-heading-h4-desktop-md text-grey-500 whitespace-nowrap transition-colors group-hover:text-red-500">
            {product.title}
          </span>
          <ArrowUpRightIcon className="text-grey-500 size-7 shrink-0 transition-colors group-hover:text-red-500 lg:size-8" />
        </div>
      </div>
      <p className="text-body-3-mobile lg:text-body-2-desktop text-grey-400 w-full pl-16 lg:w-[256px] lg:pl-0">
        {product.description}
      </p>
    </Link>
  );
}
