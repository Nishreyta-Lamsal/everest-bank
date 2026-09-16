import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { newsService } from '@/api/services/admin/news.service';

import type {
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
