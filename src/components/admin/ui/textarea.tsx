import * as React from 'react';

import type { VariantProps } from 'class-variance-authority';

import { inputVariants } from '@/components/admin/ui/input';

import { cn } from '@/lib/utils';

type TextareaProps = React.ComponentProps<'textarea'> &
  VariantProps<typeof inputVariants> & {
    containerClassName?: string;
  };

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    { className, containerClassName, size, variant, ...props },
    ref,
  ) {
    return (
      <div
        data-slot="textarea-container"
        className={cn(
          inputVariants({ size, variant }),
          'h-[78px] items-start',
          containerClassName,
        )}
      >
        <textarea
          ref={ref}
          data-slot="textarea"
          className={cn(
            'placeholder:text-black-alpha-40 w-full min-w-0 resize-none border-none bg-transparent p-0 text-base outline-none disabled:cursor-not-allowed md:text-sm',
            className,
          )}
          autoComplete="off"
          {...props}
        />
      </div>
    );
  },
);

export { Textarea };
