import { useRef } from 'react';

import FieldShell from '@/components/ui/inputs/FieldShell';
import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import {
  fieldElementClasses,
  fieldRowClasses,
  fieldRowLayoutClasses,
  type FieldVariant,
} from './fieldStyles';

import type { ComponentPropsWithoutRef } from 'react';

type DatePickerFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  variant?: FieldVariant;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'>;

export default function DatePickerField({
  label,
  hint,
  error,
  className,
  variant = 'primary',
  id,
  ...inputProps
}: DatePickerFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldId, hintId, errorId, isError, describedBy } = useFieldA11y(
    id,
    hint,
    error,
  );

  function openPicker() {
    const input = inputRef.current;

    if (!input) return;

    input.focus();

    if (typeof input.showPicker === 'function') {
      input.showPicker();
    }
  }

  return (
    <FieldShell
      fieldId={fieldId}
      hintId={hintId}
      errorId={errorId}
      isError={isError}
      label={label}
      hint={hint}
      error={error}
      className={className}
      variant={variant}
      rowClassName={cn(
        fieldRowClasses({ variant, error: isError }),
        fieldRowLayoutClasses({ variant }),
      )}
    >
      <input
        ref={inputRef}
        id={fieldId}
        type="date"
        className={cn(
          fieldElementClasses({ variant }),
          '[&::-webkit-calendar-picker-indicator]:hidden',
        )}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...inputProps}
      />
      <button
        type="button"
        onClick={openPicker}
        aria-label="Choose date"
        className="text-grey-400 flex size-4 shrink-0 cursor-pointer items-center justify-center self-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500"
      >
        <icon.calendar aria-hidden="true" className="size-4" />
      </button>
    </FieldShell>
  );
}
