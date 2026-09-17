import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse } from '@/types';

export type HierarchyKind = 'page' | 'product_type' | 'product';

export type HierarchyNode = {
  id: number;
  slug: string;
  path: string;
  title: string;
  title_ne: string;
  kind: HierarchyKind;
  icon: string;
  position: number;
  is_active: boolean;
  show_in_menu: boolean;
  promo_label: string;
  promo_label_ne: string;
  promo_href: string;
  promo_is_active: boolean;
  explore_label: string;
  explore_label_ne: string;
  explore_href: string;
  sections_count: number;
  children: HierarchyNode[];
};

export type HierarchyData = {
  pages: HierarchyNode[];
};

export type HierarchyResponse = ApiResponse<HierarchyData>;

export type HierarchyParams = {
  root?: string;
  kind?: HierarchyKind;
  in_menu?: boolean;
};

export const hierarchyService = {
  getHierarchy: async (
    params?: HierarchyParams,
  ): Promise<HierarchyResponse> => {
    const response = await axiosClient.get<HierarchyResponse>(
      '/public/pages/hierarchy/',
      { params },
    );

    return response.data;
  },
};
