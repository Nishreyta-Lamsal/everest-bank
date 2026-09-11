import { useMutation } from '@tanstack/react-query';

import { mediaService } from '@/api/services/admin/media.service';

import type { MediaUploadInput } from '@/types/admin';

export function useUploadMedia() {
  return useMutation({
    mutationFn: (input: MediaUploadInput) => mediaService.upload(input),
  });
}
