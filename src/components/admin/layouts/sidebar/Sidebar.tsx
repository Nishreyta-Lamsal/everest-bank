'use client';

import { SidebarNavGroup } from './SidebarNavGroup';
import { SidebarNavItem } from './SidebarNavItem';
import { icon } from '@/components/admin/icons';

import { dashboardNavItem, sidebarNavGroups } from '@/data/admin';

export default function Sidebar() {
  return (
    <aside className="sticky top-15 flex h-[calc(100vh-60px)] w-[230px] shrink-0 flex-col gap-4.5 overflow-y-auto bg-[rgba(251,251,251,0.8)] px-4 py-3 backdrop-blur-xs">
      <button
        type="button"
        className="bg-white-alpha-50 flex w-full items-center justify-between rounded-lg px-3 py-2 text-slate-900"
      >
        <span className="flex items-center gap-1">
          <icon.pageText className="size-4.5" />
          <span className="text-paragraph-sm">Create new</span>
        </span>
        <icon.plus className="size-4.5" />
      </button>
      <SidebarNavItem {...dashboardNavItem} />

      <div className="flex w-full flex-col gap-2">
        {sidebarNavGroups.map((group) => (
          <SidebarNavGroup key={group.title} {...group} />
        ))}
      </div>
    </aside>
  );
}
