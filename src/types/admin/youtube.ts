export type YouTubePlaylist = {
  id: number;
  channel_id: string;
  playlist_id: string;
  name: string;
  description: string;
  added_by: string;
  is_active: boolean;
  video_count: number;
  created_at: string;
  updated_at: string;
};

export type YouTubeVideo = {
  id: number;
  playlist: number;
  youtube_video_id: string;
  video_url: string;
  title: string;
  custom_title: string | null;
  display_title: string;
  description: string;
  thumbnail: string | null;
  published_at: string | null;
  views: number | null;
  show_on_homepage: boolean;
  created_at: string;
  updated_at: string;
};

export type YouTubeListData<T> = {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

export type PlaylistSyncResult = {
  created: number;
  skipped: number;
};

export type PlaylistSyncAllResult = {
  playlists_synced: number;
  videos_created: number;
};
