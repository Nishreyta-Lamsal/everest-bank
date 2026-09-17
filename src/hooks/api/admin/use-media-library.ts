import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { mediaService } from '@/api/services/admin/media.service';

import type {
  FaceSearchPayload,
  ListMediaParams,
  MediaAutocompleteParams,
  MoveMediaPayload,
  NormalSearchMediaParams,
  UpdateMediaPayload,
} from '@/api/services/admin/media.service';

const MEDIA_KEY = ['media'] as const;

export function useMediaList(params?: ListMediaParams, enabled = true) {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'list', params ?? {}],
    queryFn: () => mediaService.list(params),
    enabled,
  });
}

/**
 * Plain title search (`media/normalsearch/`). Cursor-paginated like the list
 * endpoint, so a caller pages it the same way rather than by page number.
 */
export function useMediaNormalSearch(
  params: NormalSearchMediaParams,
  enabled = true,
) {
  const q = params.q.trim();

  return useQuery({
    queryKey: [...MEDIA_KEY, 'normal-search', { ...params, q }],
    queryFn: () => mediaService.normalSearch({ ...params, q }),
    enabled: enabled && q.length > 0,
    placeholderData: keepPreviousData,
  });
}

export function useMediaAutocomplete(
  params: MediaAutocompleteParams,
  enabled = true,
) {
  const q = params.q.trim();

  return useQuery({
    queryKey: [...MEDIA_KEY, 'autocomplete', { ...params, q }],
    queryFn: () => mediaService.autocomplete({ ...params, q }),
    enabled: enabled && q.length > 0,
    staleTime: 60_000,
    placeholderData: keepPreviousData,
  });
}

export function useFaceSearch() {
  return useMutation({
    mutationFn: (payload: FaceSearchPayload) =>
      mediaService.faceSearch(payload),
  });
}

export function useRecentMedia() {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'recent'],
    queryFn: async () => (await mediaService.recent()) ?? [],
  });
}

export function useMostReusedMedia() {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'most-reused'],
    queryFn: async () => (await mediaService.mostReused()) ?? [],
  });
}

export function useMediaStorage() {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'storage'],
    queryFn: async () => (await mediaService.storage()) ?? null,
  });
}

export function useMediaFolder(id: number) {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'folders', id],
    queryFn: () => mediaService.retrieveFolder(id),
    enabled: Number.isInteger(id),
  });
}

export function useMediaFolders() {
  return useQuery({
    queryKey: [...MEDIA_KEY, 'folders'],
    queryFn: () => mediaService.listFolders(),
  });
}

function useMediaMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MEDIA_KEY });
    },
  });
}

export function useUpdateMedia(id: number) {
  return useMediaMutation((payload: UpdateMediaPayload) =>
    mediaService.update(id, payload),
  );
}

export function useDeleteMedia() {
  return useMediaMutation((id: number) => mediaService.remove(id));
}

export function useMoveMedia() {
  return useMediaMutation((payload: MoveMediaPayload) =>
    mediaService.move(payload),
  );
}

export function useCreateMediaFolder() {
  return useMediaMutation((name: string) => mediaService.createFolder(name));
}

export function useRenameMediaFolder() {
  return useMediaMutation(({ id, name }: { id: number; name: string }) =>
    mediaService.renameFolder(id, name),
  );
}

export function useDeleteMediaFolder() {
  return useMediaMutation((id: number) => mediaService.removeFolder(id));
}
