import NavbarMainBar from './desktop/NavbarMainBar';
import NavbarUtilityBar from './desktop/NavbarUtilityBar';
import NavbarMobile from './mobile/NavbarMobile';

import { menuService } from '@/api/services/menu.service';

import { toMainNavItem } from '@/lib/map-navbar';
import { getQueryClient } from '@/lib/get-query-client';

import { mainNavItems as staticMainNavItems } from '@/data';

import type { MainNavItem } from '@/types';

export const navbarMenusQueryKey = ['navbar', 'menus'] as const;

export default async function Navbar() {
  const queryClient = getQueryClient();

  let mainNavItems: MainNavItem[] = staticMainNavItems;

  try {
    const { data: menuList } = await queryClient.fetchQuery({
      queryKey: navbarMenusQueryKey,
      queryFn: () => menuService.getMenus(),
    });

    const trees = await Promise.all(
      menuList.menus.map((menu) =>
        queryClient.fetchQuery({
          queryKey: [...navbarMenusQueryKey, menu.slug],
          queryFn: () => menuService.getMenuTree(menu.slug),
        }),
      ),
    );

    mainNavItems = menuList.menus.map((menu, index) =>
      toMainNavItem(menu, trees[index].data),
    );
  } catch {
    mainNavItems = staticMainNavItems;
  }

  return (
    <header className="w-full bg-white">
      <NavbarMobile items={mainNavItems} />
      <div className="hidden lg:block">
        <NavbarUtilityBar />
        <NavbarMainBar items={mainNavItems} />
      </div>
    </header>
  );
}
