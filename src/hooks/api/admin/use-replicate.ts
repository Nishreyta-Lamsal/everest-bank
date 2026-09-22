import { useMutation, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { replicateService } from '@/api/services/admin/replicate.service';

import type { ReplicatePagePayload } from '@/api/services/admin/replicate.service';

export function useReplicatePage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ReplicatePagePayload) =>
      replicateService.create(payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['pages'] });
      toast.success('Page duplicated.');
    },
    onError: () => {
      toast.error('Could not duplicate the page. Please try again.');
    },
  });
}
