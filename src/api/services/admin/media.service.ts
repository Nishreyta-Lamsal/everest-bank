import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';
import { unwrapListResponse, unwrapResponse } from '@/lib/api/unwrap-response';

import type {
  ApiResponse,
  Media,
  MediaFolder,
  MediaFolderListData,
  MediaListData,
  MediaStorageUsage,
  MediaType,
  MediaUploadInput,
} from '@/types/admin';

export type ListMediaParams = {
  folder?: number;
  media_type?: MediaType;
  search?: string;
  ordering?: string;
  cursor?: string;
  page_size?: number;
};

export type UpdateMediaPayload = {
  title?: string;
  alt_text?: string;
  caption?: string;
  credit?: string;
  folder?: number | null;
  priority?: number;
  file?: File;
};

export type SearchMediaParams = {
  q?: string;
  search?: string;
  folder?: number;
  media_type?: MediaType;
  ordering?: string;
  sort?: string;
  highlight?: boolean;
  cursor?: string;
  page?: number;
  page_size?: number;
};

/**
 * `media/normalsearch/` is the plain title search: cursor-paginated like the
 * list endpoint, and unlike `media/search/` it takes no `page`, `sort` or
 * `highlight` — only `q`/`search`, `folder`, `media_type`, `ordering`.
 */
export type NormalSearchMediaParams = {
  q: string;
  folder?: number | 'none';
  media_type?: MediaType;
  ordering?: string;
  cursor?: string;
  page_size?: number;
};

export type MediaAutocompleteParams = {
  q: string;
  limit?: number;
  media_type?: MediaType;
  folder_id?: number;
};

export type MediaSuggestion = {
  id?: number;
  text: string;
  media_type?: MediaType;
  thumbnail_url?: string | null;
};

export type FaceSearchPayload = {
  image: File;
  threshold?: number;
  limit?: number;
};

export type MoveMediaPayload = {
  media_ids: number[];
  folder: number | null;
};

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
    caption,
    credit,
    folder,
  }: MediaUploadInput): Promise<Media> => {
    const formData = new FormData();
    formData.append('file', file);

    if (title) formData.append('title', title);
    if (alt_text) formData.append('alt_text', alt_text);
    if (caption) formData.append('caption', caption);
    if (credit) formData.append('credit', credit);
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

    return { ...media, file_url: toMediaPath(media.file_url) };
  },

  list: async (params?: ListMediaParams): Promise<MediaListData> => {
    const response = await axiosClient.get<
      MediaListData | ApiResponse<MediaListData>
    >('media/', { params: { page_size: 20, ...params } });

    return unwrapResponse(response.data);
  },

  search: async (params: SearchMediaParams): Promise<MediaListData> => {
    const response = await axiosClient.get('media/search/', {
      params: { page_size: 20, ...params },
    });

    return unwrapListResponse<Media>(response.data);
  },

  normalSearch: async (
    params: NormalSearchMediaParams,
  ): Promise<MediaListData> => {
    const response = await axiosClient.get('media/normalsearch/', {
      params: {
        page_size: 20,
        ...params,
        ...(params.folder != null ? { folder: params.folder } : {}),
      },
    });

    return unwrapListResponse<Media>(response.data);
  },

  dbSearch: async (params: SearchMediaParams): Promise<MediaListData> => {
    const response = await axiosClient.get('media/db-search/', {
      params: { page_size: 20, ...params },
    });

    return unwrapListResponse<Media>(response.data);
  },

  autocomplete: async (
    params: MediaAutocompleteParams,
  ): Promise<MediaSuggestion[]> => {
    const response = await axiosClient.get('media/autocomplete/', {
      params: { limit: 8, ...params },
    });

    const body = unwrapResponse(response.data as unknown);
    const list = Array.isArray(body)
      ? body
      : Array.isArray((body as { suggestions?: unknown[] })?.suggestions)
        ? (body as { suggestions: unknown[] }).suggestions
        : Array.isArray((body as { results?: unknown[] })?.results)
          ? (body as { results: unknown[] }).results
          : [];

    return list.flatMap((entry): MediaSuggestion[] => {
      if (typeof entry === 'string') {
        return entry.trim() ? [{ text: entry }] : [];
      }

      if (!entry || typeof entry !== 'object') return [];

      const item = entry as Record<string, unknown>;
      const text = [item.text, item.title, item.suggestion, item.value].find(
        (candidate): candidate is string =>
          typeof candidate === 'string' && candidate.trim().length > 0,
      );

      if (!text) return [];

      return [
        {
          id: typeof item.id === 'number' ? item.id : undefined,
          text,
          media_type: item.media_type as MediaType | undefined,
          thumbnail_url:
            typeof item.thumbnail_url === 'string' ? item.thumbnail_url : null,
        },
      ];
    });
  },

  faceSearch: async ({
    image,
    threshold,
    limit,
  }: FaceSearchPayload): Promise<Media[]> => {
    const formData = new FormData();
    formData.append('image', image);

    if (threshold !== undefined)
      formData.append('threshold', String(threshold));
    if (limit !== undefined) formData.append('limit', String(limit));

    const response = await axiosClient.post('media/face-search/', formData);

    return unwrapListResponse<Media>(response.data).results;
  },

  recent: async (): Promise<Media[]> => {
    const response = await axiosClient.get<Media[] | ApiResponse<Media[]>>(
      'media/recent/',
    );

    return unwrapResponse(response.data);
  },

  mostReused: async (): Promise<Media[]> => {
    const response = await axiosClient.get<Media[] | ApiResponse<Media[]>>(
      'media/most-reused/',
    );

    return unwrapResponse(response.data);
  },

  storage: async (): Promise<MediaStorageUsage> => {
    const response = await axiosClient.get<
      MediaStorageUsage | ApiResponse<MediaStorageUsage>
    >('media/storage/');

    return unwrapResponse(response.data);
  },

  update: async (id: number, payload: UpdateMediaPayload): Promise<Media> => {
    const formData = new FormData();

    Object.entries(payload).forEach(([key, value]) => {
      if (value === undefined) return;

      formData.append(key, value === null ? '' : (value as string | Blob));
    });

    const response = await axiosClient.patch<Media | ApiResponse<Media>>(
      `media/${id}/`,
      formData,
    );

    return unwrapResponse(response.data);
  },

  remove: async (id: number): Promise<void> => {
    await axiosClient.delete(`media/${id}/`);
  },

  move: async (payload: MoveMediaPayload): Promise<void> => {
    await axiosClient.post('media/move/', payload);
  },

  listFolders: async (): Promise<MediaFolderListData> => {
    const response = await axiosClient.get('media/folders/', {
      params: { page_size: 100 },
    });

    return unwrapListResponse<MediaFolder>(response.data);
  },

  retrieveFolder: async (id: number): Promise<MediaFolder> => {
    const response = await axiosClient.get<
      MediaFolder | ApiResponse<MediaFolder>
    >(`media/folders/${id}/`);

    return unwrapResponse(response.data);
  },

  createFolder: async (name: string): Promise<MediaFolder> => {
    const response = await axiosClient.post<
      MediaFolder | ApiResponse<MediaFolder>
    >('media/folders/', { name });

    return unwrapResponse(response.data);
  },

  renameFolder: async (id: number, name: string): Promise<MediaFolder> => {
    const response = await axiosClient.patch<
      MediaFolder | ApiResponse<MediaFolder>
    >(`media/folders/${id}/`, { name });

    return unwrapResponse(response.data);
  },

  removeFolder: async (id: number): Promise<void> => {
    await axiosClient.delete(`media/folders/${id}/`);
  },
};
