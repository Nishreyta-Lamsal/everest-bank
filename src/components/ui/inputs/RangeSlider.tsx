import type { ComponentPropsWithoutRef } from 'react';

import { cn } from '@/lib/utils';

type RangeSliderProps = {
  value: number;
  min: number;
  max: number;
  className?: string;
} & Omit<
  ComponentPropsWithoutRef<'input'>,
  'type' | 'value' | 'min' | 'max' | 'className'
>;

export default function RangeSlider({
  value,
  min,
  max,
  className,
  ...otherProps
}: RangeSliderProps) {
  const filledPercentage =
    max === min ? 0 : ((value - min) / (max - min)) * 100;

  return (
    <input
      type="range"
      value={value}
      min={min}
      max={max}
      style={{
        backgroundImage: `linear-gradient(to right, var(--color-orange-500) 0 ${filledPercentage}%, transparent ${filledPercentage}% 100%)`,
      }}
      className={cn(
        'h-[6px] w-full cursor-pointer appearance-none rounded-[4px] bg-orange-500/16 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 lg:h-[8px]',
        '[&::-webkit-slider-thumb]:size-[20px] [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-orange-500 lg:[&::-webkit-slider-thumb]:size-[24px]',
        '[&::-moz-range-thumb]:size-[20px] [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:bg-orange-500 lg:[&::-moz-range-thumb]:size-[24px]',
        className,
      )}
      {...otherProps}
    />
  );
}
