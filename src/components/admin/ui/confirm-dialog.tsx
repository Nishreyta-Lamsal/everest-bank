'use client';

import { useEffect, useId, useRef } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/admin/ui/button';

import type { ReactNode } from 'react';

type ConfirmDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description?: ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  isPending?: boolean;
  error?: string;
};

export function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Delete',
  cancelLabel = 'Cancel',
  isPending,
  error,
}: ConfirmDialogProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);

  useEffect(
    function () {
      if (!isOpen) return;

      triggerRef.current = document.activeElement;
      dialogRef.current?.focus();

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') onClose();
      }

      document.addEventListener('keydown', handleKeyDown);

      return function () {
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
      className="fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        className="flex w-full max-w-[420px] flex-col gap-4 rounded-[12px] bg-white p-6 shadow-lg outline-none"
      >
        <div className="flex flex-col gap-2">
          <p
            id={titleId}
            className="text-[18px] font-semibold text-neutral-900"
          >
            {title}
          </p>
          {description && (
            <div className="text-[13px] leading-[1.5] text-neutral-700 opacity-[0.8]">
              {description}
            </div>
          )}
        </div>

        {error && <p className="text-[12px] text-red-600">{error}</p>}

        <div className="flex items-center justify-end gap-3">
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isPending}
          >
            {cancelLabel}
          </Button>
          <Button
            type="button"
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
          >
            {isPending ? 'Deleting…' : confirmLabel}
          </Button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
