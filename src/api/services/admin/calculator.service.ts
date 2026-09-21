import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  CalculatorConfig,
  CalculatorConfigWrite,
  CalculatorListData,
  CalculatorSlug,
} from '@/types/admin';

export type ListCalculatorParams = {
  ordering?: string;
};

export const calculatorService = {
  list: async (params?: ListCalculatorParams): Promise<CalculatorConfig[]> => {
    const response = await axiosClient.get<ApiResponse<CalculatorListData>>(
      'calculators/',
      { params },
    );

    return response.data.data.calculators;
  },

  retrieve: async <S extends CalculatorSlug>(
    slug: S,
  ): Promise<CalculatorConfig<S>> => {
    const response = await axiosClient.get<ApiResponse<CalculatorConfig<S>>>(
      `calculators/${slug}/`,
    );

    return response.data.data;
  },

  update: async <S extends CalculatorSlug>(
    slug: S,
    payload: CalculatorConfigWrite<S>,
  ): Promise<CalculatorConfig<S>> => {
    const response = await axiosClient.patch<ApiResponse<CalculatorConfig<S>>>(
      `calculators/${slug}/`,
      payload,
    );

    return response.data.data;
  },

  replace: async <S extends CalculatorSlug>(
    slug: S,
    payload: Required<CalculatorConfigWrite<S>>,
  ): Promise<CalculatorConfig<S>> => {
    const response = await axiosClient.put<ApiResponse<CalculatorConfig<S>>>(
      `calculators/${slug}/`,
      payload,
    );

    return response.data.data;
  },
};
