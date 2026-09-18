'use client';

import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';

import AuctionNoticeFilterBar from './AuctionNoticeFilterBar';
import AuctionNoticeList from './AuctionNoticeList';
import Pagination from '@/components/ui/navigation/Pagination';

import { noticeService } from '@/api/services/notice.service';
import {
  AUCTION_NOTICE_TYPE,
  auctionNoticeListQueryKey,
} from './AuctionNoticeSection';

import { useDebounce } from '@/hooks/useDebounce';
import { stripHtml } from '@/lib/utils';

import type { Notice } from '@/api/services/notice.service';
import type { AuctionNoticeCard } from '../_types/auction-notice';

const NOTICES_PER_PAGE = 10;

function toAuctionNoticeCard(notice: Notice): AuctionNoticeCard {
  return {
    id: String(notice.id),
    title: notice.title,
    description: stripHtml(notice.content.description ?? ''),
    date: notice.date,
    image: notice.media?.file_url ?? null,
    imageAlt: notice.media?.alt_text ?? '',
    href: '#',
  };
}

export default function AuctionNoticeExplorer() {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const debouncedSearch = useDebounce(search.trim(), 300);

  const params = {
    page_size: NOTICES_PER_PAGE,
    notice_type: AUCTION_NOTICE_TYPE,
    search: debouncedSearch || undefined,
    date: date || undefined,
  };

  const { data } = useQuery({
    queryKey: auctionNoticeListQueryKey(params),
    queryFn: () => noticeService.getNoticeList(params),
  });

  const notices = (data?.data.results ?? []).map(toAuctionNoticeCard);

  const totalPages = Math.max(Math.ceil(notices.length / NOTICES_PER_PAGE), 1);
  const page = Math.min(currentPage, totalPages);
  const pageNotices = notices.slice(
    (page - 1) * NOTICES_PER_PAGE,
    page * NOTICES_PER_PAGE,
  );

  return (
    <div className="flex w-full flex-col items-start gap-10 lg:gap-13">
      <AuctionNoticeFilterBar
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
          Total Search: {notices.length} results found
        </p>
        {pageNotices.length > 0 ? (
          <div className="flex w-full flex-col items-center gap-10">
            <AuctionNoticeList notices={pageNotices} />
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
              ? 'No auction notices match your search. Try a different keyword or date.'
              : 'No auction notices to show right now.'}
          </p>
        )}
      </div>
    </div>
  );
}
