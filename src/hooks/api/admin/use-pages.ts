import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { pageService } from '@/api/services/admin/page.service';

import type {
  ListPagesParams,
  UpdatePagePayload,
} from '@/api/services/admin/page.service';

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

export function useUpdatePage(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePagePayload) =>
      pageService.update(slug, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}
