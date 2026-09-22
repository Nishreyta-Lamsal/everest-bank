'use client';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

import { cn } from '@/lib/utils';

export type NoticesAndNewsTab = 'notice' | 'news' | 'auction-notice';

type NoticesAndNewsFilterTabsProps = {
  activeTab: NoticesAndNewsTab;
  onTabChange: (tab: NoticesAndNewsTab) => void;
  counts: Record<NoticesAndNewsTab, number>;
  onAdd: () => void;
};

const tabs: { label: string; tab: NoticesAndNewsTab }[] = [
  { label: 'Notice', tab: 'notice' },
  { label: 'News', tab: 'news' },
  { label: 'Auction Notice', tab: 'auction-notice' },
];

const addLabels: Record<NoticesAndNewsTab, string> = {
  notice: 'Add notice',
  news: 'Add news',
  'auction-notice': 'Add auction notice',
};

export default function NoticesAndNewsFilterTabs({
  activeTab,
  onTabChange,
  counts,
  onAdd,
}: NoticesAndNewsFilterTabsProps) {
  return (
    <div className="flex items-center justify-between gap-2">
      <div className="flex items-start gap-2">
        {tabs.map(({ label, tab }) => {
          const active = tab === activeTab;

          return (
            <button
              key={tab}
              type="button"
              onClick={() => onTabChange(tab)}
              className={cn(
                'text-paragraph-sm-medium flex cursor-pointer items-center justify-center gap-2 rounded-full px-6 py-2',
                active
                  ? 'border border-black/5 bg-slate-950 text-white'
                  : 'bg-white/50 text-neutral-700',
              )}
            >
              <p>{label}</p>
              <p>{counts[tab]}</p>
            </button>
          );
        })}
      </div>

      <Button type="button" variant="primary" onClick={onAdd}>
        <icon.plus />
        {addLabels[activeTab]}
      </Button>
    </div>
  );
}
