import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, MediaBrief } from '@/types';

export type NoticeStatus = 'draft' | 'published';

type NoticeContentBlock = {
  type: 'paragraph';
  text: string;
};

export type NoticeContent = {
  description?: string;
  blocks?: NoticeContentBlock[];
};

export type Notice = {
  id: number;
  slug: string;
  title: string;
  title_ne: string;
  content: NoticeContent;
  content_ne: NoticeContent;
  date: string;
  expires_on: string | null;
  media: MediaBrief | null;
  document: MediaBrief | null;
  attachment_url: string | null;
  status: NoticeStatus;
  status_label: string;
  is_pinned: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NoticeListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: Notice[];
};

export type NoticeListResponse = ApiResponse<NoticeListData>;

export type NoticeDetailResponse = ApiResponse<Notice>;

export type NoticeLang = 'en' | 'ne';

export type NoticeListParams = {
  cursor?: string;
  date?: string;
  date_from?: string;
  date_to?: string;
  is_pinned?: boolean;
  lang?: NoticeLang;
  ordering?: string;
  page_size?: number;
  search?: string;
  status?: NoticeStatus;
};

export type NoticeDetailParams = {
  lang?: NoticeLang;
};

export const noticeService = {
  getNoticeList: async (
    params?: NoticeListParams,
  ): Promise<NoticeListResponse> => {
    const response = await axiosClient.get<NoticeListResponse>(
      '/public/notices/',
      { params },
    );

    return response.data;
  },

  getNoticeById: async (
    noticeId: number,
    params?: NoticeDetailParams,
  ): Promise<NoticeDetailResponse> => {
    const response = await axiosClient.get<NoticeDetailResponse>(
      `/public/notices/${noticeId}/`,
      { params },
    );

    return response.data;
  },
};
