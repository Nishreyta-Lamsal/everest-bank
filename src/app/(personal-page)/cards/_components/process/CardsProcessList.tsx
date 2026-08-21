import CardsProcessItem from './CardsProcessItem';

import type { CardProcessStep } from '../../_data';

type CardsProcessListProps = {
  steps: CardProcessStep[];
  activeIndex: number;
  onSelect: (index: number) => void;
};

export default function CardsProcessList({
  steps,
  activeIndex,
  onSelect,
}: CardsProcessListProps) {
  return (
    <div className="order-2 flex w-full flex-col items-start lg:order-1 lg:w-[560px]">
      {steps.map((step, index) => (
        <CardsProcessItem
          key={step.title}
          step={step}
          isActive={index === activeIndex}
          onSelect={() => onSelect(index)}
        />
      ))}
    </div>
  );
}
