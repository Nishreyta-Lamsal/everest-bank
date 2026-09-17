import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  Page,
  PageDetail,
  PageKind,
  PageListData,
} from '@/types/admin';

export type ListPagesParams = {
  kind?: PageKind;
  ordering?: string;
  parent?: number;
};

export type UpdatePagePayload = {
  slug?: string;
  path?: string;
  title?: string;
  title_ne?: string;
  kind?: PageKind;
  parent?: number | null;
  icon?: string;
  position?: number;
  is_active?: boolean;
  show_in_menu?: boolean;
  promo_label?: string;
  promo_label_ne?: string;
  promo_href?: string;
  promo_is_active?: boolean;
};

export type ReorderPagesItem = {
  slug: string;
  position: number;
};

export const pageService = {
  list: async (params?: ListPagesParams): Promise<PageListData> => {
    const response = await axiosClient.get<ApiResponse<PageListData>>(
      'pages/',
      {
        params: { kind: 'page', ...params },
      },
    );

    return response.data.data;
  },

  retrieve: async (slug: string): Promise<PageDetail> => {
    const response = await axiosClient.get<ApiResponse<PageDetail>>(
      `pages/${slug}/`,
    );

    return response.data.data;
  },

  update: async (slug: string, payload: UpdatePagePayload): Promise<Page> => {
    const response = await axiosClient.patch<ApiResponse<Page>>(
      `pages/${slug}/`,
      payload,
    );

    return response.data.data;
  },

  reorder: async (items: ReorderPagesItem[]): Promise<Page[]> =>
    Promise.all(
      items.map((item) =>
        pageService.update(item.slug, {
          position: item.position,
        }),
      ),
    ),
};
