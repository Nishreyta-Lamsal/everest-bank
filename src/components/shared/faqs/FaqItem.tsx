import { MinusIcon, PlusIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { FaqItemProps } from '@/types';

export default function FaqItem({ item, isOpen, onToggle }: FaqItemProps) {
  const panelId = `faq-answer-${item.question.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;

  return (
    <div className="border-grey-25 flex w-full flex-col items-start border-b py-6 last:border-b-0 lg:p-6">
      <h3 className="w-full">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center justify-between gap-4 text-left"
        >
          <span className="font-heading text-heading-h4-mobile lg:text-heading-h5-desktop text-grey-500">
            {item.question}
          </span>
          <span className="grid shrink-0">
            <PlusIcon
              className={cn(
                'text-grey-500 col-start-1 row-start-1 transition-all duration-300 ease-in-out',
                isOpen ? 'rotate-90 opacity-0' : 'rotate-0 opacity-100',
              )}
            />
            <MinusIcon
              className={cn(
                'text-grey-500 col-start-1 row-start-1 transition-all duration-300 ease-in-out',
                isOpen ? 'rotate-0 opacity-100' : '-rotate-90 opacity-0',
              )}
            />
          </span>
        </button>
      </h3>
      <div
        className={cn(
          'grid w-full transition-[grid-template-rows] duration-300 ease-in-out',
          isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]',
        )}
      >
        <div className="overflow-hidden">
          <p
            id={panelId}
            aria-hidden={!isOpen}
            className="text-body-3-mobile text-grey-500/80 lg:text-body-2-desktop pt-4"
          >
            {item.answer}
          </p>
        </div>
      </div>
    </div>
  );
}
