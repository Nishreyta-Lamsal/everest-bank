import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, ForexDay, ForexDayTables } from '@/types/admin';

export type PublicForexParams = {
  date?: string;
  time?: string;
  lang?: string;
};

export const forexPublicService = {
  retrieve: async (params?: PublicForexParams): Promise<ForexDay | null> => {
    const response = await axiosClient.get<ApiResponse<ForexDay>>(
      'public/rates/forex/',
      { params },
    );

    return response.data.success ? response.data.data : null;
  },

  listTables: async (
    date: string,
    lang?: string,
  ): Promise<ForexDayTables | null> => {
    const response = await axiosClient.get<ApiResponse<ForexDayTables>>(
      'public/rates/forex/',
      { params: { date, lang } },
    );

    return response.data.success ? response.data.data : null;
  },
};
