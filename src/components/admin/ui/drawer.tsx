'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type DrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
};

export function Drawer({
  isOpen,
  onClose,
  title,
  description,
  children,
  footer,
  className,
}: DrawerProps) {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  const [isEntering, setIsEntering] = useState(false);

  useEffect(
    function () {
      if (!isOpen) return;

      triggerRef.current = document.activeElement;
      panelRef.current?.focus();

      const frame = requestAnimationFrame(() => setIsEntering(true));

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') onClose();
      }

      document.addEventListener('keydown', handleKeyDown);

      return function () {
        cancelAnimationFrame(frame);
        document.removeEventListener('keydown', handleKeyDown);

        if (triggerRef.current instanceof HTMLElement) {
          triggerRef.current.focus();
        }
      };
    },
    [isOpen, onClose],
  );

  if (!isOpen) return null;

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-100 flex justify-end bg-black/40 transition-opacity duration-300',
        isEntering ? 'opacity-100' : 'opacity-0',
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'flex h-full w-full max-w-[480px] flex-col bg-white shadow-lg transition-transform duration-300 ease-in-out outline-none',
          isEntering ? 'translate-x-0' : 'translate-x-full',
          className,
        )}
      >
        <div className="flex items-start justify-between gap-4 border-b border-black/5 px-6 py-4">
          <div className="flex min-w-0 flex-col gap-1">
            <p
              id={titleId}
              className="text-[18px] font-semibold text-neutral-900"
            >
              {title}
            </p>
            {description && (
              <p className="text-[12px] text-neutral-700 opacity-[0.72]">
                {description}
              </p>
            )}
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="shrink-0 cursor-pointer text-slate-600 transition-colors hover:text-slate-950"
          >
            <icon.close className="size-4" />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-5">
          {children}
        </div>

        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-black/5 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body,
  );
}
