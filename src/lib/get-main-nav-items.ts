import { hierarchyService } from '@/api/services/hierarchy.service';

import { toMainNavItems } from '@/lib/map-navbar';
import { getQueryClient } from '@/lib/get-query-client';

import { mainNavItems as staticMainNavItems } from '@/data';

import type { MainNavItem } from '@/types';

export const navbarMenusQueryKey = ['navbar', 'hierarchy'] as const;

export async function getMainNavItems(): Promise<MainNavItem[]> {
  const queryClient = getQueryClient();

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: navbarMenusQueryKey,
      queryFn: () => hierarchyService.getHierarchy(),
    });

    return toMainNavItems(data.pages);
  } catch {
    return staticMainNavItems;
  }
}
