import axios from 'axios';

import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  ForexDay,
  ForexDayTables,
  ForexRowWrite,
} from '@/types/admin';

export type ListForexParams = {
  date?: string;
  time?: string;
  lang?: string;
  ordering?: string;
};

export type ForexRowsPayload = {
  rows: ForexRowWrite[];
};

export const forexService = {
  listTables: async (
    date: string,
    params?: Omit<ListForexParams, 'date'>,
  ): Promise<ForexDayTables | null> => {
    try {
      const response = await axiosClient.get<ApiResponse<ForexDayTables>>(
        'rates/forex/',
        { params: { ...params, date } },
      );

      return response.data.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  },

  retrieve: async (tableDate: string, lang?: string): Promise<ForexDay> => {
    const response = await axiosClient.get<ApiResponse<ForexDay>>(
      `rates/forex/${tableDate}/`,
      { params: lang ? { lang } : undefined },
    );

    return response.data.data;
  },

  create: async (payload: ForexRowsPayload): Promise<ForexDay> => {
    const response = await axiosClient.post<ApiResponse<ForexDay>>(
      'rates/forex/',
      payload,
    );

    return response.data.data;
  },

  update: async (
    tableDate: string,
    payload: ForexRowsPayload,
    time?: string,
  ): Promise<ForexDay> => {
    const response = await axiosClient.patch<ApiResponse<ForexDay>>(
      `rates/forex/${tableDate}/`,
      payload,
      { params: time ? { time } : undefined },
    );

    return response.data.data;
  },

  remove: async (tableDate: string, time?: string): Promise<void> => {
    await axiosClient.delete(`rates/forex/${tableDate}/`, {
      params: time ? { time } : undefined,
    });
  },

  import: async (date?: string, time?: string): Promise<ForexDay> => {
    const response = await axiosClient.post<ApiResponse<ForexDay>>(
      'rates/forex/import/',
      { ...(date ? { date } : {}), ...(time ? { time } : {}) },
    );

    return response.data.data;
  },

  publish: async (date?: string, time?: string): Promise<ForexDay> => {
    const response = await axiosClient.post<ApiResponse<ForexDay>>(
      'rates/forex/publish/',
      { ...(date ? { date } : {}), ...(time ? { time } : {}) },
    );

    return response.data.data;
  },
};
