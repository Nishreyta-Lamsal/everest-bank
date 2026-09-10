import type { ComponentPropsWithoutRef } from 'react';

import { icon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import {
  fieldElementClasses,
  fieldRowClasses,
  fieldRowLayoutClasses,
  type FieldVariant,
} from './fieldStyles';

export type SelectFieldOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  variant?: FieldVariant;
  options: SelectFieldOption[];
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<'select'>, 'className'>;

export default function SelectField({
  label,
  hint,
  error,
  className,
  variant = 'primary',
  options,
  placeholder,
  id,
  defaultValue,
  ...selectProps
}: SelectFieldProps) {
  const { fieldId, hintId, errorId, isError, describedBy } = useFieldA11y(
    id,
    hint,
    error,
  );

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
        'relative',
      )}
    >
      <select
        id={fieldId}
        className={cn(fieldElementClasses({ variant }), 'appearance-none pr-6')}
        aria-invalid={isError}
        aria-describedby={describedBy}
        defaultValue={defaultValue ?? (placeholder ? '' : undefined)}
        {...selectProps}
      >
        {placeholder && (
          <option value="" disabled hidden>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <icon.chevronDown
        className={cn(
          'pointer-events-none absolute right-4 shrink-0',
          variant === 'secondary'
            ? 'text-grey-400 size-[16px]'
            : 'text-grey-300 size-[14px]',
        )}
      />
    </FieldShell>
  );
}
