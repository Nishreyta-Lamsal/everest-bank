import { tv } from 'tailwind-variants';

export const fieldRowClasses = tv({
  base: 'flex w-full justify-between gap-2 rounded-[8px] bg-white',
  variants: {
    error: {
      true: 'border border-danger-100',
      false: '',
    },
  },
  defaultVariants: {
    error: false,
  },
});

export const fieldElementClasses =
  'w-full min-w-0 border-none bg-transparent text-body-4-desktop text-grey-300 outline-none placeholder:text-grey-300';
