import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, PageReplicateResult } from '@/types/admin';

export type ReplicatePagePayload = {
  source_id: number;
  product: {
    slug: string;
    title: string;
  };
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
