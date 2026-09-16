import { useQuery } from '@tanstack/react-query';

import { pageService } from '@/api/services/admin/page.service';

import type { ListPagesParams } from '@/api/services/admin/page.service';

export function pagesQueryKey(params?: ListPagesParams) {
  return ['pages', 'list', params ?? {}] as const;
}

export function usePages(
  params?: ListPagesParams,
  options?: { enabled?: boolean },
) {
  return useQuery({
    queryKey: pagesQueryKey(params),
    queryFn: () => pageService.list(params),
    enabled: options?.enabled,
  });
}

export function pageQueryKey(slug: string) {
  return ['pages', 'detail', slug] as const;
}

export function usePage(slug: string) {
  return useQuery({
    queryKey: pageQueryKey(slug),
    queryFn: () => pageService.retrieve(slug),
    enabled: Boolean(slug),
  });
}
