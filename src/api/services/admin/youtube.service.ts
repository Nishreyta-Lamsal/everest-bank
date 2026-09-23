import { axiosClient } from '@/lib/api/axios-client';

import type {
  ApiResponse,
  PlaylistSyncAllResult,
  PlaylistSyncResult,
  YouTubeListData,
  YouTubePlaylist,
  YouTubeVideo,
} from '@/types/admin';

export type ListPlaylistsParams = {
  search?: string;
  is_active?: boolean;
  ordering?: string;
  page?: number;
  page_size?: number;
};

export type PlaylistWrite = {
  channel_id?: string;
  playlist_id?: string;
  name: string;
  description?: string;
  is_active?: boolean;
};

export type ListVideosParams = {
  search?: string;
  playlist?: number;
  show_on_homepage?: boolean;
  ordering?: string;
  page?: number;
  page_size?: number;
};

export type VideoWrite = {
  playlist: number;
  youtube_video_id: string;
  title: string;
  video_url?: string;
  custom_title?: string | null;
  description?: string;
  thumbnail?: string | null;
  show_on_homepage?: boolean;
};

export const youtubeService = {
  listPlaylists: async (
    params?: ListPlaylistsParams,
  ): Promise<YouTubeListData<YouTubePlaylist>> => {
    const response = await axiosClient.get<
      ApiResponse<YouTubeListData<YouTubePlaylist>>
    >('youtube/playlists/', { params });

    return response.data.data;
  },

  createPlaylist: async (payload: PlaylistWrite): Promise<YouTubePlaylist> => {
    const response = await axiosClient.post<ApiResponse<YouTubePlaylist>>(
      'youtube/playlists/',
      payload,
    );

    return response.data.data;
  },

  updatePlaylist: async (
    playlistId: number,
    payload: Partial<PlaylistWrite>,
  ): Promise<YouTubePlaylist> => {
    const response = await axiosClient.patch<ApiResponse<YouTubePlaylist>>(
      `youtube/playlists/${playlistId}/`,
      payload,
    );

    return response.data.data;
  },

  removePlaylist: async (playlistId: number): Promise<void> => {
    await axiosClient.delete(`youtube/playlists/${playlistId}/`);
  },

  syncPlaylist: async (playlistId: number): Promise<PlaylistSyncResult> => {
    const response = await axiosClient.post<ApiResponse<PlaylistSyncResult>>(
      `youtube/playlists/${playlistId}/sync/`,
    );

    return response.data.data;
  },

  syncAllPlaylists: async (): Promise<PlaylistSyncAllResult> => {
    const response = await axiosClient.post<ApiResponse<PlaylistSyncAllResult>>(
      'youtube/playlists/sync-all/',
    );

    return response.data.data;
  },

  listVideos: async (
    params?: ListVideosParams,
  ): Promise<YouTubeListData<YouTubeVideo>> => {
    const response = await axiosClient.get<
      ApiResponse<YouTubeListData<YouTubeVideo>>
    >('youtube/videos/', { params });

    return response.data.data;
  },

  createVideo: async (payload: VideoWrite): Promise<YouTubeVideo> => {
    const response = await axiosClient.post<ApiResponse<YouTubeVideo>>(
      'youtube/videos/',
      payload,
    );

    return response.data.data;
  },

  updateVideo: async (
    videoId: number,
    payload: Partial<VideoWrite>,
  ): Promise<YouTubeVideo> => {
    const response = await axiosClient.patch<ApiResponse<YouTubeVideo>>(
      `youtube/videos/${videoId}/`,
      payload,
    );

    return response.data.data;
  },

  removeVideo: async (videoId: number): Promise<void> => {
    await axiosClient.delete(`youtube/videos/${videoId}/`);
  },

  toggleVideoHomepage: async (videoId: number): Promise<YouTubeVideo> => {
    const response = await axiosClient.post<ApiResponse<YouTubeVideo>>(
      `youtube/videos/${videoId}/toggle-homepage/`,
    );

    return response.data.data;
  },
};
