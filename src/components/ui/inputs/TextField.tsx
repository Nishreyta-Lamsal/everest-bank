import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { ChevronDownIcon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import { fieldElementClasses, fieldRowClasses } from './fieldStyles';

type TextFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  trailingIcon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className'>;

export default function TextField({
  label,
  hint,
  error,
  className,
  trailingIcon,
  id,
  ...inputProps
}: TextFieldProps) {
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
        'h-[48px] items-center px-4 py-1.5',
      )}
    >
      <input
        id={fieldId}
        className={fieldElementClasses}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {trailingIcon}
    </FieldShell>
  );
}
