import Image from 'next/image';
import Link from 'next/link';

import { ArrowUpRightIcon } from '@/components/icons';

import { ROUTE } from '@/constants';
import { emiCalculatorSocialLinks } from '../_data/social-links';

export default function EMICalculatorSidebar() {
  return (
    <aside className="flex w-full flex-col items-start gap-7 lg:max-w-[405px] lg:gap-8 lg:pb-8">
      <Link
        href={`${ROUTE.LOANS}/home-loans`}
        className="group relative block h-[201px] w-full overflow-hidden rounded-lg md:h-[250px] lg:rounded-tl-[124px]"
      >
        <Image
          src="/images/tools/home-loan.png"
          alt="A family relaxing together at home"
          fill
          className="object-cover object-[50%_60%] transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-linear-to-b from-[rgba(102,102,102,0)] to-[rgba(0,0,0,0.8)]" />
        <div className="absolute right-4 bottom-4 left-4 flex items-center justify-between lg:right-6 lg:bottom-5 lg:left-6">
          <p className="font-heading text-title-1-desktop lg:text-heading-h3-desktop text-white">
            Home Loan
          </p>
          <ArrowUpRightIcon className="size-[22px] shrink-0 text-white lg:size-[24px]" />
        </div>
      </Link>

      <div className="flex items-center gap-3.5 lg:gap-4 lg:py-4">
        <p className="text-body-3-desktop-md text-grey-500">Follow us on:</p>
        <div className="flex items-center gap-4.5">
          {emiCalculatorSocialLinks.map(({ label, href, icon: Icon }) => (
            <Link
              key={label}
              href={href}
              aria-label={label}
              className="text-grey-400 transition-colors hover:text-red-500"
            >
              <Icon className="size-[18px]" />
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
}
