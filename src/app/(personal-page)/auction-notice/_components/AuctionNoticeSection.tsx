import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import AuctionNoticeExplorer from './AuctionNoticeExplorer';

import { noticeService } from '@/api/services/notice.service';

import { getQueryClient } from '@/lib/get-query-client';

import type { NoticeListParams } from '@/api/services/notice.service';

export const AUCTION_NOTICE_PAGE_SIZE = 10;
export const AUCTION_NOTICE_TYPE = 'auction-notice';

export function auctionNoticeListQueryKey(params: NoticeListParams) {
  return ['notices', params] as const;
}

export default async function AuctionNoticeSection() {
  const queryClient = getQueryClient();

  const params: NoticeListParams = {
    page_size: AUCTION_NOTICE_PAGE_SIZE,
    notice_type: AUCTION_NOTICE_TYPE,
  };

  await queryClient.prefetchQuery({
    queryKey: auctionNoticeListQueryKey(params),
    queryFn: () => noticeService.getNoticeList(params),
  });

  return (
    <section className="w-full py-16 lg:py-12">
      <LayoutWrapper>
        <HydrationBoundary state={dehydrate(queryClient)}>
          <AuctionNoticeExplorer />
        </HydrationBoundary>
      </LayoutWrapper>
    </section>
  );
}
