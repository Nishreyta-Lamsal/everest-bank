import NewsItem from './NewsItem';

import type { NewsCard } from '@/data';

type NewsListProps = {
  items: NewsCard[];
};

export default function NewsList({ items }: NewsListProps) {
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
