import LoanProcessItem from './LoanProcessItem';

import type { LoanProcessStep } from '../../_data';

type LoanProcessListProps = {
  steps: LoanProcessStep[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function LoanProcessList({
  steps,
  activeIndex,
  onSelect,
}: LoanProcessListProps) {
  return (
    <div className="order-2 flex w-full flex-col items-start lg:order-1 lg:w-[558px]">
      {steps.map((step, index) => (
        <LoanProcessItem
          key={step.title}
          step={step}
          isActive={index === activeIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
