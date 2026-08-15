import type { ComponentPropsWithoutRef } from 'react';

import { ChevronDownIcon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import { fieldElementClasses, fieldRowClasses } from './fieldStyles';

type SelectFieldOption = {
  label: string;
  value: string;
};

type SelectFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  options: SelectFieldOption[];
  placeholder?: string;
} & Omit<ComponentPropsWithoutRef<'select'>, 'className'>;

export default function SelectField({
  label,
  hint,
  error,
  className,
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
      rowClassName={cn(
        fieldRowClasses({ error: isError }),
        'relative h-[48px] items-center px-4 py-1.5',
      )}
    >
      <select
        id={fieldId}
        className={cn(fieldElementClasses, 'appearance-none pr-6')}
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
      <ChevronDownIcon className="text-grey-300 pointer-events-none absolute right-4 size-[14px] shrink-0" />
    </FieldShell>
  );
}
