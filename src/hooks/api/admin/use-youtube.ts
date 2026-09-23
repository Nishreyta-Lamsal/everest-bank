import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import { toast } from 'sonner';

import { youtubeService } from '@/api/services/admin/youtube.service';

import { readApiError } from '@/lib/admin/read-api-error';

import type {
  ListPlaylistsParams,
  ListVideosParams,
  PlaylistWrite,
  VideoWrite,
} from '@/api/services/admin/youtube.service';

export function youtubePlaylistsQueryKey(params?: ListPlaylistsParams) {
  return ['youtube-playlists', 'list', params ?? {}] as const;
}

export function youtubeVideosQueryKey(params?: ListVideosParams) {
  return ['youtube-videos', 'list', params ?? {}] as const;
}

/**
 * Playlist rows show a video count and video rows show their playlist, so any
 * write on either side refreshes both lists.
 */
async function invalidateYouTube(
  queryClient: ReturnType<typeof useQueryClient>,
) {
  await Promise.all([
    queryClient.invalidateQueries({ queryKey: ['youtube-playlists'] }),
    queryClient.invalidateQueries({ queryKey: ['youtube-videos'] }),
  ]);
}

export function useYouTubePlaylists(
  params?: ListPlaylistsParams,
  enabled = true,
) {
  return useQuery({
    queryKey: youtubePlaylistsQueryKey(params),
    queryFn: () => youtubeService.listPlaylists(params),
    placeholderData: keepPreviousData,
    enabled,
  });
}

export function useCreateYouTubePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PlaylistWrite) =>
      youtubeService.createPlaylist(payload),
    onSuccess: async (playlist) => {
      await invalidateYouTube(queryClient);
      toast.success(`"${playlist.name}" added.`);
    },
    onError: () => {
      toast.error('Could not add the playlist. Please try again.');
    },
  });
}

export function useUpdateYouTubePlaylist(playlistId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<PlaylistWrite>) =>
      youtubeService.updatePlaylist(playlistId, payload),
    onSuccess: async (playlist) => {
      await invalidateYouTube(queryClient);
      toast.success(`"${playlist.name}" updated.`);
    },
    onError: () => {
      toast.error('Could not update the playlist. Please try again.');
    },
  });
}

export function useDeleteYouTubePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistId: number) =>
      youtubeService.removePlaylist(playlistId),
    onSuccess: async () => {
      await invalidateYouTube(queryClient);
      toast.success('Playlist deleted.');
    },
    onError: () => {
      toast.error('Could not delete the playlist. Please try again.');
    },
  });
}

export function useSyncYouTubePlaylist() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (playlistId: number) => youtubeService.syncPlaylist(playlistId),
    onSuccess: async ({ created, skipped }) => {
      await invalidateYouTube(queryClient);
      toast.success(
        `Sync finished: ${created} new video${created === 1 ? '' : 's'}, ${skipped} already saved.`,
      );
    },
    onError: (error) => {
      toast.error(readApiError(error, 'Could not sync the playlist.'));
    },
  });
}

export function useSyncAllYouTubePlaylists() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => youtubeService.syncAllPlaylists(),
    onSuccess: async ({ playlists_synced, videos_created }) => {
      await invalidateYouTube(queryClient);
      toast.success(
        `Synced ${playlists_synced} playlist${playlists_synced === 1 ? '' : 's'}: ${videos_created} new video${videos_created === 1 ? '' : 's'}.`,
      );
    },
    onError: (error) => {
      toast.error(readApiError(error, 'Could not sync the playlists.'));
    },
  });
}

export function useYouTubeVideos(params?: ListVideosParams) {
  return useQuery({
    queryKey: youtubeVideosQueryKey(params),
    queryFn: () => youtubeService.listVideos(params),
    placeholderData: keepPreviousData,
  });
}

export function useCreateYouTubeVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VideoWrite) => youtubeService.createVideo(payload),
    onSuccess: async () => {
      await invalidateYouTube(queryClient);
      toast.success('Video added.');
    },
    onError: () => {
      toast.error('Could not add the video. Please try again.');
    },
  });
}

export function useUpdateYouTubeVideo(videoId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<VideoWrite>) =>
      youtubeService.updateVideo(videoId, payload),
    onSuccess: async () => {
      await invalidateYouTube(queryClient);
      toast.success('Video updated.');
    },
    onError: () => {
      toast.error('Could not update the video. Please try again.');
    },
  });
}

export function useDeleteYouTubeVideo() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: number) => youtubeService.removeVideo(videoId),
    onSuccess: async () => {
      await invalidateYouTube(queryClient);
      toast.success('Video deleted.');
    },
    onError: () => {
      toast.error('Could not delete the video. Please try again.');
    },
  });
}

export function useToggleYouTubeVideoHomepage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (videoId: number) =>
      youtubeService.toggleVideoHomepage(videoId),
    onSuccess: async (video) => {
      await invalidateYouTube(queryClient);
      toast.success(
        video.show_on_homepage
          ? 'Video is now on the homepage.'
          : 'Video removed from the homepage.',
      );
    },
    onError: () => {
      toast.error('Could not update the video. Please try again.');
    },
  });
}
