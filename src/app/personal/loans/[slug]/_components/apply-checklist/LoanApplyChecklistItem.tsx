import { RouteIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { LoanApplyChecklistItem as LoanApplyChecklistItemData } from '../../_data';

type LoanApplyChecklistItemProps = {
  item: LoanApplyChecklistItemData;
  isActive: boolean;
  isPaused: boolean;
  progressKey: string;
  duration: number;
  onSelect: () => void;
};

export default function LoanApplyChecklistItem({
  item,
  isActive,
  isPaused,
  progressKey,
  duration,
  onSelect,
}: LoanApplyChecklistItemProps) {
  const panelId = `apply-checklist-${item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <>
      <button
        type="button"
        onClick={onSelect}
        aria-expanded={isActive}
        aria-controls={panelId}
        className={cn(
          'flex w-full cursor-pointer flex-col items-start text-left lg:py-3',
          isActive ? 'py-2' : 'py-1',
        )}
      >
        <div
          className={cn(
            'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
            isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <div className="flex size-8 items-center justify-center pb-3 lg:pb-4">
              <RouteIcon className="h-[24px] w-[30px] text-orange-500" />
            </div>
          </div>
        </div>

        <span className="font-heading text-title-1-mobile lg:text-title-0-desktop text-grey-500">
          {item.title}
        </span>

        <div
          className={cn(
            'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
            isActive ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
          )}
        >
          <div className="overflow-hidden">
            <p
              id={panelId}
              aria-hidden={!isActive}
              className="text-body-3-mobile lg:text-body-2-mobile text-grey-400 max-w-[378px] pt-3 lg:pt-4"
            >
              {item.description}
            </p>
          </div>
        </div>
      </button>

      <div className="bg-grey-25 relative h-px w-full shrink-0">
        {isActive && (
          <div
            key={progressKey}
            className="animate-fill-progress absolute inset-y-0 left-0 h-full bg-orange-500"
            style={{
              animationDuration: `${duration}ms`,
              animationPlayState: isPaused ? 'paused' : 'running',
            }}
          />
        )}
      </div>
    </>
  );
}
