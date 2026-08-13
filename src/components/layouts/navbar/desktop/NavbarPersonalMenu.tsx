import Link from 'next/link';

import { ArrowUpRightIcon, MountainOutlineIcon } from '@/components/icons';

import { personalMenuColumns, type PersonalMenuColumn } from '@/data';

function NavbarPersonalMenuColumn({
  label,
  icon: Icon,
  links,
}: PersonalMenuColumn) {
  return (
    <div className="flex w-[274px] flex-col gap-2">
      <div className="flex items-center gap-2 py-2">
        <Icon className="text-grey-500 size-4 shrink-0" />
        <p className="text-body-2-desktop-md text-grey-500">{label}</p>
      </div>
      <div className="flex flex-col gap-4 pl-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-body-3-desktop text-grey-500 transition-colors hover:text-red-500"
          >
            {link.label}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function NavbarPersonalMenu() {
  const [accounts, cards, loans, digitalBanking, investments, services] =
    personalMenuColumns;

  return (
    <div
      role="region"
      aria-label="Personal banking menu"
      className="border-grey-50 w-full border-t bg-white pt-6 pr-8 pb-12 pl-22 shadow-lg"
    >
      <div className="flex w-full items-start justify-between">
        <NavbarPersonalMenuColumn {...accounts} />
        <NavbarPersonalMenuColumn {...cards} />
        <NavbarPersonalMenuColumn {...loans} />
        <NavbarPersonalMenuColumn {...digitalBanking} />
      </div>
      <div className="mt-11 flex items-end gap-[59px]">
        <div className="flex items-start gap-[59px]">
          <NavbarPersonalMenuColumn {...investments} />
          <NavbarPersonalMenuColumn {...services} />
        </div>
        <Link
          href="#"
          className="relative ml-auto flex h-[120px] w-full max-w-[598px] items-end justify-center overflow-hidden rounded-lg rounded-tl-[80px] bg-orange-50 px-10 py-4 transition-opacity hover:opacity-90"
        >
          <MountainOutlineIcon className="pointer-events-none absolute right-0 bottom-0 h-[135px] w-auto text-orange-100" />
          <div className="relative z-10 flex w-full max-w-[518px] items-start justify-between">
            <p className="font-heading text-heading-h4-desktop-md text-[#49423c]">
              Apply for your visa card
            </p>
            <ArrowUpRightIcon className="size-6 shrink-0 text-[#450b03]" />
          </div>
        </Link>
      </div>
    </div>
  );
}
