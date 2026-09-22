import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { toast } from 'sonner';

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
    onError: () => {
      toast.error('Could not search by face. Please try again.');
    },
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
  successMessage: string,
  errorMessage: string,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: MEDIA_KEY });
      toast.success(successMessage);
    },
    onError: () => {
      toast.error(errorMessage);
    },
  });
}

export function useUpdateMedia(id: number) {
  return useMediaMutation(
    (payload: UpdateMediaPayload) => mediaService.update(id, payload),
    'Media updated.',
    'Could not update media. Please try again.',
  );
}

export function useDeleteMedia() {
  return useMediaMutation(
    (id: number) => mediaService.remove(id),
    'Media deleted.',
    'Could not delete media. Please try again.',
  );
}

export function useMoveMedia() {
  return useMediaMutation(
    (payload: MoveMediaPayload) => mediaService.move(payload),
    'Media moved.',
    'Could not move media. Please try again.',
  );
}

export function useCreateMediaFolder() {
  return useMediaMutation(
    (name: string) => mediaService.createFolder(name),
    'Folder created.',
    'Could not create the folder. Please try again.',
  );
}

export function useRenameMediaFolder() {
  return useMediaMutation(
    ({ id, name }: { id: number; name: string }) =>
      mediaService.renameFolder(id, name),
    'Folder renamed.',
    'Could not rename the folder. Please try again.',
  );
}

export function useDeleteMediaFolder() {
  return useMediaMutation(
    (id: number) => mediaService.removeFolder(id),
    'Folder deleted.',
    'Could not delete the folder. Please try again.',
  );
}
