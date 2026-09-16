'use client';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { FormField } from '@/types/admin';

type FormFieldRowProps = {
  field: FormField;
  isOpen: boolean;
  onToggle: () => void;
};

export default function FormFieldRow({
  field,
  isOpen,
  onToggle,
}: FormFieldRowProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 px-2 py-2 transition-colors',
        isOpen
          ? 'rounded-t-lg bg-slate-100'
          : 'hover:bg-black-alpha-5 rounded-lg',
      )}
    >
      <icon.dragHandle className="size-4 shrink-0 text-slate-400" />

      <button
        type="button"
        onClick={onToggle}
        className="flex min-w-0 flex-1 cursor-pointer items-center gap-1.5 text-left"
      >
        <span className="truncate text-[14px] text-neutral-900">
          {field.label}
        </span>
        {field.is_required && <span className="text-red-500">*</span>}
        {!field.is_active && (
          <span className="text-[11px] text-neutral-500">(hidden)</span>
        )}
      </button>

      <button
        type="button"
        onClick={onToggle}
        aria-label={
          isOpen ? `Collapse ${field.label}` : `Expand ${field.label}`
        }
        aria-expanded={isOpen}
        className="flex size-6 shrink-0 cursor-pointer items-center justify-center text-[#7d7c7d]"
      >
        <icon.chevronDown
          className={cn('size-4 transition-transform', isOpen && 'rotate-180')}
        />
      </button>
    </div>
  );
}
