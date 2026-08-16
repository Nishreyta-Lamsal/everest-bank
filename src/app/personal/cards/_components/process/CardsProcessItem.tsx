import { cn } from '@/lib/utils';

import type { CardProcessStep } from '../../_data';

type CardsProcessItemProps = {
  step: CardProcessStep;
  isActive: boolean;
  onSelect: () => void;
};

export default function CardsProcessItem({
  step,
  isActive,
  onSelect,
}: CardsProcessItemProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={isActive}
      className={cn(
        'flex w-full cursor-pointer items-center gap-8 py-5 text-left text-red-500 transition-opacity duration-300 lg:gap-10 lg:py-6',
        isActive ? 'opacity-100' : 'opacity-40 hover:opacity-70',
      )}
    >
      <span className="text-body-1-mobile lg:text-title-0-desktop shrink-0">
        {step.number}
      </span>
      <div className="flex flex-col items-start gap-4">
        <span className="font-heading text-title-0-mobile-md lg:text-heading-h2-desktop-md">
          {step.title}
        </span>
        <span className="text-body-3-mobile lg:text-body-3-desktop text-grey-400">
          {step.description}
        </span>
      </div>
    </button>
  );
}
