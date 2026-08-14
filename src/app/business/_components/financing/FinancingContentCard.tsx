import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import type { BusinessFinancingContentCard } from '../../_data';

export default function FinancingContentCard({
  title,
  description,
  image,
  imageAlt,
  linkLabel,
  href,
}: BusinessFinancingContentCard) {
  return (
    <Link
      href={href}
      className="flex flex-col items-start overflow-hidden rounded-lg bg-[#f6f5ec] xl:flex-1"
    >
      <div className="relative h-50.25 w-full md:h-75.5">
        <Image src={image} alt={imageAlt} fill className="object-cover" />
      </div>
      <div className="flex w-full flex-col items-start justify-between gap-12 bg-white px-4 py-6 xl:h-53 xl:p-6">
        <div className="flex flex-col items-start gap-2">
          <h3 className="font-heading text-title-0-desktop text-grey-500">
            {title}
          </h3>
          <p className="text-body-3-desktop text-grey-400">{description}</p>
        </div>
        <span className="text-body-4-desktop-md inline-flex items-center gap-1 font-medium text-red-700 underline">
          {linkLabel}
          <ArrowUpRightIcon className="size-4 shrink-0" />
        </span>
      </div>
    </Link>
  );
}
