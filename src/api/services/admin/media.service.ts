import { axiosClient } from '@/lib/api/axios-client';

import type { ApiResponse, Media, MediaUploadInput } from '@/types/admin';

function unwrapMedia(payload: Media | ApiResponse<Media>): Media {
  if (payload && 'data' in payload && payload.data) {
    return payload.data;
  }

  return payload as Media;
}

export const mediaService = {
  upload: async ({
    file,
    title,
    alt_text,
    folder,
  }: MediaUploadInput): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);

    if (title) formData.append('title', title);
    if (alt_text) formData.append('alt_text', alt_text);
    if (folder !== undefined) formData.append('folder', String(folder));

    const response = await axiosClient.post<Media | ApiResponse<Media>>(
      'media/',
      formData,
    );

    const media = unwrapMedia(response.data);

    if (!media?.file_url) {
      throw new Error(
        `Media upload succeeded but returned no file_url: ${JSON.stringify(
          response.data,
        )}`,
      );
    }

    return media;
  },
};
