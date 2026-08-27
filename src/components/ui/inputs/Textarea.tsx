import type { ComponentPropsWithoutRef } from 'react';

import { ChevronDownIcon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import { fieldElementClasses, fieldRowClasses } from './fieldStyles';

type TextareaProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'textarea'>, 'className'>;

export default function Textarea({
  label,
  hint,
  error,
  className,
  id,
  ...textareaProps
}: TextareaProps) {
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
        'h-[96px] items-start px-4 py-3.5',
      )}
    >
      <ChevronDownIcon className="text-grey-300 mt-0.5 size-[16px] shrink-0" />
      <textarea
        id={fieldId}
        className={cn(fieldElementClasses(), 'h-full resize-none')}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...textareaProps}
      />
    </FieldShell>
  );
}
