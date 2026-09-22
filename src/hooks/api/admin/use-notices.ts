import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { noticeService } from '@/api/services/admin/notice.service';

import type {
  CreateNoticePayload,
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

export function useCreateNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateNoticePayload) => noticeService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast.success('Notice created.');
    },
    onError: () => {
      toast.error('Could not create the notice. Please try again.');
    },
  });
}

export function useUpdateNotice(noticeId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateNoticePayload) =>
      noticeService.update(noticeId, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast.success('Notice updated.');
    },
    onError: () => {
      toast.error('Could not update the notice. Please try again.');
    },
  });
}

export function useDeleteNotice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => noticeService.remove(id),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['notices'] });
      toast.success('Notice deleted.');
    },
    onError: () => {
      toast.error('Could not delete the notice. Please try again.');
    },
  });
}
