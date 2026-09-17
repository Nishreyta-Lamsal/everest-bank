import NavbarMainBar from './desktop/NavbarMainBar';
import NavbarUtilityBar from './desktop/NavbarUtilityBar';
import NavbarMobile from './mobile/NavbarMobile';

import type { MainNavItem } from '@/types';

type NavbarProps = {
  items: MainNavItem[];
};

export default function Navbar({ items }: NavbarProps) {
  return (
    <header className="w-full bg-white">
      <NavbarMobile items={items} />
      <div className="hidden lg:block">
        <NavbarUtilityBar />
        <NavbarMainBar items={items} />
      </div>
    </header>
  );
}
