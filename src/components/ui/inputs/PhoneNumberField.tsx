import type { ComponentPropsWithoutRef } from 'react';
import Image from 'next/image';

import { icon } from '@/components/icons';
import FieldShell from '@/components/ui/inputs/FieldShell';

import { cn } from '@/lib/utils';

import { useFieldA11y } from '@/hooks/useFieldA11y';

import { fieldElementClasses, fieldRowClasses } from './fieldStyles';

type PhoneNumberFieldProps = {
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  countryCode?: string;
  flagSrc?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'>;

export default function PhoneNumberField({
  label,
  hint,
  error,
  className,
  countryCode = '+977',
  flagSrc = '/images/flags/japan.png',
  id,
  ...inputProps
}: PhoneNumberFieldProps) {
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
      <div className="flex h-full shrink-0 items-center gap-2 pr-2">
        <div className="h-[12px] w-[16px] shrink-0 overflow-hidden rounded-[4px]">
          <Image
            src={flagSrc}
            alt=""
            width={16}
            height={12}
            className="h-full w-full object-cover"
          />
        </div>
        <span className="text-body-4-desktop text-grey-500 whitespace-nowrap">
          {countryCode}
        </span>
        <icon.chevronDown className="text-grey-300 size-[10px] shrink-0" />
      </div>
      <input
        id={fieldId}
        type="tel"
        className={fieldElementClasses()}
        aria-invalid={isError}
        aria-describedby={describedBy}
        {...inputProps}
      />
      <icon.chevronDown className="text-grey-300 size-[14px] shrink-0" />
    </FieldShell>
  );
}
