'use client';

import { useState, type ReactNode } from 'react';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

type ProductSectionCardProps = {
  title: string;
  description?: string;
  defaultOpen?: boolean;
  children: ReactNode;
};

export default function ProductSectionCard({
  title,
  description,
  defaultOpen = true,
  children,
}: ProductSectionCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="bg-white-alpha-70 flex w-full flex-col gap-3 rounded p-2">
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        className="flex w-full items-center gap-1"
      >
        <div className="flex flex-1 flex-col items-start gap-1 text-left">
          <p className="text-[16px] leading-[1.4] font-semibold text-neutral-900">
            {title}
          </p>
          {description && (
            <p className="text-[12px] leading-[1.2] text-neutral-700 opacity-[0.72]">
              {description}
            </p>
          )}
        </div>
        <icon.chevronDown
          className={cn(
            'size-4 shrink-0 text-neutral-900 transition-transform',
            !isOpen && '-rotate-90',
          )}
        />
      </button>
      {isOpen && <div className="flex w-full flex-col gap-3">{children}</div>}
    </div>
  );
}
