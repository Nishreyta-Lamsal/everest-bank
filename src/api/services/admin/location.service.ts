import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  DistrictBrief,
  Location,
  LocationListData,
  LocationType,
} from '@/types/admin';

export type ListLocationsParams = {
  /** Type slug, e.g. "atm". Omit for all types. */
  location_type?: string;
  province?: string;
  district?: string;
  is_active?: boolean;
  search?: string;
  cursor?: string;
};

export type LocationWritePayload = {
  name: string;
  /** Type slug, not id. */
  location_type: string;
  /** District slug. Province is derived from it server-side. */
  district: string;
  address: string;
  phone?: string;
  hours?: string;
  /** A full <iframe> may be pasted; the backend keeps only the src. */
  map_embed_url?: string;
  services?: string[];
  is_active?: boolean;
};

export type LocationTypeWritePayload = {
  label: string;
  position?: number;
  is_active?: boolean;
};

export const locationService = {
  list: async (params?: ListLocationsParams): Promise<LocationListData> => {
    const response = await axiosClient.get<ApiResponse<LocationListData>>(
      'locations/',
      { params },
    );

    return response.data.data;
  },

  create: async (payload: LocationWritePayload): Promise<Location> => {
    const response = await axiosClient.post<ApiResponse<Location>>(
      'locations/',
      payload,
    );

    return response.data.data;
  },

  update: async (
    id: number,
    payload: Partial<LocationWritePayload>,
  ): Promise<Location> => {
    const response = await axiosClient.patch<ApiResponse<Location>>(
      `locations/${id}/`,
      payload,
    );

    return response.data.data;
  },

  remove: async (id: number): Promise<void> => {
    await axiosClient.delete(`locations/${id}/`);
  },

  listTypes: async (): Promise<LocationType[]> => {
    const response = await axiosClient.get<
      ApiResponse<{ results: LocationType[] } | LocationType[]>
    >('locations/types/', { params: { page_size: 100 } });

    const data = response.data.data;

    return Array.isArray(data) ? data : data.results;
  },

  createType: async (
    payload: LocationTypeWritePayload,
  ): Promise<LocationType> => {
    const response = await axiosClient.post<ApiResponse<LocationType>>(
      'locations/types/',
      payload,
    );

    return response.data.data;
  },

  updateType: async (
    slug: string,
    payload: Partial<LocationTypeWritePayload>,
  ): Promise<LocationType> => {
    const response = await axiosClient.patch<ApiResponse<LocationType>>(
      `locations/types/${slug}/`,
      payload,
    );

    return response.data.data;
  },

  removeType: async (slug: string): Promise<void> => {
    await axiosClient.delete(`locations/types/${slug}/`);
  },

  /** Districts for the editor's picker. Province follows from the district. */
  listDistricts: async (): Promise<DistrictBrief[]> => {
    const response = await axiosClient.get<
      ApiResponse<{ results: DistrictBrief[] } | DistrictBrief[]>
    >('districts/', { params: { page_size: 100 } });

    const data = response.data.data;

    return Array.isArray(data) ? data : data.results;
  },
};
