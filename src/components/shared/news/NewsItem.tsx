import Link from 'next/link';

import { cn } from '@/lib/utils';

import type { NewsCard } from '@/data';

type NewsItemProps = {
  card: NewsCard;
  hideOnMobile?: boolean;
};

export default function NewsItem({
  card,
  hideOnMobile = false,
}: NewsItemProps) {
  return (
    <Link
      href={card.href}
      className={cn(
        'lg:border-grey-25 flex w-full flex-col items-start gap-6 rounded-lg border border-[#f4f4f4] bg-white p-4 lg:h-50 lg:justify-between lg:gap-0',
        hideOnMobile && 'hidden lg:flex',
      )}
    >
      <div className="flex w-full flex-col items-start gap-4">
        <h3 className="font-heading text-heading-h3-mobile text-grey-500 lg:text-heading-h4-desktop">
          {card.headline.split('\n').map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop line-clamp-2 lg:line-clamp-none lg:max-w-130.25">
          {card.description}
        </p>
      </div>
      <span className="text-body-4-desktop-md font-medium text-red-700">
        Read more
      </span>
    </Link>
  );
}
