'use client';

import { useRef, useState } from 'react';

import NavbarMenuItem from './NavbarMenuItem';
import NavbarPersonalMenu from './NavbarPersonalMenu';
import NavbarSearchInput from '../NavbarSearchInput';
import Button from '@/components/ui/buttons/Button';

import { mainNavItems } from '@/data';

export default function NavbarMainBar() {
  const [isPersonalMenuOpen, setIsPersonalMenuOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  function openPersonalMenu() {
    setIsPersonalMenuOpen(true);
  }

  function closePersonalMenu() {
    setIsPersonalMenuOpen(false);
  }

  function handleBlur(event: React.FocusEvent<HTMLDivElement>) {
    if (!containerRef.current?.contains(event.relatedTarget)) {
      closePersonalMenu();
    }
  }

  return (
    <div ref={containerRef} onBlur={handleBlur} className="relative">
      <div className="flex items-center justify-between pr-4 md:pr-10 xl:pr-22">
        <nav aria-label="Main navigation" className="flex items-center">
          {mainNavItems.map((item, index) =>
            item.label === 'Personal' ? (
              <div
                key={item.label}
                onMouseEnter={openPersonalMenu}
                onMouseLeave={closePersonalMenu}
              >
                <NavbarMenuItem
                  {...item}
                  isFirst={index === 0}
                  hasDropdown
                  isExpanded={isPersonalMenuOpen}
                  onFocus={openPersonalMenu}
                />
              </div>
            ) : (
              <NavbarMenuItem
                key={item.label}
                {...item}
                isFirst={index === 0}
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
      {isPersonalMenuOpen && (
        <div
          className="absolute top-full left-0 z-50 w-full"
          onMouseEnter={openPersonalMenu}
          onMouseLeave={closePersonalMenu}
        >
          <NavbarPersonalMenu />
        </div>
      )}
    </div>
  );
}
