'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { icon } from '@/components/icons';

import { useDismissableOverlay } from '@/hooks/useDismissableOverlay';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  className?: string;
};

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  className,
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useDismissableOverlay(isOpen, onClose);

  useEffect(() => {
    if (!isOpen) return;

    triggerRef.current = document.activeElement;
    dialogRef.current?.focus();

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      if (triggerRef.current instanceof HTMLElement) {
        triggerRef.current.focus();
      }
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="animate-in fade-in fixed inset-0 z-100 flex items-center justify-center bg-black/50 p-4 duration-200"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className={cn(
          'animate-in fade-in zoom-in-95 flex max-h-[90vh] w-[90vw] max-w-[1200px] flex-col rounded-lg bg-white shadow-lg outline-none duration-150 ease-out',
          className,
        )}
      >
        <div className="border-grey-50 flex items-center justify-between border-b px-5 py-5">
          <h2 id={titleId} className="text-heading-h5-desktop-md text-grey-500">
            {title}
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="text-grey-500 cursor-pointer -outline-offset-2 transition-colors hover:text-red-500 focus-visible:outline-red-600"
          >
            <icon.close className="size-[20px]" />
          </button>
        </div>
        <div className="flex min-h-0 flex-1 flex-col overflow-y-auto">
          {children}
        </div>
      </div>
    </div>,
    document.body,
  );
}
