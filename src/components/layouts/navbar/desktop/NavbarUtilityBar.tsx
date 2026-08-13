import Image from 'next/image';

import NavbarUtilityLink from './NavbarUtilityLink';

import { utilityNavItems } from '@/data';

export default function NavbarUtilityBar() {
  return (
    <div className="border-grey-25 flex items-center justify-between border-b px-4 py-2 md:px-10 xl:px-22">
      <Image
        src="/icons/everest-bank-logo.svg"
        alt="Everest Bank"
        width={246}
        height={36}
        priority
      />
      <div className="text-body-4-desktop flex items-center gap-4">
        {utilityNavItems.map((item) => (
          <NavbarUtilityLink key={item.label} {...item} />
        ))}
      </div>
    </div>
  );
}
