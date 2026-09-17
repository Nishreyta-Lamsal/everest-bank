import { useMutation, useQueryClient } from '@tanstack/react-query';

import { mediaService } from '@/api/services/admin/media.service';

import type { MediaUploadInput } from '@/types/admin';

export function useUploadMedia() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (input: MediaUploadInput) => mediaService.upload(input),
    onSuccess: async () => {
      // The library lists, storage totals and folder counts all shift.
      await queryClient.invalidateQueries({ queryKey: ['media'] });
    },
  });
}
