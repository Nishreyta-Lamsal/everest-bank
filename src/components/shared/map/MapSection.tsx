'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import MapLocationList from './MapLocationList';

import type { MapLocation } from '@/types';

type MapSectionProps = {
  locations: MapLocation[];
  resultsLabel?: string;
  isLoading?: boolean;
};

export default function MapSection({
  locations,
  resultsLabel,
  isLoading,
}: MapSectionProps) {
  const [activeLocationId, setActiveLocationId] = useState<number | null>(null);

  const activeLocation =
    locations.find((location) => location.id === activeLocationId) ??
    locations[0];

  // Filters can match nothing, and there is no map to show for no location.
  if (!activeLocation) {
    return (
      <section className="w-full pt-6 pb-8 lg:py-8">
        <LayoutWrapper>
          <p className="text-grey-400 py-12 text-center">
            {isLoading ? 'Loading…' : 'No locations match these filters.'}
          </p>
        </LayoutWrapper>
      </section>
    );
  }

  return (
    <section className="w-full pt-6 pb-8 lg:py-8">
      <LayoutWrapper>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-13">
          <iframe
            key={activeLocation.id}
            src={activeLocation.mapUrl}
            title={`Map of Everest Bank ${activeLocation.name}`}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            className="bg-grey-25 h-[335px] w-full shrink-0 rounded-2xl border-0 md:h-[600px] lg:w-[600px] xl:h-[750px] xl:w-[800px]"
          />
          <MapLocationList
            locations={locations}
            activeLocationId={activeLocation.id}
            onSelectLocation={setActiveLocationId}
            resultsLabel={resultsLabel}
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
