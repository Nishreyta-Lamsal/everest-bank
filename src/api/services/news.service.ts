import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, MediaBrief } from '@/types';

export type NewsStatus = 'draft' | 'published';

type NewsContentBlock = {
  type: 'paragraph';
  text: string;
};

export type NewsContent = {
  description?: string;
  blocks?: NewsContentBlock[];
};

export type News = {
  id: number;
  slug: string;
  title: string;
  title_ne: string;
  content: NewsContent;
  content_ne: NewsContent;
  date: string;
  expires_on: string | null;
  media: MediaBrief | null;
  document: MediaBrief | null;
  attachment_url: string | null;
  status: NewsStatus;
  status_label: string;
  is_pinned: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewsListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: News[];
};

export type NewsListResponse = ApiResponse<NewsListData>;

export type NewsDetailResponse = ApiResponse<News>;

export type NewsLang = 'en' | 'ne';

export type NewsListParams = {
  cursor?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  is_pinned?: boolean;
  lang?: NewsLang;
  ordering?: string;
  page_size?: number;
  search?: string;
  status?: NewsStatus;
};

export type NewsDetailParams = {
  lang?: NewsLang;
};

export const newsService = {
  getNewsList: async (params?: NewsListParams): Promise<NewsListResponse> => {
    const response = await axiosClient.get<NewsListResponse>('/public/news/', {
      params,
    });

    return response.data;
  },

  getNewsById: async (
    newsId: number,
    params?: NewsDetailParams,
  ): Promise<NewsDetailResponse> => {
    const response = await axiosClient.get<NewsDetailResponse>(
      `/public/news/${newsId}/`,
      { params },
    );

    return response.data;
  },
};
