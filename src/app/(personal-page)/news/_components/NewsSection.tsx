import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import NewsExplorer from './NewsExplorer';

import { newsService } from '@/api/services/news.service';

import { getQueryClient } from '@/lib/get-query-client';

import type { NewsListParams } from '@/api/services/news.service';

export const NEWS_PAGE_SIZE = 10;

export function newsListQueryKey(params: NewsListParams) {
  return ['news-list', params] as const;
}

export default async function NewsSection() {
  const queryClient = getQueryClient();

  const params: NewsListParams = { page_size: NEWS_PAGE_SIZE };

  await queryClient.prefetchQuery({
    queryKey: newsListQueryKey(params),
    queryFn: () => newsService.getNewsList(params),
  });

  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NewsExplorer />
        </HydrationBoundary>
      </LayoutWrapper>
    </section>
  );
}
