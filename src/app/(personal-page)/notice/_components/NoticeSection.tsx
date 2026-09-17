import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import NoticeExplorer from './NoticeExplorer';

import { noticeService } from '@/api/services/notice.service';

import { getQueryClient } from '@/lib/get-query-client';

import type { NoticeListParams } from '@/api/services/notice.service';

export const NOTICE_PAGE_SIZE = 10;

export function noticeListQueryKey(params: NoticeListParams) {
  return ['notices', params] as const;
}

export default async function NoticeSection() {
  const queryClient = getQueryClient();

  const params: NoticeListParams = { page_size: NOTICE_PAGE_SIZE };

  await queryClient.prefetchQuery({
    queryKey: noticeListQueryKey(params),
    queryFn: () => noticeService.getNoticeList(params),
  });

  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <NoticeExplorer />
        </HydrationBoundary>
      </LayoutWrapper>
    </section>
  );
}
