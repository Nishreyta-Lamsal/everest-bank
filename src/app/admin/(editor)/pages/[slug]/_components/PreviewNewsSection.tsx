'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import Button from '@/components/ui/buttons/Button';
import NewsList from '@/components/shared/news/NewsList';

import { newsService } from '@/api/services/news.service';
import { newsQueryKey } from '@/components/shared/news/NewsSection';

import { ROUTE } from '@/constants';
import { newsCards } from '@/data';

const NEWS_CARD_COUNT = 4;

export default function PreviewNewsSection() {
  const { data } = useQuery({
    queryKey: newsQueryKey,
    queryFn: () =>
      newsService.getNewsList({
        is_pinned: true,
        page_size: NEWS_CARD_COUNT,
      }),
  });

  const results = data?.data.results ?? [];

  const items = results.length
    ? results.map((news) => ({
        headline: news.title,
        description: news.content.description ?? '',
        href: '#',
      }))
    : newsCards;

  return (
    <section className="w-full py-16 lg:py-30">
      <LayoutWrapper>
        <div className="flex w-full flex-col gap-10 lg:grid lg:grid-cols-[1fr_auto] lg:items-center lg:gap-x-6 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md text-grey-500 lg:text-heading-h2-desktop-md order-1 w-full max-w-[270px] lg:order-0 lg:max-w-[650px]">
            Stay updated With Everest Bank
          </h2>
          <Link
            href={ROUTE.NOTICE}
            className="order-3 block w-full lg:order-0 lg:inline-block lg:w-auto"
          >
            <Button variant="secondary" size="md" className="w-full lg:w-auto">
              See more
            </Button>
          </Link>
          <NewsList items={items} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
