'use client';

import { useState } from 'react';

import NavbarMenuItem from './NavbarMenuItem';
import NavbarPersonalMenu from './NavbarPersonalMenu';
import NavbarSearchInput from './NavbarSearchInput';
import Button from '@/components/ui/buttons/Button';

import { mainNavItems } from '@/data';

export default function NavbarMainBar() {
  const [isPersonalMenuOpen, setIsPersonalMenuOpen] = useState(false);

  return (
    <div className="relative">
      <div className="flex items-center justify-between pr-4 md:pr-10 xl:pr-22">
        <div className="flex items-center">
          {mainNavItems.map((item, index) =>
            item.label === 'Personal' ? (
              <div
                key={item.label}
                onMouseEnter={() => setIsPersonalMenuOpen(true)}
                onMouseLeave={() => setIsPersonalMenuOpen(false)}
              >
                <NavbarMenuItem {...item} isFirst={index === 0} />
              </div>
            ) : (
              <NavbarMenuItem
                key={item.label}
                {...item}
                isFirst={index === 0}
              />
            ),
          )}
        </div>
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
          onMouseEnter={() => setIsPersonalMenuOpen(true)}
          onMouseLeave={() => setIsPersonalMenuOpen(false)}
        >
          <NavbarPersonalMenu />
        </div>
      )}
    </div>
  );
}
