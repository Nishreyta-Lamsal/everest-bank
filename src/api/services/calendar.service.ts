import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, MediaBrief } from '@/types';

export type CalendarRead = {
  id: number;
  year: number;
  title: string;
  title_ne: string;
  media: MediaBrief;
  file_url: string | null;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type CalendarLatestResponse = ApiResponse<CalendarRead>;

export const calendarService = {
  getCalendars: async (): Promise<CalendarLatestResponse> => {
    const response = await axiosClient.get<CalendarLatestResponse>(
      '/public/news/calendars/',
    );

    return response.data;
  },
};
