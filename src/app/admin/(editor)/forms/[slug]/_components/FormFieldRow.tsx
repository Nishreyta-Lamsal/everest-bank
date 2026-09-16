'use client';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import { FIELD_TYPE_LABELS } from './field-options';

import type { FormField } from '@/types/admin';

type FormFieldRowProps = {
  field: FormField;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
  disabled: boolean;
  onSelect: () => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
};

export default function FormFieldRow({
  field,
  isSelected,
  isFirst,
  isLast,
  disabled,
  onSelect,
  onMoveUp,
  onMoveDown,
}: FormFieldRowProps) {
  return (
    <div
      className={cn(
        'flex w-full items-center gap-2 rounded-lg px-2 py-2 transition-colors',
        isSelected ? 'bg-slate-100' : 'hover:bg-black-alpha-5',
      )}
    >
      <div className="flex shrink-0 flex-col">
        <button
          type="button"
          aria-label={`Move ${field.label} up`}
          disabled={isFirst || disabled}
          onClick={onMoveUp}
          className="flex size-4 cursor-pointer items-center justify-center text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <icon.chevronDown className="size-3 rotate-180" />
        </button>
        <button
          type="button"
          aria-label={`Move ${field.label} down`}
          disabled={isLast || disabled}
          onClick={onMoveDown}
          className="flex size-4 cursor-pointer items-center justify-center text-slate-500 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <icon.chevronDown className="size-3" />
        </button>
      </div>

      <button
        type="button"
        onClick={onSelect}
        className="flex min-w-0 flex-1 cursor-pointer flex-col items-start gap-0.5 text-left"
      >
        <span className="flex w-full min-w-0 items-center gap-1.5">
          <span className="truncate text-[14px] text-neutral-900">
            {field.label}
          </span>
          {field.is_required && <span className="text-red-500">*</span>}
          {!field.is_active && (
            <span className="text-[11px] text-neutral-500">(hidden)</span>
          )}
        </span>
        <span className="truncate text-[12px] text-neutral-700/68">
          {FIELD_TYPE_LABELS[field.field_type]}
          {field.width === 'half' && ' · half width'}
        </span>
      </button>

      <icon.chevronRight className="size-4 shrink-0 text-[#7d7c7d]" />
    </div>
  );
}
