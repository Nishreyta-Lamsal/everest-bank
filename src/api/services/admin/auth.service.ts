import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, CurrentUser } from '@/types/admin';

export type LoginRequest = {
  email: string;
  password: string;
};

type LoginResponse = ApiResponse<unknown>;

type LogoutResponse = ApiResponse<unknown>;

export const authService = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await axiosClient.post('auth/login/', data);

    return response.data;
  },

  me: async (): Promise<CurrentUser> => {
    const response =
      await axiosClient.get<ApiResponse<CurrentUser>>('auth/me/');

    return response.data.data;
  },

  logout: async (): Promise<LogoutResponse> => {
    const response =
      await axiosClient.post<LogoutResponse>('auth/token/logout/');

    return response.data;
  },
};
