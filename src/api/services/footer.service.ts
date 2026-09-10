import { api } from '@/lib/axios';

import type { ApiResponse } from '@/types';

export type FooterLang = 'en' | 'ne';

export type FooterApiLink = {
  slug: string;
  label: string;
  href: string;
  opens_in_new_tab: boolean;
};

export type FooterApiColumn = {
  slug: string;
  label: string;
  links: FooterApiLink[];
};

export type FooterApiSocialLink = {
  slug: string;
  label: string;
  href: string;
};

export type FooterApiBrand = {
  logo_url: string | null;
  app_qr_url: string | null;
  app_promo_label: string;
};

export type FooterApiBanner = {
  image_url: string | null;
};

export type FooterApiSupport = {
  title: string;
  description: string;
  swift_code: string;
  toll_free_number: string;
  call_button_href: string | null;
  enquire_button_href: string | null;
};

export type FooterData = {
  columns: FooterApiColumn[];
  social_links: FooterApiSocialLink[];
  brand: FooterApiBrand;
  banner: FooterApiBanner;
  support: FooterApiSupport;
};

export type FooterResponse = ApiResponse<FooterData>;

export type FooterParams = {
  lang?: FooterLang;
};

export const footerService = {
  getFooter: async (params?: FooterParams): Promise<FooterResponse> => {
    const response = await api.get<FooterResponse>('/public/footer/', {
      params,
    });

    return response.data;
  },
};
