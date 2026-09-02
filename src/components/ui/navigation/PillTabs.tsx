import Link from 'next/link';

import { tv } from 'tailwind-variants';

import type { LinkAction } from '@/types';

type PillTabsProps = {
  items: LinkAction[];
  activeHref: string;
  label: string;
  variant?: 'primary' | 'secondary';
  className?: string;
};

export const pillTabsClasses = tv({
  slots: {
    root: 'w-full rounded-[200px] border border-white/18 p-2 backdrop-blur-[3px] lg:w-auto',
    list: 'scrollbar-hidden flex gap-2 overflow-x-auto',
    item: 'flex-1 shrink-0 lg:flex-none',
    tab: 'text-body-3-mobile lg:text-body-3-desktop flex items-center justify-center rounded-[100px] px-4 py-2 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2',
  },
  variants: {
    variant: {
      primary: {
        root: 'bg-white/16',
        tab: 'focus-visible:outline-white',
      },
      secondary: {
        root: 'bg-grey-bluish-grey',
        tab: 'focus-visible:outline-grey-500',
      },
    },
    active: {
      true: { tab: 'bg-white' },
      false: {},
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      active: true,
      class: { tab: 'text-grey-400' },
    },
    {
      variant: 'primary',
      active: false,
      class: { tab: 'text-white hover:bg-white/10' },
    },
    {
      variant: 'secondary',
      active: true,
      class: { tab: 'text-grey-500' },
    },
    {
      variant: 'secondary',
      active: false,
      class: { tab: 'text-grey-500 hover:bg-white/40' },
    },
  ],
  defaultVariants: {
    variant: 'primary',
    active: false,
  },
});

export default function PillTabs({
  items,
  activeHref,
  label,
  variant = 'primary',
  className,
}: PillTabsProps) {
  const { root, list, item, tab } = pillTabsClasses({ variant });

  return (
    <nav aria-label={label} className={root({ className })}>
      <ul className={list()}>
        {items.map((navItem) => {
          const isActive = navItem.href === activeHref;

          return (
            <li key={navItem.label} className={item()}>
              <Link
                href={navItem.href}
                aria-current={isActive ? 'page' : undefined}
                className={tab({ active: isActive })}
              >
                {navItem.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
