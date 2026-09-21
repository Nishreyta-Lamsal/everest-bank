import axios from 'axios';

import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  CalculatorPublic,
  CalculatorPublicListData,
  CalculatorSlug,
} from '@/types/admin';

export type PublicCalculatorParams = {
  lang?: string;
  ordering?: string;
};

export const calculatorPublicService = {
  list: async (
    params?: PublicCalculatorParams,
  ): Promise<CalculatorPublic[]> => {
    const response = await axiosClient.get<
      ApiResponse<CalculatorPublicListData>
    >('public/calculators/', { params });

    return response.data.success ? response.data.data.calculators : [];
  },

  retrieve: async <S extends CalculatorSlug>(
    slug: S,
    lang?: string,
  ): Promise<CalculatorPublic<S> | null> => {
    try {
      const response = await axiosClient.get<ApiResponse<CalculatorPublic<S>>>(
        `public/calculators/${slug}/`,
        { params: lang ? { lang } : undefined },
      );

      return response.data.success ? response.data.data : null;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }

      throw error;
    }
  },
};
