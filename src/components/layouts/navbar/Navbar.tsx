import NavbarMainBar from './desktop/NavbarMainBar';
import NavbarUtilityBar from './desktop/NavbarUtilityBar';
import NavbarMobile from './mobile/NavbarMobile';

import type { CalendarRead } from '@/api/services/calendar.service';
import type { MainNavItem } from '@/types';

type NavbarProps = {
  items: MainNavItem[];
  calendar: CalendarRead | null;
};

export default function Navbar({ items, calendar }: NavbarProps) {
  return (
    <header className="w-full bg-white">
      <NavbarMobile items={items} />
      <div className="hidden lg:block">
        <NavbarUtilityBar calendar={calendar} />
        <NavbarMainBar items={items} />
      </div>
    </header>
  );
}
