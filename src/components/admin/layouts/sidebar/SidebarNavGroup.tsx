'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';

import { icon } from '@/components/admin/icons';
import { SidebarNavItem } from './SidebarNavItem';

import { cn } from '@/lib/utils';

import type { SidebarNavItemData } from '@/types/admin';

type SidebarNavGroupProps = {
  title: string;
  items?: SidebarNavItemData[];
};

export function SidebarNavGroup({ title, items = [] }: SidebarNavGroupProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(() =>
    items.some(
      (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
    ),
  );

  return (
    <div className="flex w-full flex-col items-start gap-1">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between px-3 py-1"
      >
        <span className="text-paragraph-mini text-[#1a1818] opacity-80">
          {title}
        </span>
        <icon.chevronDown
          className={cn(
            'size-4 text-[#1a1818] opacity-80 transition-transform',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      {items.length > 0 && (
        <div
          className={cn(
            'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
            isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="flex flex-col items-start gap-1 overflow-hidden">
            {items.map((item) => (
              <SidebarNavItem key={item.href} {...item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
