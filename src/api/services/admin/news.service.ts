import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  NewsListData,
  NewsRead,
  NewsStatus,
} from '@/types/admin';

export type ListNewsParams = {
  cursor?: string;
  is_pinned?: boolean;
  news_type?: string;
  ordering?: string;
  page_size?: number;
  status?: NewsStatus;
};

/** Mirrors `PatchedNewsWrite` from the API schema — every field optional. */
export type UpdateNewsPayload = {
  slug?: string;
  news_type?: string;
  title?: string;
  title_ne?: string;
  content?: unknown;
  content_ne?: unknown;
  /** Publication date, `YYYY-MM-DD`. */
  date?: string;
  expires_on?: string | null;
  /** Cover image id from `POST /api/v1/media/`. */
  media?: number | null;
  /** PDF/document id from `POST /api/v1/media/`. */
  document?: number | null;
  status?: NewsStatus;
  is_pinned?: boolean;
};

export const newsService = {
  list: async (params?: ListNewsParams): Promise<NewsListData> => {
    const response = await axiosClient.get<ApiResponse<NewsListData>>('news/', {
      params,
    });

    return response.data.data;
  },

  update: async (
    newsId: number,
    payload: UpdateNewsPayload,
  ): Promise<NewsRead> => {
    const response = await axiosClient.patch<ApiResponse<NewsRead>>(
      `news/${newsId}/`,
      payload,
    );

    return response.data.data;
  },
};
