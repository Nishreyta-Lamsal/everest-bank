import MapLocationCard from './MapLocationCard';

import type { MapLocation } from '@/types';

type MapLocationListProps = {
  locations: MapLocation[];
  activeLocationId: number;
  onSelectLocation: (id: number) => void;
  resultsLabel?: string;
};

export default function MapLocationList({
  locations,
  activeLocationId,
  onSelectLocation,
  resultsLabel = 'locations found',
}: MapLocationListProps) {
  return (
    <div className="flex w-full flex-col gap-4 lg:w-[409px]">
      <p className="text-body-3-desktop text-grey-400 hidden lg:block">
        Total Search: {locations.length} {resultsLabel}
      </p>
      <div className="scrollbar-slim flex flex-col gap-4 lg:max-h-[714px] lg:overflow-y-auto lg:pr-6">
        {locations.map((location) => (
          <MapLocationCard
            key={location.id}
            location={location}
            isActive={location.id === activeLocationId}
            onSelect={onSelectLocation}
          />
        ))}
      </div>
    </div>
  );
}
