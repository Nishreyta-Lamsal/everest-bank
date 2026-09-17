import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  NewsStatus,
  NoticeListData,
  NoticeRead,
} from '@/types/admin';

export type ListNoticesParams = {
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

export type UpdateNoticePayload = {
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

export type CreateNoticePayload = {
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

export const noticeService = {
  list: async (params?: ListNoticesParams): Promise<NoticeListData> => {
    const response = await axiosClient.get<ApiResponse<NoticeListData>>(
      'notices/',
      { params },
    );

    return response.data.data;
  },

  create: async (payload: CreateNoticePayload): Promise<NoticeRead> => {
    const response = await axiosClient.post<ApiResponse<NoticeRead>>(
      'notices/',
      payload,
    );

    return response.data.data;
  },

  update: async (
    noticeId: number,
    payload: UpdateNoticePayload,
  ): Promise<NoticeRead> => {
    const response = await axiosClient.patch<ApiResponse<NoticeRead>>(
      `notices/${noticeId}/`,
      payload,
    );

    return response.data.data;
  },

  remove: async (noticeId: number): Promise<void> => {
    await axiosClient.delete(`notices/${noticeId}/`);
  },
};
