import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { pageService } from '@/api/services/admin/page.service';

import type {
  ListPagesParams,
  ReorderPagesItem,
  UpdatePagePayload,
} from '@/api/services/admin/page.service';

import type { PageListData } from '@/types/admin';

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

export function useReorderPages(params?: ListPagesParams) {
  const queryClient = useQueryClient();
  const queryKey = pagesQueryKey(params);

  return useMutation({
    mutationFn: (items: ReorderPagesItem[]) => pageService.reorder(items),

    onMutate: async (items) => {
      await queryClient.cancelQueries({ queryKey });

      const previous = queryClient.getQueryData<PageListData>(queryKey);

      if (previous) {
        const positionBySlug = new Map(
          items.map((item) => [item.slug, item.position]),
        );

        queryClient.setQueryData<PageListData>(queryKey, {
          ...previous,
          pages: previous.pages
            .map((page) => ({
              ...page,
              position: positionBySlug.get(page.slug) ?? page.position,
            }))
            .sort((a, b) => a.position - b.position),
        });
      }

      return { previous };
    },
    onError: (_error, _items, context) => {
      if (context?.previous) {
        queryClient.setQueryData(queryKey, context.previous);
      }

      toast.error('Could not reorder pages. Please try again.');
    },
    onSettled: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
    },
  });
}

export function useUpdatePage(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePagePayload) =>
      pageService.update(slug, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page updated.');
    },
    onError: () => {
      toast.error('Could not update the page. Please try again.');
    },
  });
}

export function useDeletePage(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => pageService.destroy(slug),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page deleted.');
    },
    onError: () => {
      toast.error('Could not delete the page. Please try again.');
    },
  });
}
