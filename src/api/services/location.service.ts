import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse } from '@/types';
import type {
  DistrictBrief,
  Location,
  LocationListData,
  ProvinceBrief,
} from '@/types/admin';
import type { MapLocation } from '@/types';

export type PublicLocationParams = {
  location_type?: string;
  province?: string;
  district?: string;
  search?: string;
  page_size?: number;
};

/** The map components take a flat shape; this is the only place they differ. */
export function toMapLocation(location: Location): MapLocation {
  return {
    id: location.id,
    name: location.name,
    address: location.address,
    phone: location.phone,
    mapUrl: location.map_embed_url,
  };
}

/** These list endpoints are paginated, so the rows sit under `results`. */
function toRows<T>(data: { results: T[] } | T[]): T[] {
  return Array.isArray(data) ? data : data.results;
}

export const publicLocationService = {
  list: async (params?: PublicLocationParams): Promise<Location[]> => {
    const response = await axiosClient.get<ApiResponse<LocationListData>>(
      'public/locations/',
      { params },
    );

    return response.data.data.results;
  },

  listProvinces: async (): Promise<ProvinceBrief[]> => {
    const response = await axiosClient.get<
      ApiResponse<{ results: ProvinceBrief[] } | ProvinceBrief[]>
    >('public/provinces/', { params: { page_size: 100 } });

    return toRows(response.data.data);
  },

  /** Districts of one province, for the dependent picker. */
  listDistricts: async (province?: string): Promise<DistrictBrief[]> => {
    const response = await axiosClient.get<
      ApiResponse<{ results: DistrictBrief[] } | DistrictBrief[]>
    >('public/districts/', { params: { province, page_size: 100 } });

    return toRows(response.data.data);
  },
};

/**
 * Locations for a public map page, falling back to the bundled list.
 *
 * The fallback covers the backend being unreachable, so a map page still
 * renders something useful during an outage. An empty-but-successful response
 * is NOT a failure: if every ATM has been deactivated in the CMS, showing the
 * bundled list would present stale data as if it were live.
 */
export async function getMapLocations(
  locationType: string,
  fallback: MapLocation[],
): Promise<MapLocation[]> {
  try {
    const locations = await publicLocationService.list({
      location_type: locationType,
      page_size: 100,
    });

    return locations.map(toMapLocation);
  } catch {
    return fallback;
  }
}
