import { api } from '@/lib/axios';

import type { ApiResponse } from '@/types';

export type NewsStatus = 'draft' | 'published';

export type NewsTypeBrief = {
  id: number;
  slug: string;
  label: string;
  label_ne: string;
};

export type NewsMediaType = 'image' | 'video' | 'pdf' | 'audio' | 'document';

export type NewsMedia = {
  id: number;
  title: string;
  file_url: string;
  thumbnail_url: string | null;
  alt_text: string;
  media_type: NewsMediaType;
};

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
  news_type: NewsTypeBrief;
  title: string;
  content: NewsContent;
  date: string;
  expires_on: string | null;
  media: NewsMedia | null;
  document: NewsMedia | null;
  attachment_url: string | null;
  status: NewsStatus;
  status_label: string;
  is_pinned: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewsCategoryCount = {
  slug: string;
  label: string;
  position: number;
  count: number;
};

export type NewsCategoryCounts = {
  all: number;
  types: NewsCategoryCount[];
};

export type NewsListData = {
  category_counts: NewsCategoryCounts;
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
  is_pinned?: boolean;
  lang?: NewsLang;
  news_type?: string;
  ordering?: string;
  page_size?: number;
  status?: NewsStatus;
};

export type NewsDetailParams = {
  lang?: NewsLang;
};

export const newsService = {
  getNewsList: async (params?: NewsListParams): Promise<NewsListResponse> => {
    const response = await api.get<NewsListResponse>('/public/news/', {
      params,
    });

    return response.data;
  },

  getNewsById: async (
    newsId: number,
    params?: NewsDetailParams,
  ): Promise<NewsDetailResponse> => {
    const response = await api.get<NewsDetailResponse>(
      `/public/news/${newsId}/`,
      { params },
    );

    return response.data;
  },
};
