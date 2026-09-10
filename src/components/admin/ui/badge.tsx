import type { ComponentPropsWithoutRef } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'text-paragraph-mini-medium inline-flex shrink-0 items-center justify-center gap-1 rounded-sm px-2 py-1.5',
  {
    variants: {
      variant: {
        warning: 'bg-yellow-100 text-yellow-900',
        success: 'bg-green-100 text-green-900',
      },
    },
    defaultVariants: {
      variant: 'warning',
    },
  },
);

type BadgeProps = ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof badgeVariants>;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
