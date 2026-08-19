import { cn } from '@/lib/utils';

import type { LoanProcessStep } from '../../_data';

type LoanProcessItemProps = {
  step: LoanProcessStep;
  isActive: boolean;
  onSelect: () => void;
};

export default function LoanProcessItem({
  step,
  isActive,
  onSelect,
}: LoanProcessItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        'flex w-full cursor-pointer items-center gap-8 py-4.5 text-left text-red-500 transition-opacity duration-300 lg:gap-10 lg:py-8',
        isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70',
      )}
    >
      <span className="text-body-1-mobile lg:text-title-0-desktop shrink-0">
        {step.number}
      </span>
      <span className="font-heading text-title-0-mobile-md lg:text-heading-h2-desktop-md">
        {step.title}
      </span>
    </button>
  );
}
