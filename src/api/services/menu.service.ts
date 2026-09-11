import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse } from '@/types';

export type MenuLang = 'en' | 'ne';

export type MenuSummary = {
  slug: string;
  label: string;
  custom_url: string;
  position: number;
};

export type MenuListData = {
  max_depth: number;
  menus: MenuSummary[];
};

export type MenuListResponse = ApiResponse<MenuListData>;

export type MenuLinkRef = {
  label: string;
  href: string;
};

export type MenuTreeItem = {
  id: number;
  slug: string;
  label: string;
  icon: string;
  custom_url: string;
  position: number;
  is_visible: boolean;
  explore: MenuLinkRef | null;
  children: MenuTreeItem[];
};

export type MenuTreeData = {
  menu_slug: string;
  menu_label: string;
  custom_url: string;
  max_depth: number;
  items: MenuTreeItem[];
  promo: MenuLinkRef;
};

export type MenuTreeResponse = ApiResponse<MenuTreeData>;

export type MenuParams = {
  lang?: MenuLang;
};

export const menuService = {
  getMenus: async (params?: MenuParams): Promise<MenuListResponse> => {
    const response = await axiosClient.get<MenuListResponse>('/public/menus/', {
      params,
    });

    return response.data;
  },

  getMenuTree: async (
    menuSlug: string,
    params?: MenuParams,
  ): Promise<MenuTreeResponse> => {
    const response = await axiosClient.get<MenuTreeResponse>(
      `/public/menus/${menuSlug}/tree/`,
      { params },
    );

    return response.data;
  },
};
