import { cn } from '@/lib/utils';

import { compoundingOptions } from '../_data/fd-calculator';

import type { CompoundingFrequency } from '../_data/fd-calculator';

type CompoundingSelectorProps = {
  value: CompoundingFrequency;
  onValueChange: (value: CompoundingFrequency) => void;
};

export default function CompoundingSelector({
  value,
  onValueChange,
}: CompoundingSelectorProps) {
  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
      <p
        id="compounding-label"
        className="text-body-2-mobile lg:text-body-1-desktop text-grey-400"
      >
        Compounding
      </p>
      <div
        role="radiogroup"
        aria-labelledby="compounding-label"
        className="flex flex-wrap items-start gap-2 lg:gap-4"
      >
        {compoundingOptions.map((option) => {
          const isActive = option.value === value;

          return (
            <button
              key={option.value}
              type="button"
              role="radio"
              aria-checked={isActive}
              onClick={() => onValueChange(option.value)}
              className={cn(
                'text-body-3-mobile lg:text-body-3-desktop flex cursor-pointer items-center justify-center rounded-full px-4 py-2 whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500',
                isActive
                  ? 'border border-red-500 text-red-500'
                  : 'bg-grey-bluish-grey text-grey-300 border border-transparent hover:text-red-500',
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
