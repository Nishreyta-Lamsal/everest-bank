import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, PageSectionRead } from '@/types/admin';

export type UpdatePageSectionPayload = {
  is_visible?: boolean;
  position?: number;
  content?: Record<string, unknown>;
};

export type BulkUpdatePageSectionItem = {
  id: number;
  section_type: string;
  position?: number;
  is_visible?: boolean;
  content?: Record<string, unknown>;
};

export const pageSectionService = {
  retrieve: async (
    slug: string,
    sectionId: number,
  ): Promise<PageSectionRead> => {
    const response = await axiosClient.get<ApiResponse<PageSectionRead>>(
      `pages/${slug}/sections/${sectionId}/`,
    );

    return response.data.data;
  },

  update: async (
    slug: string,
    sectionId: number,
    payload: UpdatePageSectionPayload,
  ): Promise<PageSectionRead> => {
    const response = await axiosClient.patch<ApiResponse<PageSectionRead>>(
      `pages/${slug}/sections/${sectionId}/`,
      payload,
    );

    return response.data.data;
  },

  bulkUpdate: async (
    slug: string,
    items: BulkUpdatePageSectionItem[],
  ): Promise<PageSectionRead[]> => {
    const response = await axiosClient.patch<ApiResponse<PageSectionRead[]>>(
      `pages/${slug}/sections/`,
      items,
    );

    return response.data.data;
  },
};
