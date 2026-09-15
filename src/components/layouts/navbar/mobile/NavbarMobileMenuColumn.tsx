import Link from 'next/link';

import { icon } from '@/components/icons';

import { cn, toIconKey } from '@/lib/utils';

import type { MegaMenuColumn } from '@/types';
import type { ComponentType, SVGProps } from 'react';

type NavbarMobileMenuColumnProps = {
  column: MegaMenuColumn;
  isOpen: boolean;
  onToggle: () => void;
};

export default function NavbarMobileMenuColumn({
  column,
  isOpen,
  onToggle,
}: NavbarMobileMenuColumnProps) {
  const Icon =
    (icon as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[
      toIconKey(column.icon)
    ] ?? icon.bank;

  const panelId = `navbar-mobile-menu-${column.label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="flex w-full flex-col items-start">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={cn(
          'flex w-full cursor-pointer items-center justify-between border-b py-5',
          isOpen ? 'border-transparent' : 'border-grey-25',
        )}
      >
        <span className="flex items-center gap-2">
          <Icon className="text-grey-500 size-4 shrink-0" />
          <span className="text-body-2-desktop-md text-grey-500">
            {column.label}
          </span>
        </span>
        <icon.chevronDown
          className={cn(
            'text-grey-500 size-4 shrink-0 transition-transform duration-200 ease-in-out',
            isOpen && 'rotate-180',
          )}
        />
      </button>
      <div
        className={cn(
          'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <div
            id={panelId}
            aria-hidden={!isOpen}
            className="flex w-full flex-col items-start"
          >
            <div className="flex w-full flex-col items-start gap-5 pl-6">
              {column.links.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="border-grey-25 text-body-3-desktop text-grey-500 w-full border-b pb-5 transition-colors hover:text-red-500"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {column.explore && (
              <Link
                href={column.explore.href}
                className="border-grey-25 text-body-4-desktop-md flex w-full items-center gap-1 border-b px-6 py-5 text-red-700 transition-colors hover:text-red-500"
              >
                {column.explore.label}
                <icon.arrowUpRight className="size-4 shrink-0" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
