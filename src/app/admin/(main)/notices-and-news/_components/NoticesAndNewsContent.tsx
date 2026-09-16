'use client';

import { useState } from 'react';

import NoticesAndNewsFilterTabs from './notices-and-news-filters/NoticesAndNewsFilterTabs';
import NoticesAndNewsListCard from './notices-and-news-list/NoticesAndNewsListCard';

import { useNews } from '@/hooks/api/admin/use-news';
import { useNotices } from '@/hooks/api/admin/use-notices';

import type { NoticesAndNewsTab } from './notices-and-news-filters/NoticesAndNewsFilterTabs';

export default function NoticesAndNewsContent() {
  const [activeTab, setActiveTab] = useState<NoticesAndNewsTab>('notice');

  const notices = useNotices({ page_size: 100 });
  const news = useNews({ page_size: 100 });

  const active = activeTab === 'notice' ? notices : news;

  const counts = {
    notice: notices.data?.count ?? 0,
    news: news.data?.count ?? 0,
  };

  return (
    <>
      <NoticesAndNewsFilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        counts={counts}
      />
      <NoticesAndNewsListCard
        items={active.data?.results ?? []}
        kind={activeTab}
        isPending={active.isPending}
        isError={active.isError}
        emptyLabel={
          activeTab === 'notice' ? 'No notices yet.' : 'No news articles yet.'
        }
      />
    </>
  );
}
