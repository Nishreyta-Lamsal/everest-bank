'use client';

import { useState } from 'react';
import Link from 'next/link';

import { ChevronDownIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { FooterAccordionColumnProps } from '@/types';

export default function FooterAccordionColumn({
  column,
  isLast = false,
}: FooterAccordionColumnProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = `footer-accordion-${column.title.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div
      className={cn(
        'border-grey-bluish-grey w-full border-b',
        isLast && 'border-b-0',
      )}
    >
      <h3>
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center justify-between px-4 py-6"
        >
          <span className="font-heading text-title-2-mobile-md text-grey-500">
            {column.title}
          </span>
          <ChevronDownIcon
            className={cn(
              'text-grey-500 size-[16px] shrink-0 transition-transform',
              isOpen && 'rotate-180',
            )}
          />
        </button>
      </h3>
      {isOpen && (
        <div id={panelId} className="flex flex-col items-start gap-4 px-4 pb-6">
          {column.links.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-grey-400 text-body-3-mobile transition-colors hover:text-red-500"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
