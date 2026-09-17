import NewsItem from './NewsItem';

import type { NewsCard } from '@/data';

type NewsListProps = {
  items: NewsCard[];
};

export default function NewsList({ items }: NewsListProps) {
  if (!items.length) {
    return (
      <p className="text-body-2-mobile text-grey-400 lg:text-body-2-desktop order-2 w-full lg:order-0 lg:col-span-2">
        No updates to show right now.
      </p>
    );
  }

  return (
    <div className="order-2 flex w-full flex-col gap-4 lg:order-0 lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-6">
      {items.map((card, index) => (
        <NewsItem
          key={`${card.headline}-${index}`}
          card={card}
          hideOnMobile={index === 3}
        />
      ))}
    </div>
  );
}
