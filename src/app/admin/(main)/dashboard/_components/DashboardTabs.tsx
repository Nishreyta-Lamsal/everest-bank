import Link from 'next/link';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

import { cn } from '@/lib/utils';

import { ADMIN_ROUTE } from '@/constants/admin';

import { tabs } from '../_data/dashboard-tabs';

type DashboardTabsProps = {
  activeTab: string;
  onChange: (tab: string) => void;
};

export default function DashboardTabs({
  activeTab,
  onChange,
}: DashboardTabsProps) {
  return (
    <div className="flex w-full flex-col gap-1.5">
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center">
          {tabs.map((label) => {
            const active = label === activeTab;

            return (
              <button
                key={label}
                type="button"
                onClick={() => onChange(label)}
                className={cn(
                  'relative flex cursor-pointer items-center justify-center px-5 py-2.5 text-neutral-700',
                  active ? 'text-paragraph-sm-medium' : 'text-paragraph-sm',
                )}
              >
                <p>{label}</p>
                {active && (
                  <>
                    <span className="absolute inset-x-0 top-full mt-1.5 h-px bg-[#F37021]" />
                    <span className="absolute top-full left-1/2 mt-1.5 h-0 w-0 -translate-x-1/2 border-x-8 border-t-8 border-x-transparent border-t-[#F37021]" />
                  </>
                )}
              </button>
            );
          })}
        </div>
        <Link href={ADMIN_ROUTE.NOTICES_AND_NEWS}>
          <Button variant="secondary">
            <icon.edit />
            Post a notice
          </Button>
        </Link>
      </div>
      <div className="h-px w-full bg-[rgba(0,0,0,0.08)]" />
    </div>
  );
}
