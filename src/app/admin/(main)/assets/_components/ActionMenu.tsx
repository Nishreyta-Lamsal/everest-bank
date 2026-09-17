'use client';

import { useEffect, useRef, useState } from 'react';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

export type ActionMenuItem = {
  label: string;
  iconKey: keyof typeof icon;
  onSelect: () => void;
  isDestructive?: boolean;
};

type ActionMenuProps = {
  label: string;
  items: ActionMenuItem[];
  className?: string;
};

export default function ActionMenu({
  label,
  items,
  className,
}: ActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      if (!isOpen) return;

      function handlePointerDown(event: MouseEvent) {
        if (!menuRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') setIsOpen(false);
      }

      document.addEventListener('mousedown', handlePointerDown);
      document.addEventListener('keydown', handleKeyDown);

      return function () {
        document.removeEventListener('mousedown', handlePointerDown);
        document.removeEventListener('keydown', handleKeyDown);
      };
    },
    [isOpen],
  );

  return (
    <div ref={menuRef} className={cn('relative', className)}>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setIsOpen((open) => !open);
        }}
        aria-label={label}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        className="flex size-7 cursor-pointer items-center justify-center rounded-full bg-white/90 text-[#7d7c7d] transition-colors hover:bg-slate-100 hover:text-slate-950"
      >
        <icon.moreDots className="size-4" />
      </button>

      {isOpen && (
        <div
          role="menu"
          className="absolute top-full right-0 z-20 mt-1 flex min-w-[168px] flex-col rounded-[8px] border border-black/5 bg-white py-1 shadow-lg"
        >
          {items.map((item) => {
            const ItemIcon = icon[item.iconKey];

            return (
              <button
                key={item.label}
                type="button"
                role="menuitem"
                onClick={(event) => {
                  event.stopPropagation();
                  setIsOpen(false);
                  item.onSelect();
                }}
                className={cn(
                  'flex cursor-pointer items-center gap-2 px-3 py-2 text-left text-[14px] transition-colors',
                  item.isDestructive
                    ? 'text-red-600 hover:bg-red-50'
                    : 'text-neutral-900 hover:bg-slate-50',
                )}
              >
                <ItemIcon
                  className={cn(
                    'size-4 shrink-0',
                    !item.isDestructive && 'text-slate-600',
                  )}
                />
                {item.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
