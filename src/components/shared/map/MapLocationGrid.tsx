import MapLocationCard from './MapLocationCard';

import type { MapLocation } from '@/types';

type MapLocationGridProps = {
  locations: MapLocation[];
};

export default function MapLocationGrid({ locations }: MapLocationGridProps) {
  return (
    <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
      {locations.map((location) => (
        <MapLocationCard key={location.id} location={location} />
      ))}
    </div>
  );
}
