import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  PageDetail,
  PageKind,
  PageListData,
} from '@/types/admin';

export type ListPagesParams = {
  kind?: PageKind;
  ordering?: string;
  parent?: number;
};

export const pageService = {
  list: async (params?: ListPagesParams): Promise<PageListData> => {
    const response = await axiosClient.get<ApiResponse<PageListData>>(
      'pages/',
      {
        params: { kind: 'page', ...params },
      },
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
