'use client';

import { Select as SelectPrimitive } from '@base-ui/react/select';
import { cva, type VariantProps } from 'class-variance-authority';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

const selectTriggerVariants = cva(
  'flex w-full items-center justify-between gap-2 rounded-lg border border-solid text-left outline-none transition-colors data-[disabled]:pointer-events-none data-[disabled]:border-black-alpha-5 data-[disabled]:bg-white-alpha-50 data-[disabled]:opacity-32 data-[popup-open]:border-[rgba(7,135,255,0.32)] data-[popup-open]:bg-white-alpha-50 data-[popup-open]:shadow-[0px_0px_0px_1.5px_rgba(0,59,215,0.12)]',
  {
    variants: {
      size: {
        small: 'px-3 py-2',
        medium: 'px-3 py-2.5',
      },
      variant: {
        default: 'border-black-alpha-10 bg-white-alpha-80',
        filled: 'border-black-alpha-5 bg-white-alpha-50',
      },
    },
    defaultVariants: {
      size: 'medium',
      variant: 'default',
    },
  },
);

export type SelectOption = {
  label: string;
  value: string;
};

type SelectProps = VariantProps<typeof selectTriggerVariants> & {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  id?: string;
  className?: string;
};

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = 'Select…',
  disabled,
  name,
  id,
  size,
  variant,
  className,
}: SelectProps) {
  return (
    <SelectPrimitive.Root
      items={options}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(nextValue) => onValueChange?.(nextValue ?? '')}
      disabled={disabled}
      name={name}
      id={id}
    >
      <SelectPrimitive.Trigger
        className={cn(selectTriggerVariants({ size, variant }), className)}
      >
        <SelectPrimitive.Value
          placeholder={placeholder}
          className="data-[placeholder]:text-black-alpha-40 min-w-0 truncate text-sm text-neutral-950"
        />
        <SelectPrimitive.Icon className="flex shrink-0 items-center">
          <icon.chevronDown className="size-4 text-neutral-900" />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          sideOffset={4}
          className="z-50 outline-none"
        >
          <SelectPrimitive.Popup className="border-black-alpha-10 max-h-[min(24rem,var(--available-height))] w-[var(--anchor-width)] overflow-y-auto rounded-lg border bg-white p-1 shadow-lg outline-none">
            {options.map((option) => (
              <SelectPrimitive.Item
                key={option.value}
                value={option.value}
                className="flex cursor-pointer items-center justify-between gap-2 rounded-md px-3 py-2 text-sm text-neutral-900 outline-none data-[highlighted]:bg-slate-100"
              >
                <SelectPrimitive.ItemText>
                  {option.label}
                </SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}
