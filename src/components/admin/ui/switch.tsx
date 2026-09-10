'use client';

import * as React from 'react';

import { Switch as SwitchPrimitive } from '@base-ui/react/switch';

import { cn } from '@/lib/utils';

type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

function Switch({ className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        'relative inline-flex h-[16px] w-[28px] shrink-0 cursor-pointer items-center rounded-full bg-[#d2d5da] transition-colors outline-none data-[checked]:bg-blue-500',
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="block size-[12px] translate-x-0.5 rounded-full bg-white shadow-[0px_1.556px_3.111px_0px_rgba(39,39,39,0.1)] transition-transform data-[checked]:translate-x-[13px]"
      />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
