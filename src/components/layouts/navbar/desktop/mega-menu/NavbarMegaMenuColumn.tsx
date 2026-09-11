import Link from 'next/link';

import { icon } from '@/components/icons';

import { toIconKey } from '@/lib/utils';

import type { NavbarMegaMenuColumnProps } from '@/types';
import type { ComponentType, SVGProps } from 'react';

export default function NavbarMegaMenuColumn({
  label,
  icon: iconSlug,
  links,
  explore,
}: NavbarMegaMenuColumnProps) {
  const Icon =
    (icon as Record<string, ComponentType<SVGProps<SVGSVGElement>>>)[
      toIconKey(iconSlug)
    ] ?? icon.bank;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex items-center gap-2 py-2">
        <Icon className="text-grey-500 size-4 shrink-0" />
        <p className="text-body-2-desktop-md text-grey-500">{label}</p>
      </div>
      <div className="flex flex-col items-start gap-4 pl-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-body-3-desktop text-grey-500 transition-colors hover:text-red-500"
          >
            {link.label}
          </Link>
        ))}
        {explore && (
          <Link
            href={explore.href}
            className="text-body-4-desktop-md flex items-center gap-1 text-red-700 transition-colors hover:text-red-500"
          >
            {explore.label}
            <icon.arrowUpRight className="size-4 shrink-0" />
          </Link>
        )}
      </div>
    </div>
  );
}
