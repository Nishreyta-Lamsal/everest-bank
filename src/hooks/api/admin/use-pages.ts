import { useQuery } from '@tanstack/react-query';

import { pageService } from '@/api/services/admin/page.service';

import type { ListPagesParams } from '@/api/services/admin/page.service';

export const pagesQueryKey = (params?: ListPagesParams) =>
  ['pages', 'list', params ?? {}] as const;

export function usePages(params?: ListPagesParams) {
  return useQuery({
    queryKey: pagesQueryKey(params),
    queryFn: () => pageService.list(params),
  });
}

export const pageQueryKey = (slug: string) =>
  ['pages', 'detail', slug] as const;

export function usePage(slug: string) {
  return useQuery({
    queryKey: pageQueryKey(slug),
    queryFn: () => pageService.retrieve(slug),
    enabled: Boolean(slug),
  });
}
