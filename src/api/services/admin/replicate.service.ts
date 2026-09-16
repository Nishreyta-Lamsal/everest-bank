import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, PageReplicateResult } from '@/types/admin';

export type ReplicateHierarchyNode = {
  id?: number;
  slug?: string;
  title?: string;
  title_ne?: string;
  path?: string;
  icon?: string;
  position?: number;
  is_active?: boolean;
  show_in_menu?: boolean;
  promo_label?: string;
  promo_label_ne?: string;
  promo_href?: string;
  promo_is_active?: boolean;
};

export type ReplicatePagePayload = {
  source_id: number;
  page?: ReplicateHierarchyNode;
  product_type?: ReplicateHierarchyNode;
  product?: ReplicateHierarchyNode;
};

export const replicateService = {
  create: async (
    payload: ReplicatePagePayload,
  ): Promise<PageReplicateResult> => {
    const response = await axiosClient.post<ApiResponse<PageReplicateResult>>(
      'pages/replicate/',
      payload,
    );

    return response.data.data;
  },
};
