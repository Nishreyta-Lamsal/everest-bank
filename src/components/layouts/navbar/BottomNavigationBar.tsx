'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { icon } from '@/components/icons';

import { cn, isNavItemActive, toIconKey } from '@/lib/utils';

import type { MainNavItem } from '@/types';
import type { ComponentType, SVGProps } from 'react';

type BottomNavigationBarProps = {
  items: MainNavItem[];
};

export default function BottomNavigationBar({
  items,
}: BottomNavigationBarProps) {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-40 flex w-full items-center bg-white shadow-[0px_-1px_5px_rgba(0,0,0,0.08)] lg:hidden"
    >
      {items.map((item, index) => {
        const isActive = isNavItemActive(
          pathname,
          item.href,
          item.activePrefixes,
        );
        const Icon =
          (icon as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[
            toIconKey(item.icon)
          ] ?? icon.bank;

        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={cn(
              'flex flex-1 flex-col items-center gap-1 py-2.5 transition-colors',
              isActive ? 'bg-red-500 text-white' : 'text-red-500',
              index === 0 && 'pl-4',
              index === items.length - 1 && 'pr-4',
            )}
          >
            <Icon className="size-[18px] shrink-0" />
            <span className="text-body-4-desktop">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
