import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, PageDetail, PageListData } from '@/types/admin';

export type ListPagesParams = {
  ordering?: string;
};

export const pageService = {
  list: async (params?: ListPagesParams): Promise<PageListData> => {
    const response = await axiosClient.get<ApiResponse<PageListData>>(
      'pages/',
      { params },
    );

    return response.data.data;
  },

  retrieve: async (slug: string): Promise<PageDetail> => {
    const response = await axiosClient.get<ApiResponse<PageDetail>>(
      `pages/${slug}/`,
    );

    return response.data.data;
  },
};
