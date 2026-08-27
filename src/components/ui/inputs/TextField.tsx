import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import {
  fieldElementClasses,
  fieldRowClasses,
  fieldRowLayoutClasses,
  type FieldVariant,
} from './fieldStyles';

type TextFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  variant?: FieldVariant;
  trailingIcon?: ReactNode;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className'>;

export default function TextField({
  label,
  hint,
  error,
  className,
  variant = 'primary',
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
      variant={variant}
      rowClassName={cn(
        fieldRowClasses({ variant, error: isError }),
        fieldRowLayoutClasses({ variant }),
      )}
    >
      <input
        id={fieldId}
        className={fieldElementClasses({ variant })}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...inputProps}
      />
      {trailingIcon}
    </FieldShell>
  );
}
