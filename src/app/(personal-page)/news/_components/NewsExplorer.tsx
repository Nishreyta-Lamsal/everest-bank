'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import NewsFilterBar from './NewsFilterBar';
import NewsList from '@/components/shared/news/NewsList';
import Pagination from '@/components/ui/navigation/Pagination';

import { newsService } from '@/api/services/news.service';
import { NEWS_PAGE_SIZE, newsListQueryKey } from './NewsSection';

import { useDebounce } from '@/hooks/useDebounce';
import { stripHtml } from '@/lib/utils';

import type { News } from '@/api/services/news.service';
import type { NewsCard } from '@/data';

const NEWS_PER_PAGE = 10;

function toNewsCard(news: News): NewsCard {
  return {
    headline: news.title,
    description: stripHtml(news.content.description ?? ''),
    href: '#',
  };
}

export default function NewsExplorer() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search.trim(), 300);

  const params = {
    page_size: NEWS_PAGE_SIZE,
    search: debouncedSearch || undefined,
    date: date || undefined,
  };

  const { data } = useQuery({
    queryKey: newsListQueryKey(params),
    queryFn: () => newsService.getNewsList(params),
  });

  const news = (data?.data.results ?? []).map(toNewsCard);

  const totalPages = Math.max(Math.ceil(news.length / NEWS_PER_PAGE), 1);
  const page = Math.min(currentPage, totalPages);
  const pageNews = news.slice((page - 1) * NEWS_PER_PAGE, page * NEWS_PER_PAGE);

  return (
    <div className="flex w-full flex-col items-start gap-10 lg:gap-13">
      <NewsFilterBar
        search={search}
        onSearchChange={setSearch}
        date={date}
        onDateChange={setDate}
      />

      <div className="flex w-full flex-col items-start gap-4">
        <p
          aria-live="polite"
          className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 w-full"
        >
          Total Search: {news.length} results found
        </p>
        {pageNews.length > 0 ? (
          <div className="flex w-full flex-col items-center gap-10">
            <NewsList items={pageNews} />
            {totalPages > 1 && (
              <Pagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            )}
          </div>
        ) : (
          <p className="text-body-2-mobile lg:text-body-2-desktop text-grey-300 w-full">
            {search || date
              ? 'No news match your search. Try a different keyword or date.'
              : 'No news to show right now.'}
          </p>
        )}
      </div>
    </div>
  );
}
