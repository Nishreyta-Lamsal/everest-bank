import { tv } from 'tailwind-variants';

export type FieldVariant = 'primary' | 'secondary';

export const fieldRowClasses = tv({
  base: 'flex w-full justify-between gap-2',
  variants: {
    variant: {
      primary: 'rounded-[8px] bg-white',
      secondary: 'bg-grey-bluish-grey rounded-[4px]',
    },
    error: {
      true: 'border border-danger-100',
      false: '',
    },
  },
  defaultVariants: {
    variant: 'primary',
    error: false,
  },
});

export const fieldRowLayoutClasses = tv({
  base: 'items-center',
  variants: {
    variant: {
      primary: 'h-[48px] px-4 py-1.5',
      secondary: 'h-[48px] px-4 py-1.5',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const fieldElementClasses = tv({
  base: 'text-body-4-desktop w-full min-w-0 border-none bg-transparent outline-none',
  variants: {
    variant: {
      primary: 'text-grey-300 placeholder:text-grey-300',
      secondary: 'text-grey-400 placeholder:text-grey-400',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});

export const fieldLabelClasses = tv({
  base: 'text-body-4-desktop',
  variants: {
    variant: {
      primary: 'text-grey-500',
      secondary: 'text-grey-400',
    },
  },
  defaultVariants: {
    variant: 'primary',
  },
});
