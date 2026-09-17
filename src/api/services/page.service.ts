import { axiosClient } from '@/lib/api/axios-client';

import type { PageResponse } from '@/types';

export const pageService = {
  getPage: async (slug: string): Promise<PageResponse> => {
    const response = await axiosClient.get<PageResponse>(
      `/public/pages/${slug}/`,
    );

    return response.data;
  },
};
