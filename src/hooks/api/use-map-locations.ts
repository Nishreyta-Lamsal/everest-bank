import { useQuery } from '@tanstack/react-query';

import {
  publicLocationService,
  toMapLocation,
} from '@/api/services/location.service';

import type { MapLocation } from '@/types';

export type MapLocationFilters = {
  province?: string;
  district?: string;
  search?: string;
};

/**
 * Locations for a public map page.
 *
 * `fallback` is the server-rendered list, used as the initial data so the map
 * shows the prerendered locations immediately and only refetches once a
 * filter is actually set.
 */
export function useMapLocations(
  locationType: string,
  filters: MapLocationFilters,
  fallback: MapLocation[],
) {
  const hasFilters = Boolean(
    filters.province || filters.district || filters.search,
  );

  return useQuery({
    queryKey: ['public-locations', locationType, filters] as const,
    queryFn: async () => {
      const locations = await publicLocationService.list({
        location_type: locationType,
        page_size: 100,
        ...(filters.province ? { province: filters.province } : {}),
        ...(filters.district ? { district: filters.district } : {}),
        ...(filters.search ? { search: filters.search } : {}),
      });

      return locations.map(toMapLocation);
    },
    // Unfiltered, the server already rendered this exact list.
    initialData: hasFilters ? undefined : fallback,
    placeholderData: (previous) => previous,
  });
}

export function useProvinces() {
  return useQuery({
    queryKey: ['public-provinces'] as const,
    queryFn: () => publicLocationService.listProvinces(),
    // Nepal's provinces do not change.
    staleTime: Infinity,
  });
}

/** Districts of the selected province; idle until one is picked. */
export function useProvinceDistricts(province: string) {
  return useQuery({
    queryKey: ['public-districts', province] as const,
    queryFn: () => publicLocationService.listDistricts(province),
    enabled: province !== '',
    staleTime: Infinity,
  });
}
