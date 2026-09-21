import { useId } from 'react';

import RangeSlider from '@/components/ui/inputs/RangeSlider';

import { cn } from '@/lib/utils';

import type { ReactNode } from 'react';

type SliderFieldProps = {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  prefix: ReactNode;
  trailing?: ReactNode;
  formatValue?: (value: number) => string;
  className?: string;
};

export default function SliderField({
  label,
  value,
  min,
  max,
  step,
  onValueChange,
  prefix,
  trailing,
  formatValue = String,
  className,
}: SliderFieldProps) {
  const labelId = useId();
  const inputId = useId();

  function handleInputChange(rawValue: string) {
    const numericValue = Number(rawValue.replace(/[^\d.]/g, ''));

    if (!Number.isNaN(numericValue)) {
      onValueChange(Math.min(Math.max(numericValue, min), max));
    }
  }

  function handleBlur() {
    onValueChange(Math.min(Math.max(value, min), max));
  }

  return (
    <div className={cn('flex w-full flex-col gap-6 lg:gap-2', className)}>
      <label
        id={labelId}
        htmlFor={inputId}
        className="text-body-2-mobile lg:text-body-1-desktop text-grey-400"
      >
        {label}
      </label>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        <RangeSlider
          aria-labelledby={labelId}
          value={Math.min(Math.max(value, min), max)}
          min={min}
          max={max}
          step={step}
          onChange={(event) => onValueChange(Number(event.target.value))}
          className="lg:flex-1"
        />
        <div className="flex h-[52px] w-full items-center lg:w-[280px]">
          <div className="border-grey-100 text-body-2-mobile-md lg:text-body-3-desktop-md text-grey-300 flex h-full shrink-0 items-center rounded-l-[8px] border px-6 lg:w-[76px] lg:justify-center lg:px-4">
            {prefix}
          </div>
          <div className="border-grey-100 -ml-px flex h-full min-w-0 flex-1 items-center justify-between gap-2 rounded-r-[8px] border px-4">
            <input
              id={inputId}
              inputMode="decimal"
              value={formatValue(value)}
              onChange={(event) => handleInputChange(event.target.value)}
              onBlur={handleBlur}
              className="text-body-2-mobile-md lg:text-body-3-desktop-md text-grey-300 w-full min-w-0 border-none bg-transparent outline-none"
            />
            {trailing}
          </div>
        </div>
      </div>
    </div>
  );
}
