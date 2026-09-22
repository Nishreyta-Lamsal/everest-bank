import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, NewsMediaBrief } from '@/types/admin';

export type CalendarRead = {
  id: number;
  year: number;
  title: string;
  title_ne: string;
  media: NewsMediaBrief;
  file_url: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CalendarWrite = {
  year: number;
  title?: string;
  title_ne?: string;
  media: number;
  position?: number;
  is_active?: boolean;
};

export type ListCalendarsParams = {
  is_active?: boolean;
  ordering?: string;
  search?: string;
  year?: number;
};

export const calendarService = {
  list: async (params?: ListCalendarsParams): Promise<CalendarRead[]> => {
    const response = await axiosClient.get<ApiResponse<CalendarRead[]>>(
      'news/calendars/',
      { params },
    );

    return response.data.data;
  },

  create: async (payload: CalendarWrite): Promise<CalendarRead> => {
    const response = await axiosClient.post<ApiResponse<CalendarRead>>(
      'news/calendars/',
      payload,
    );

    return response.data.data;
  },

  retrieve: async (
    calendarId: number,
    lang?: string,
  ): Promise<CalendarRead> => {
    const response = await axiosClient.get<ApiResponse<CalendarRead>>(
      `news/calendars/${calendarId}/`,
      { params: lang ? { lang } : undefined },
    );

    return response.data.data;
  },

  update: async (
    calendarId: number,
    payload: Partial<CalendarWrite>,
  ): Promise<CalendarRead> => {
    const response = await axiosClient.patch<ApiResponse<CalendarRead>>(
      `news/calendars/${calendarId}/`,
      payload,
    );

    return response.data.data;
  },

  replace: async (
    calendarId: number,
    payload: CalendarWrite,
  ): Promise<CalendarRead> => {
    const response = await axiosClient.put<ApiResponse<CalendarRead>>(
      `news/calendars/${calendarId}/`,
      payload,
    );

    return response.data.data;
  },

  remove: async (calendarId: number): Promise<void> => {
    await axiosClient.delete(`news/calendars/${calendarId}/`);
  },
};
