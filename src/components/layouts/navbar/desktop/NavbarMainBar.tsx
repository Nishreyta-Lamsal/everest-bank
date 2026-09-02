'use client';

import { useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

import NavbarMenuItem from './NavbarMenuItem';
import NavbarMegaMenu from './mega-menu/NavbarMegaMenu';
import NavbarSearchInput from '../NavbarSearchInput';
import Button from '@/components/ui/buttons/Button';

import { isNavItemActive } from '@/lib/utils';

import { mainNavItems } from '@/data';

export default function NavbarMainBar() {
  const pathname = usePathname();
  const [openMenuLabel, setOpenMenuLabel] = useState<string | null>(null);
  const [prevPathname, setPrevPathname] = useState(pathname);
  const containerRef = useRef<HTMLDivElement>(null);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpenMenuLabel(null);
  }

  function closeMegaMenu() {
    setOpenMenuLabel(null);
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      closeMegaMenu();
    }
  }

  const openMenuItem = mainNavItems.find(
    (item) => item.label === openMenuLabel,
  );

  return (
    <div ref={containerRef} onBlur={handleBlur} className="relative">
      <div className="flex items-center justify-between pr-4 md:pr-10 xl:pr-22">
        <nav aria-label="Main navigation" className="flex items-center">
          {mainNavItems.map((item, index) =>
            item.megaMenu ? (
              <div
                key={item.label}
                onMouseEnter={() => setOpenMenuLabel(item.label)}
                onMouseLeave={closeMegaMenu}
              >
                <NavbarMenuItem
                  {...item}
                  isFirst={index === 0}
                  hasDropdown
                  isExpanded={openMenuLabel === item.label}
                  isActive={isNavItemActive(
                    pathname,
                    item.href,
                    item.activePrefixes,
                  )}
                  onFocus={() => setOpenMenuLabel(item.label)}
                />
              </div>
            ) : (
              <NavbarMenuItem
                key={item.label}
                {...item}
                isFirst={index === 0}
                isActive={isNavItemActive(
                  pathname,
                  item.href,
                  item.activePrefixes,
                )}
              />
            ),
          )}
        </nav>
        <div className="flex items-center gap-2">
          <NavbarSearchInput />
          <Button shape="rectangular" size="sm">
            Login To EBL Digital
          </Button>
        </div>
      </div>
      {openMenuItem?.megaMenu && (
        <div
          className="absolute top-full left-0 z-50 w-full"
          onMouseEnter={() => setOpenMenuLabel(openMenuItem.label)}
          onMouseLeave={closeMegaMenu}
        >
          <NavbarMegaMenu
            label={openMenuItem.label}
            {...openMenuItem.megaMenu}
          />
        </div>
      )}
    </div>
  );
}
