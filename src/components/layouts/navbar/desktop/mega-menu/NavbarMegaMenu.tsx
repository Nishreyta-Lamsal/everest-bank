import Link from 'next/link';

import NavbarMegaMenuColumn from './NavbarMegaMenuColumn';
import { icon } from '@/components/icons';

import type { NavbarMegaMenuProps } from '@/types';

export default function NavbarMegaMenu({
  label,
  columns,
  cta,
}: NavbarMegaMenuProps) {
  return (
    <div
      role="region"
      aria-label={`${label} menu`}
      className="border-grey-50 w-full border-t bg-white pt-6 pr-8 pb-12 pl-22 shadow-lg"
    >
      <div className="grid grid-cols-[repeat(4,275px)] justify-between gap-x-12 gap-y-11">
        {columns.map((column) => (
          <NavbarMegaMenuColumn key={column.label} {...column} />
        ))}
        <Link
          href={cta.href}
          className="relative col-span-2 col-start-3 ml-auto flex h-[120px] w-full max-w-[600px] items-end justify-center self-end overflow-hidden rounded-lg rounded-tl-[80px] bg-orange-50 px-10 py-4 transition-opacity hover:opacity-90"
        >
          <icon.mountainOutline className="pointer-events-none absolute right-0 bottom-0 h-[135px] w-auto text-orange-100" />
          <div className="relative z-10 flex w-full max-w-[518px] items-start justify-between">
            <p className="font-heading text-heading-h4-desktop-md text-gray-700">
              {cta.label}
            </p>
            <icon.arrowUpRight className="size-6 shrink-0 text-red-800" />
          </div>
        </Link>
      </div>
    </div>
  );
}
