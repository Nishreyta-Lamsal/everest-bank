import { icon } from '@/components/icons';

import { cn } from '@/lib/utils';

import type { MapLocation } from '@/types';

type MapLocationCardProps = {
  location: MapLocation;
  isActive?: boolean;
  onSelect?: (id: number) => void;
};

export default function MapLocationCard({
  location,
  isActive = false,
  onSelect,
}: MapLocationCardProps) {
  const isSelectable = Boolean(onSelect);

  return (
    <article
      onClick={isSelectable ? () => onSelect?.(location.id) : undefined}
      className={cn(
        'hover:bg-cream-25 flex w-full items-start rounded-xl border border-orange-50 bg-white p-4 transition-colors duration-300 ease-in-out',
        isSelectable && 'cursor-pointer',
        isActive && 'bg-cream-25',
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-3">
        <div className="flex items-center gap-3 lg:gap-4">
          <icon.mapPin className="size-4.5 shrink-0 text-orange-500 lg:size-6" />
          <h3 className="font-heading text-title-2-mobile lg:text-title-2-desktop text-grey-500">
            {isSelectable ? (
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() => onSelect?.(location.id)}
                className="cursor-pointer text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              >
                {location.name}
                <span className="sr-only"> — show on map</span>
              </button>
            ) : (
              location.name
            )}
          </h3>
        </div>
        <div className="flex flex-col items-start gap-2 pl-[30px] lg:pl-12">
          <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400">
            {location.address}
          </p>
          <div className="flex items-center gap-2">
            <icon.telephone className="text-grey-400 size-[16px] shrink-0" />
            <a
              href={`tel:${location.phone}`}
              onClick={(event) => event.stopPropagation()}
              className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 hover:underline"
            >
              {location.phone}
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
