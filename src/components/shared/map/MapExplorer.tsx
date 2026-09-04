'use client';

import { useState } from 'react';

import MapFilterBar from './MapFilterBar';
import MapSection from './MapSection';
import MapGridSection from './MapGridSection';

import type { MapLocation, MapView } from '@/types';

type MapExplorerProps = {
  locations: MapLocation[];
  searchPlaceholder?: string;
  resultsLabel?: string;
};

export default function MapExplorer({
  locations,
  searchPlaceholder,
  resultsLabel,
}: MapExplorerProps) {
  const [view, setView] = useState<MapView>('map');

  return (
    <>
      <MapFilterBar
        view={view}
        onViewChange={setView}
        searchPlaceholder={searchPlaceholder}
      />
      {view === 'map' ? (
        <MapSection locations={locations} resultsLabel={resultsLabel} />
      ) : (
        <MapGridSection locations={locations} resultsLabel={resultsLabel} />
      )}
    </>
  );
}
