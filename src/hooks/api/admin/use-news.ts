import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { newsService } from '@/api/services/admin/news.service';

import type {
  CreateNewsPayload,
  ListNewsParams,
  UpdateNewsPayload,
} from '@/api/services/admin/news.service';

export function newsQueryKey(params?: ListNewsParams) {
  return ['news', 'list', params ?? {}] as const;
}

export function useNews(params?: ListNewsParams) {
  return useQuery({
    queryKey: newsQueryKey(params),
    queryFn: () => newsService.list(params),
  });
}

export function useCreateNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNewsPayload) => newsService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}

export function useUpdateNews(newsId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNewsPayload) =>
      newsService.update(newsId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}

export function useDeleteNews() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => newsService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['news'] });
    },
  });
}
