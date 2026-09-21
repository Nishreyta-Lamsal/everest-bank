import { useId } from 'react';

import { icon } from '@/components/icons';

import type { LoanTypeOption } from '../_data/eligibility-checker';

type LoanTypeFieldProps = {
  options: LoanTypeOption[];
  value: string;
  onValueChange: (value: string) => void;
};

export default function LoanTypeField({
  options,
  value,
  onValueChange,
}: LoanTypeFieldProps) {
  const inputId = useId();

  return (
    <div className="flex w-full flex-col gap-2 lg:flex-row lg:items-center lg:gap-13">
      <label
        htmlFor={inputId}
        className="text-body-2-mobile lg:text-body-1-desktop text-grey-400 shrink-0"
      >
        I want to apply for
      </label>
      <div className="relative flex h-[52px] w-full min-w-0 items-center lg:flex-1">
        <select
          id={inputId}
          value={value}
          onChange={(event) => onValueChange(event.target.value)}
          className="text-body-2-mobile-md lg:text-body-2-desktop-md text-grey-300 border-grey-300/50 h-full w-full cursor-pointer appearance-none rounded-[8px] border bg-transparent px-4 pr-10 outline-none"
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <icon.chevronDown className="text-grey-300 pointer-events-none absolute right-4 size-[18px]" />
      </div>
    </div>
  );
}
