import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  FooterColumnRead,
  FooterColumnWrite,
  FooterLinkRead,
  FooterLinkWrite,
  FooterSettingsRead,
  FooterSettingsWrite,
  FooterSocialLinkRead,
  FooterSocialLinkWrite,
} from '@/types/admin';

export const footerAdminService = {
  listColumns: async (): Promise<FooterColumnRead[]> => {
    const response =
      await axiosClient.get<ApiResponse<FooterColumnRead[]>>('footer/columns/');

    return response.data.data;
  },

  createColumn: async (
    payload: FooterColumnWrite,
  ): Promise<FooterColumnRead> => {
    const response = await axiosClient.post<ApiResponse<FooterColumnRead>>(
      'footer/columns/',
      payload,
    );

    return response.data.data;
  },

  updateColumn: async (
    columnSlug: string,
    payload: Partial<FooterColumnWrite>,
  ): Promise<FooterColumnRead> => {
    const response = await axiosClient.patch<ApiResponse<FooterColumnRead>>(
      `footer/columns/${columnSlug}/`,
      payload,
    );

    return response.data.data;
  },

  removeColumn: async (columnSlug: string): Promise<void> => {
    await axiosClient.delete(`footer/columns/${columnSlug}/`);
  },

  createLink: async (
    columnSlug: string,
    payload: FooterLinkWrite,
  ): Promise<FooterLinkRead> => {
    const response = await axiosClient.post<ApiResponse<FooterLinkRead>>(
      `footer/columns/${columnSlug}/links/`,
      payload,
    );

    return response.data.data;
  },

  updateLink: async (
    columnSlug: string,
    linkSlug: string,
    payload: Partial<FooterLinkWrite>,
  ): Promise<FooterLinkRead> => {
    const response = await axiosClient.patch<ApiResponse<FooterLinkRead>>(
      `footer/columns/${columnSlug}/links/${linkSlug}/`,
      payload,
    );

    return response.data.data;
  },

  removeLink: async (columnSlug: string, linkSlug: string): Promise<void> => {
    await axiosClient.delete(`footer/columns/${columnSlug}/links/${linkSlug}/`);
  },

  listSocialLinks: async (): Promise<FooterSocialLinkRead[]> => {
    const response = await axiosClient.get<ApiResponse<FooterSocialLinkRead[]>>(
      'footer/social-links/',
    );

    return response.data.data;
  },

  createSocialLink: async (
    payload: FooterSocialLinkWrite,
  ): Promise<FooterSocialLinkRead> => {
    const response = await axiosClient.post<ApiResponse<FooterSocialLinkRead>>(
      'footer/social-links/',
      payload,
    );

    return response.data.data;
  },

  updateSocialLink: async (
    socialSlug: string,
    payload: Partial<FooterSocialLinkWrite>,
  ): Promise<FooterSocialLinkRead> => {
    const response = await axiosClient.patch<ApiResponse<FooterSocialLinkRead>>(
      `footer/social-links/${socialSlug}/`,
      payload,
    );

    return response.data.data;
  },

  removeSocialLink: async (socialSlug: string): Promise<void> => {
    await axiosClient.delete(`footer/social-links/${socialSlug}/`);
  },

  getSettings: async (): Promise<FooterSettingsRead> => {
    const response =
      await axiosClient.get<ApiResponse<FooterSettingsRead>>(
        'footer/settings/',
      );

    return response.data.data;
  },

  updateSettings: async (
    payload: FooterSettingsWrite,
  ): Promise<FooterSettingsRead> => {
    const response = await axiosClient.patch<ApiResponse<FooterSettingsRead>>(
      'footer/settings/',
      payload,
    );

    return response.data.data;
  },
};
