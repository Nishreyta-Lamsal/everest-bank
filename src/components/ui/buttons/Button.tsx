import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { tv } from 'tailwind-variants';

type ButtonProps = {
  variant?: 'primary' | 'secondary' | 'secondary-white' | 'tertiary-white';
  size?: 'sm' | 'md' | 'lg';
  shape?: 'pill' | 'rectangular';
  leftIcon?: ReactNode;
  children: ReactNode;
  rightIcon?: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export const buttonClasses = tv({
  base: 'inline-flex cursor-pointer items-center justify-center gap-2 font-medium whitespace-nowrap transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    variant: {
      primary: 'bg-red-500 text-white! hover:bg-red-600',
      secondary:
        'border border-red-600 bg-transparent text-red-600 hover:bg-red-50',
      'secondary-white':
        'border border-white bg-transparent text-white! hover:bg-white hover:text-red-500!',
      'tertiary-white': 'bg-white text-red-500! hover:bg-red-50',
    },
    size: {
      sm: 'h-9 px-6 text-body-4-desktop-md',
      md: 'h-[42px] px-6 text-body-4-desktop-md',
      lg: 'h-[46px] px-6 text-body-3-desktop-md',
    },
    shape: {
      pill: 'rounded-full',
      rectangular: 'rounded-[4px]',
    },
  },
  compoundVariants: [
    {
      shape: 'rectangular',
      size: ['sm', 'md', 'lg'],
      class: 'h-8 px-3 py-1.5 text-body-4-desktop-md',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    size: 'md',
    shape: 'pill',
  },
});

export default function Button({
  variant = 'primary',
  size = 'md',
  shape = 'pill',
  className,
  children,
  leftIcon,
  rightIcon,
  ...otherProps
}: ButtonProps) {
  return (
    <button
      className={buttonClasses({ variant, size, shape, className })}
      {...otherProps}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="inline-flex shrink-0">{rightIcon}</span>}
    </button>
  );
}
