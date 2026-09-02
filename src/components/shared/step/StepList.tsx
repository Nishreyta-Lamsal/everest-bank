import StepItem from './StepItem';

import type { StepEntry } from '@/types';

type StepListProps = {
  steps: StepEntry[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function StepList({
  steps,
  activeIndex,
  onSelect,
}: StepListProps) {
  return (
    <div className="order-2 flex w-full flex-col items-start lg:order-1 lg:w-[558px]">
      {steps.map((step, index) => (
        <StepItem
          key={step.title}
          step={step}
          isActive={index === activeIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
