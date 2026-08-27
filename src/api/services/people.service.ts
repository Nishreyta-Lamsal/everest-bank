import { api } from '@/lib/axios';

import type { ApiResponse, MediaBrief } from '@/types';

export type PersonLang = 'en' | 'ne';

export type PersonCategoryBrief = {
  id: number;
  slug: string;
  label: string;
  label_ne: string;
  show_in_footer: boolean;
};

export type Person = {
  id: number;
  slug: string;
  category: PersonCategoryBrief;
  name: string;
  designation: string;
  phone: string;
  extension: string;
  email: string;
  media: MediaBrief | null;
  photo_url: string | null;
  contact_display: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type PersonCategoryCount = {
  slug: string;
  label: string;
  position: number;
  show_in_footer: boolean;
  count: number;
};

export type PersonCategoryCounts = {
  all: number;
  categories: PersonCategoryCount[];
};

export type PeopleListData = {
  category_counts: PersonCategoryCounts;
  count: number;
  next: string | null;
  previous: string | null;
  results: Person[];
};

export type PeopleListResponse = ApiResponse<PeopleListData>;

export type PeopleListParams = {
  category?: string;
  cursor?: string;
  footer?: boolean;
  is_active?: boolean;
  lang?: PersonLang;
  ordering?: string;
  page_size?: number;
};

export const peopleService = {
  getPeopleList: async (
    params?: PeopleListParams,
  ): Promise<PeopleListResponse> => {
    const response = await api.get<PeopleListResponse>('/public/people/', {
      params,
    });

    return response.data;
  },
};
