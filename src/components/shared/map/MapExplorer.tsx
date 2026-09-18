'use client';

import { useState } from 'react';

import MapFilterBar from './MapFilterBar';
import MapSection from './MapSection';
import MapGridSection from './MapGridSection';

import {
  useMapLocations,
  useProvinceDistricts,
  useProvinces,
} from '@/hooks/api/use-map-locations';
import { useDebounce } from '@/hooks/useDebounce';

import type { MapLocation, MapView } from '@/types';

type MapExplorerProps = {
  /** Type slug the page is showing, e.g. "branch". */
  locationType: string;
  locations: MapLocation[];
  searchPlaceholder?: string;
  resultsLabel?: string;
};

export default function MapExplorer({
  locationType,
  locations,
  searchPlaceholder,
  resultsLabel,
}: MapExplorerProps) {
  const [view, setView] = useState<MapView>('map');
  const [province, setProvince] = useState('');
  const [district, setDistrict] = useState('');
  const [search, setSearch] = useState('');

  // Typing filters server-side, so wait for a pause before refetching.
  const debouncedSearch = useDebounce(search, 300);

  const { data: provinces = [] } = useProvinces();
  const { data: districts = [] } = useProvinceDistricts(province);
  const { data: results = [], isFetching } = useMapLocations(
    locationType,
    { province, district, search: debouncedSearch.trim() },
    locations,
  );

  function handleProvinceChange(value: string) {
    setProvince(value);
    // The chosen district may not belong to the new province.
    setDistrict('');
  }

  return (
    <>
      <MapFilterBar
        view={view}
        onViewChange={setView}
        provinceOptions={provinces.map((item) => ({
          label: item.name,
          value: item.slug,
        }))}
        districtOptions={districts.map((item) => ({
          label: item.name,
          value: item.slug,
        }))}
        province={province}
        onProvinceChange={handleProvinceChange}
        district={district}
        onDistrictChange={setDistrict}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder={searchPlaceholder}
      />
      {view === 'map' ? (
        <MapSection
          locations={results}
          resultsLabel={resultsLabel}
          isLoading={isFetching}
        />
      ) : (
        <MapGridSection
          locations={results}
          resultsLabel={resultsLabel}
          isLoading={isFetching}
        />
      )}
    </>
  );
}
