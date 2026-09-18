export type LocationTypeBrief = {
  id: number;
  slug: string;
  label: string;
};

export type LocationType = LocationTypeBrief & {
  label_ne?: string;
  position: number;
  is_active: boolean;
  locations_count?: number;
  created_at: string;
  updated_at: string;
};

export type ProvinceBrief = {
  id: number;
  slug: string;
  name: string;
};

export type DistrictBrief = ProvinceBrief & {
  province?: ProvinceBrief;
};

export type Location = {
  id: number;
  slug: string;
  location_type: LocationTypeBrief;
  district: DistrictBrief;
  province: ProvinceBrief;
  name: string;
  name_ne?: string;
  phone: string;
  address: string;
  address_ne?: string;
  /** Google Maps embed URL. The backend extracts src from a pasted iframe. */
  map_embed_url: string;
  hours: string;
  services: string[];
  is_active: boolean;
  /** Server-built "ATM - Kathmandu, Bagmati" label. */
  display_location: string;
  created_at: string;
  updated_at: string;
};

/** Tab counts, returned alongside the list so tabs need no extra request. */
export type LocationTypeCounts = {
  all: number;
  types: {
    slug: string;
    label: string;
    position: number;
    count: number;
  }[];
};

export type LocationListData = {
  count?: number;
  next: string | null;
  previous: string | null;
  results: Location[];
  type_counts: LocationTypeCounts;
};
