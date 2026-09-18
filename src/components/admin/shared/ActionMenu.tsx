'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

const MENU_WIDTH = 168;
const VIEWPORT_MARGIN = 8;

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
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(
    function () {
      if (!isOpen) return;

      function place() {
        const trigger = triggerRef.current;

        if (!trigger) return;

        const rect = trigger.getBoundingClientRect();
        const left = Math.min(
          rect.right - MENU_WIDTH,
          window.innerWidth - MENU_WIDTH - VIEWPORT_MARGIN,
        );

        setPosition({
          top: rect.bottom + 4,
          left: Math.max(VIEWPORT_MARGIN, left),
        });
      }

      place();

      window.addEventListener('resize', place);
      // A scroll anywhere can move the trigger, so the menu follows it.
      window.addEventListener('scroll', place, true);

      return function () {
        window.removeEventListener('resize', place);
        window.removeEventListener('scroll', place, true);
      };
    },
    [isOpen],
  );

  useEffect(
    function () {
      if (!isOpen) return;

      function handlePointerDown(event: MouseEvent) {
        const target = event.target as Node;

        if (
          !menuRef.current?.contains(target) &&
          !triggerRef.current?.contains(target)
        ) {
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
    <div className={cn('relative', className)}>
      <button
        ref={triggerRef}
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

      {isOpen &&
        createPortal(
          <div
            ref={menuRef}
            role="menu"
            style={{
              top: `${position.top}px`,
              left: `${position.left}px`,
              width: `${MENU_WIDTH}px`,
            }}
            className="fixed z-100 flex flex-col rounded-[8px] border border-black/5 bg-white py-1 shadow-lg"
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
          </div>,
          document.body,
        )}
    </div>
  );
}
