import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  NewsListData,
  NewsRead,
  NewsStatus,
} from '@/types/admin';

export type ListNewsParams = {
  cursor?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  is_pinned?: boolean;
  ordering?: string;
  page_size?: number;
  search?: string;
  status?: NewsStatus;
};

export type UpdateNewsPayload = {
  slug?: string;
  title?: string;
  title_ne?: string;
  content?: unknown;
  content_ne?: unknown;
  date?: string;
  expires_on?: string | null;
  media?: number | null;
  document?: number | null;
  status?: NewsStatus;
  is_pinned?: boolean;
};

export type CreateNewsPayload = {
  slug?: string;
  title: string;
  title_ne?: string;
  content?: unknown;
  content_ne?: unknown;
  date: string;
  expires_on?: string | null;
  media?: number | null;
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

  create: async (payload: CreateNewsPayload): Promise<NewsRead> => {
    const response = await axiosClient.post<ApiResponse<NewsRead>>(
      'news/',
      payload,
    );

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
