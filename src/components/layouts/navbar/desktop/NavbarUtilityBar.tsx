import Link from 'next/link';
import Image from 'next/image';

import Calendar from './Calendar';
import NavbarUtilityLink from './NavbarUtilityLink';

import { utilityNavItems } from '@/data';

import { ROUTE } from '@/constants';

import type { CalendarRead } from '@/api/services/calendar.service';

type NavbarUtilityBarProps = {
  calendar: CalendarRead | null;
};

export default function NavbarUtilityBar({ calendar }: NavbarUtilityBarProps) {
  return (
    <div className="border-grey-25 flex items-center justify-between border-b px-4 py-2 md:px-10 xl:px-22">
      <Link href={ROUTE.PERSONAL}>
        <Image
          src="/icons/everest-bank-logo.svg"
          alt="Everest Bank"
          width={246}
          height={36}
          priority
        />
      </Link>
      <nav
        aria-label="Utility links"
        className="text-body-4-desktop flex items-center gap-4"
      >
        {utilityNavItems.map((item) =>
          item.label === 'Calendar' ? (
            <Calendar key={item.label} label={item.label} calendar={calendar} />
          ) : (
            <NavbarUtilityLink key={item.label} {...item} />
          ),
        )}
      </nav>
    </div>
  );
}
