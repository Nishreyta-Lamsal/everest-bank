'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import GlobalSearchInput from '@/components/ui/inputs/GlobalSearchInput';
import { icon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';
import NavbarMobileMenu from './NavbarMobileMenu';

import { isNavItemActive } from '@/lib/utils';

import { ROUTE } from '@/constants/route';

import type { MainNavItem } from '@/types';

type NavbarMobileProps = {
  items: MainNavItem[];
};

export default function NavbarMobile({ items }: NavbarMobileProps) {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const activeItem =
    items.find((item) =>
      isNavItemActive(pathname, item.href, item.activePrefixes),
    ) ?? items[0];

  return (
    <div className="flex flex-col lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link href={ROUTE.PERSONAL} className="shrink-0">
          <Image
            src="/icons/everest-bank-logo.svg"
            alt="Everest Bank"
            width={200}
            height={30}
            priority
          />
        </Link>
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={isMenuOpen}
          onClick={() => setIsMenuOpen(true)}
          className="flex size-[24px] shrink-0 items-center justify-center text-red-500"
        >
          <icon.menu className="size-[24px]" />
        </button>
      </div>
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="min-w-0 flex-1">
          <GlobalSearchInput
            label="Search for anything"
            placeholder="Search for anything"
          />
        </div>
        <Button shape="rectangular" size="sm" className="shrink-0">
          Login To EBL Digital
        </Button>
      </div>

      {activeItem && (
        <NavbarMobileMenu
          activeItem={activeItem}
          isOpen={isMenuOpen}
          onClose={() => setIsMenuOpen(false)}
        />
      )}
    </div>
  );
}
