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

export type UpdateNewsPayload = {
  slug?: string;
  news_type?: string;
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

  remove: async (newsId: number): Promise<void> => {
    await axiosClient.delete(`news/${newsId}/`);
  },
};
