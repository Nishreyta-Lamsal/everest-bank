import NoticeItem from './NoticeItem';

import type { NoticeCard } from '../_types/notice';

type NoticeListProps = {
  notices: NoticeCard[];
};

export default function NoticeList({ notices }: NoticeListProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
