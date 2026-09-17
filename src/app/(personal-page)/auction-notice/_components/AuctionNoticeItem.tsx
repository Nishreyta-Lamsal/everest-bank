import Image from 'next/image';
import Link from 'next/link';

import type { AuctionNoticeCard } from '../_types/auction-notice';

const PLACEHOLDER_IMAGE = '/placeholder.png';

type AuctionNoticeItemProps = {
  notice: AuctionNoticeCard;
};

export default function AuctionNoticeItem({ notice }: AuctionNoticeItemProps) {
  return (
    <Link
      href={notice.href}
      className="lg:border-grey-25 flex w-full flex-col gap-6 rounded-lg border border-[#f4f4f4] bg-white p-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500 lg:flex-row lg:items-start lg:gap-5"
    >
      <div className="relative h-[186px] w-full shrink-0 overflow-hidden rounded-lg md:h-[280px] lg:h-[186px] lg:w-[185px]">
        <Image
          src={notice.image ?? PLACEHOLDER_IMAGE}
          alt={notice.image ? notice.imageAlt : ''}
          fill
          sizes="(min-width: 1024px) 185px, 100vw"
          className="object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col gap-6 lg:min-h-[186px] lg:justify-between lg:gap-8 lg:p-3">
        <div className="flex w-full flex-col items-start gap-2 lg:gap-4">
          <h3 className="font-heading text-heading-h4-mobile text-grey-500 lg:text-heading-h5-desktop">
            {notice.title.split('\n').map((line, lineIndex) => (
              <span key={lineIndex} className="block">
                {line}
              </span>
            ))}
          </h3>
          <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop line-clamp-2 lg:max-w-[347px]">
            {notice.description}
          </p>
        </div>
        <span className="text-body-4-desktop-md font-medium text-red-700">
          Read more
        </span>
      </div>
    </Link>
  );
}
