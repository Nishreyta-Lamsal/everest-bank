import type { ComponentPropsWithoutRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const cardVariants = cva(' w-full rounded-lg p-3', {
  variants: {
    variant: {
      primary: 'border border-white bg-white-alpha-70',
      secondary: 'bg-white-alpha-70',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

type CardProps = ComponentPropsWithoutRef<'div'> &
  VariantProps<typeof cardVariants>;

export function Card({ className, variant = 'primary', ...props }: CardProps) {
  return (
    <div className={cn(cardVariants({ variant, className }))} {...props} />
  );
}

export { cardVariants };
