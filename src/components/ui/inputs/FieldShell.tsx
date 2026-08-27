import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

import { fieldLabelClasses, type FieldVariant } from './fieldStyles';

type FieldShellProps = {
  fieldId: string;
  hintId: string;
  errorId: string;
  isError: boolean;
  label?: string;
  hint?: string;
  error?: string;
  className?: string;
  rowClassName: string;
  variant?: FieldVariant;
  children: ReactNode;
};

export default function FieldShell({
  fieldId,
  hintId,
  errorId,
  isError,
  label,
  hint,
  error,
  className,
  rowClassName,
  variant = 'primary',
  children,
}: FieldShellProps) {
  return (
    <div className={cn('flex w-full flex-col items-start gap-2', className)}>
      {label && (
        <label htmlFor={fieldId} className={fieldLabelClasses({ variant })}>
          {label}
        </label>
      )}
      <div className={rowClassName}>{children}</div>
      {isError ? (
        <p id={errorId} className="text-caption-1 text-danger-700">
          {error}
        </p>
      ) : (
        hint && (
          <p id={hintId} className="text-caption-1 text-grey-300">
            {hint}
          </p>
        )
      )}
    </div>
  );
}
