import type { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

import { icon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import { fieldElementClasses, fieldRowClasses } from './fieldStyles';

type CardNumberFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'>;

export default function CardNumberField({
  label,
  hint,
  error,
  className,
  id,
  ...inputProps
}: CardNumberFieldProps) {
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
        'h-[48px] items-center overflow-hidden py-1.5 pr-4',
      )}
    >
      <div className="flex h-full shrink-0 items-center pr-2">
        <div className="border-grey-100 relative h-[24px] w-[34px] shrink-0 overflow-clip rounded-[4px] border bg-white">
          <Image
            src="/images/payment-methods/mastercard.svg"
            alt="Mastercard"
            fill
            className="object-contain"
          />
        </div>
      </div>
      <input
        id={fieldId}
        type="text"
        inputMode="numeric"
        className={fieldElementClasses()}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...inputProps}
      />
      <icon.chevronDown className="text-grey-300 size-[14px] shrink-0" />
    </FieldShell>
  );
}
