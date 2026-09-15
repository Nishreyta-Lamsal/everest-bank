'use client';

import * as React from 'react';

import { Input as InputPrimitive } from '@base-ui/react/input';
import { cva, type VariantProps } from 'class-variance-authority';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

const inputVariants = cva(
  'group/field flex w-full items-center gap-2 rounded-lg border border-solid transition-colors has-disabled:pointer-events-none has-disabled:border-black-alpha-5 has-disabled:bg-white-alpha-50 has-disabled:opacity-32 has-aria-invalid:border-[rgba(185,28,28,0.4)] has-aria-invalid:bg-white-alpha-50 has-aria-invalid:shadow-[0px_0px_0px_1.5px_rgba(239,68,68,0.24)] has-focus:border-[rgba(7,135,255,0.32)] has-focus:bg-white-alpha-50 has-focus:shadow-[0px_0px_0px_1.5px_rgba(0,59,215,0.12)]',
  {
    variants: {
      size: {
        small: 'px-3 py-2',
        medium: 'px-3 py-2.5',
      },
      variant: {
        default: 'border-black-alpha-10 bg-white-alpha-80',
        filled: 'border-black-alpha-5 bg-white-alpha-50',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  },
);

type InputProps = Omit<React.ComponentProps<typeof InputPrimitive>, 'size'> &
  VariantProps<typeof inputVariants> & {
    containerClassName?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    showKbd?: boolean;
    kbdKey?: string;
  };

const Input = React.forwardRef<
  React.ComponentRef<typeof InputPrimitive>,
  InputProps
>(function Input(
  {
    className,
    containerClassName,
    size,
    variant,
    leftIcon,
    rightIcon,
    showKbd = false,
    kbdKey = 'K',
    ...props
  },
  ref,
) {
  return (
    <div
      data-slot="input-container"
      className={cn(inputVariants({ size, variant }), containerClassName)}
    >
      {leftIcon}
      <InputPrimitive
        ref={ref}
        data-slot="input"
        className={cn(
          'placeholder:text-black-alpha-40 w-full min-w-0 border-none bg-transparent p-0 text-base outline-none disabled:cursor-not-allowed md:text-sm',
          className,
        )}
        autoComplete="off"
        {...props}
      />
      {rightIcon}
      {showKbd && (
        <span className="bg-black-alpha-5 flex shrink-0 items-center gap-1 rounded p-0.5">
          <icon.command className="size-3 text-slate-800" />
          <span className="text-xs leading-none text-slate-800">{kbdKey}</span>
        </span>
      )}
    </div>
  );
});

export { Input, inputVariants };
