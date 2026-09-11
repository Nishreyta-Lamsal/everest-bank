import { Button as ButtonPrimitive } from '@base-ui/react/button';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  "group/button cursor-pointer inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary:
          'bg-blue-500 text-slate-50 shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] hover:bg-blue-400',
        black:
          'bg-slate-950 text-slate-50 shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] hover:bg-slate-700',
        secondary: 'bg-slate-100 text-slate-900 hover:bg-slate-50',
        outline:
          'border border-slate-300 bg-white-alpha-10 text-slate-950 shadow-xs hover:bg-black-alpha-5',
        ghost: 'bg-transparent text-slate-700 hover:bg-black-alpha-5',
        destructive: 'bg-red-600 text-white hover:bg-red-700',
        destructiveGhost: 'bg-transparent text-red-500 hover:bg-red-50',
        ai: 'bg-[linear-gradient(70deg,#003399_0.45%,#1C72FF_100.68%)] text-slate-50 shadow-[inset_0px_0px_8.7px_0px_rgba(255,255,255,0.24),inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] hover:brightness-110',
      },
      size: {
        mini: 'h-6.5 gap-1.5 rounded-lg px-2 py-0.75 text-xs leading-3.5 [&_svg:not([class*="size-"])]:size-3',
        small:
          'min-h-8 gap-1.5 rounded-lg px-3 py-1.5 text-sm leading-5 [&_svg:not([class*="size-"])]:size-4',
        default:
          'min-h-9 gap-2 rounded-lg px-4 py-2 text-sm leading-5 [&_svg:not([class*="size-"])]:size-4',
        large:
          'min-h-10 gap-2 rounded-lg px-6 py-2.5 text-sm leading-5 [&_svg:not([class*="size-"])]:size-4',
        xl: 'min-h-12 gap-2 rounded-lg px-8 py-3 text-base leading-6 [&_svg:not([class*="size-"])]:size-4',
      },
      roundness: {
        default: '',
        round: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'default',
      roundness: 'default',
    },
  },
);
function Button({
  className,
  variant = 'primary',
  size = 'default',
  roundness = 'default',
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, roundness, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
