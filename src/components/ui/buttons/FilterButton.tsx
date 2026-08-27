import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { tv } from 'tailwind-variants';

type FilterButtonProps = {
  active?: boolean;
  leftIcon?: ReactNode;
  children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export const filterButtonClasses = tv({
  base: 'text-body-3-desktop inline-flex h-[36px] cursor-pointer items-center justify-center gap-1 rounded-full border px-4 py-2 whitespace-nowrap transition-colors duration-200 ease-in-out disabled:cursor-not-allowed disabled:opacity-50',
  variants: {
    active: {
      true: 'border-red-500 text-red-500',
      false: 'border-cream-75 text-grey-400 hover:border-grey-300',
    },
  },
  defaultVariants: {
    active: false,
  },
});

export default function FilterButton({
  active = false,
  leftIcon,
  className,
  children,
  ...otherProps
}: FilterButtonProps) {
  return (
    <button
      type="button"
      className={filterButtonClasses({ active, className })}
      {...otherProps}
    >
      {leftIcon && <span className="inline-flex shrink-0">{leftIcon}</span>}
      {children}
    </button>
  );
}
