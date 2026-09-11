import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse } from '@/types/admin';

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = ApiResponse<unknown>;

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post('auth/login/', data);

    return response.data;
  },
};
