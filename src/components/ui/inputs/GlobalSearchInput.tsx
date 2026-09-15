import type { ComponentPropsWithoutRef } from 'react';

import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

type GlobalSearchInputProps = {
  label: string;
  className?: string;
} & Omit<ComponentPropsWithoutRef<'input'>, 'className' | 'type'>;

export default function GlobalSearchInput({
  label,
  className,
  ...inputProps
}: GlobalSearchInputProps) {
  return (
    <label
      className={cn(
        'bg-grey-25 text-grey-400 flex h-[32px] items-center gap-1 rounded-[4px] p-4 has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-red-500',
        className,
      )}
    >
      <span className="sr-only">{label}</span>
      <icon.search className="size-[16px] shrink-0" />
      <input
        type="search"
        className="text-body-4-desktop text-grey-400 placeholder:text-grey-400 w-full bg-transparent outline-none"
        {...inputProps}
      />
    </label>
  );
}
