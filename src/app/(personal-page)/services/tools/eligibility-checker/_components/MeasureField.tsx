import { useId } from 'react';

import RangeSlider from '@/components/ui/inputs/RangeSlider';

import { cn } from '@/lib/utils';

type MeasureFieldProps = {
  label: string;
  unit: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onValueChange: (value: number) => void;
  withSlider?: boolean;
};

export default function MeasureField({
  label,
  unit,
  value,
  min,
  max,
  step,
  onValueChange,
  withSlider = false,
}: MeasureFieldProps) {
  const labelId = useId();
  const inputId = useId();

  const clampedValue = Math.min(Math.max(value, min), max);

  function handleChange(rawValue: string) {
    const numericValue = Number(rawValue.replace(/[^\d.]/g, ''));

    if (!Number.isNaN(numericValue)) {
      onValueChange(Math.min(Math.max(numericValue, min), max));
    }
  }

  return (
    <div className="flex w-full flex-col justify-center gap-2">
      <label
        id={labelId}
        htmlFor={inputId}
        className="text-body-2-mobile lg:text-body-1-desktop text-grey-400"
      >
        {label}
      </label>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
        {withSlider && (
          <RangeSlider
            aria-labelledby={labelId}
            value={clampedValue}
            min={min}
            max={max}
            step={step}
            onChange={(event) => onValueChange(Number(event.target.value))}
            className="lg:flex-1"
          />
        )}
        <div
          className={cn(
            'flex h-[52px] w-full items-center',
            withSlider && 'lg:w-[280px]',
          )}
        >
          <input
            id={inputId}
            inputMode="decimal"
            value={value}
            onChange={(event) => handleChange(event.target.value)}
            onBlur={() => onValueChange(clampedValue)}
            className="border-grey-100 text-body-2-mobile-md lg:text-body-2-desktop-md text-grey-300 h-full min-w-0 flex-1 rounded-l-[8px] border bg-transparent px-4 outline-none"
          />
          <div className="border-grey-100 text-body-2-mobile-md lg:text-body-2-desktop-md text-grey-300 -ml-px flex h-full w-[100px] shrink-0 items-center justify-center rounded-r-[8px] border px-4 lg:w-[127px]">
            {unit}
          </div>
        </div>
      </div>
    </div>
  );
}
