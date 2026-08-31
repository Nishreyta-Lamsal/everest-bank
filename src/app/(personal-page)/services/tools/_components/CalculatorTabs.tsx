'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ChevronDownIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import { calculatorTabs } from '../_data/calculator-tabs';

type CalculatorTabsProps = {
  activeHref: string;
};

export default function CalculatorTabs({ activeHref }: CalculatorTabsProps) {
  const router = useRouter();

  return (
    <div className="w-full rounded-[200px] border border-white/18 bg-white/16 p-2 backdrop-blur-[3px] lg:w-auto">
      <div className="relative lg:hidden">
        <select
          aria-label="Select calculator"
          value={activeHref}
          onChange={(event) => router.push(event.target.value)}
          className="text-body-3-mobile text-grey-400 h-[38px] w-full appearance-none rounded-[100px] bg-white px-4 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          {/* {calculatorTabs.map((tab) => (
            <option key={tab.href} value={tab.href}>
              {tab.label}
            </option>
          ))} */}
        </select>
        <ChevronDownIcon className="text-grey-400 pointer-events-none absolute top-1/2 right-4 size-[18px] -translate-y-1/2" />
      </div>

      <nav aria-label="Calculator tools" className="hidden lg:block">
        <ul className="flex gap-2">
          {calculatorTabs.map((tab) => {
            const isActive = tab.href === activeHref;

            return (
              <li key={tab.href} className="shrink-0">
                <Link
                  href={tab.href}
                  aria-current={isActive ? 'page' : undefined}
                  className={cn(
                    'text-body-3-desktop flex items-center justify-center rounded-[100px] px-4 py-2 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white',
                    isActive
                      ? 'text-grey-400 bg-white'
                      : 'text-white hover:bg-white/10',
                  )}
                >
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
