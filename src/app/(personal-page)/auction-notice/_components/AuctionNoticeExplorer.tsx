'use client';

import { useState } from 'react';

import AuctionNoticeFilterBar from './AuctionNoticeFilterBar';
import AuctionNoticeList from './AuctionNoticeList';
import Pagination from '@/components/ui/navigation/Pagination';

import type { AuctionNoticeCard } from '../_types/auction-notice';

type AuctionNoticeExplorerProps = {
  notices: AuctionNoticeCard[];
};

const NOTICES_PER_PAGE = 10;

export default function AuctionNoticeExplorer({
  notices,
}: AuctionNoticeExplorerProps) {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const query = search.trim().toLowerCase();

  const visibleNotices = notices.filter((notice) => {
    const matchesQuery =
      !query ||
      notice.title.toLowerCase().includes(query) ||
      notice.description.toLowerCase().includes(query);
    const matchesDate = !date || notice.date.slice(0, 10) === date;

    return matchesQuery && matchesDate;
  });

  const totalPages = Math.max(
    Math.ceil(visibleNotices.length / NOTICES_PER_PAGE),
    1,
  );
  const page = Math.min(currentPage, totalPages);
  const pageNotices = visibleNotices.slice(
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
          Total Search: {visibleNotices.length} results found
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
            No auction notices match your search. Try a different keyword or
            date.
          </p>
        )}
      </div>
    </div>
  );
}
