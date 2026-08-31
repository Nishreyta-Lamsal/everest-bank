import type { ComponentPropsWithoutRef, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type GradientCardProps = {
  children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function GradientCard({
  className,
  children,
  ...otherProps
}: GradientCardProps) {
  return (
    <div
      className={cn(
        'w-full rounded-2xl bg-linear-to-l from-[#fbc999] via-[#ffe8c8] to-[#fbc999]',
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  );
}
