import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { noticeService } from '@/api/services/admin/notice.service';

import type {
  ListNoticesParams,
  UpdateNoticePayload,
} from '@/api/services/admin/notice.service';

export function noticesQueryKey(params?: ListNoticesParams) {
  return ['notices', 'list', params ?? {}] as const;
}

export function useNotices(params?: ListNoticesParams) {
  return useQuery({
    queryKey: noticesQueryKey(params),
    queryFn: () => noticeService.list(params),
  });
}

export function useUpdateNotice(noticeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNoticePayload) =>
      noticeService.update(noticeId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notices'] });
    },
  });
}
