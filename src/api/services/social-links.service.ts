import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse } from '@/types';

export type SocialLinkLang = 'en' | 'ne';

export type SocialLink = {
  slug: string;
  label: string;
  href: string;
};

export type SocialLinksResponse = ApiResponse<SocialLink[]>;

export type SocialLinksParams = {
  lang?: SocialLinkLang;
};

export const socialLinksService = {
  getSocialLinks: async (
    params?: SocialLinksParams,
  ): Promise<SocialLinksResponse> => {
    const response = await axiosClient.get<SocialLinksResponse>(
      '/public/footer/social-links/',
      { params },
    );

    return response.data;
  },
};
