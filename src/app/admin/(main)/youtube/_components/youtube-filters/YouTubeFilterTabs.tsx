'use client';

import { cn } from '@/lib/utils';

export type YouTubeTab = 'playlists' | 'videos';

type YouTubeFilterTabsProps = {
  activeTab: YouTubeTab;
  onTabChange: (tab: YouTubeTab) => void;
  counts: Record<YouTubeTab, number>;
};

const tabs: { label: string; tab: YouTubeTab }[] = [
  { label: 'Playlists', tab: 'playlists' },
  { label: 'Videos', tab: 'videos' },
];

export default function YouTubeFilterTabs({
  activeTab,
  onTabChange,
  counts,
}: YouTubeFilterTabsProps) {
  return (
    <div className="flex items-start gap-2">
      {tabs.map(({ label, tab }) => (
        <button
          key={tab}
          type="button"
          onClick={() => onTabChange(tab)}
          className={cn(
            'text-paragraph-sm-medium flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2',
            tab === activeTab
              ? 'border border-black/5 bg-slate-950 text-white'
              : 'bg-white/50 text-neutral-700',
          )}
        >
          <span>{label}</span>
          <span>{counts[tab]}</span>
        </button>
      ))}
    </div>
  );
}
