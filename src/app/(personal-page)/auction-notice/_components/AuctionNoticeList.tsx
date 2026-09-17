import AuctionNoticeItem from './AuctionNoticeItem';

import type { AuctionNoticeCard } from '../_types/auction-notice';

type AuctionNoticeListProps = {
  notices: AuctionNoticeCard[];
};

export default function AuctionNoticeList({ notices }: AuctionNoticeListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      {notices.map((notice) => (
        <AuctionNoticeItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
