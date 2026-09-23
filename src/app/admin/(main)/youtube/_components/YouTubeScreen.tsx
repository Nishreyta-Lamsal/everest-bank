'use client';

import { useState } from 'react';

import YouTubeHeader from './YouTubeHeader';
import YouTubeFilterTabs from './youtube-filters/YouTubeFilterTabs';
import PlaylistsPanel from './playlists-list/PlaylistsPanel';
import VideosPanel from './videos-list/VideosPanel';

import {
  useYouTubePlaylists,
  useYouTubeVideos,
} from '@/hooks/api/admin/use-youtube';

import type { YouTubeTab } from './youtube-filters/YouTubeFilterTabs';
import type { YouTubePlaylist } from '@/types/admin';

export default function YouTubeScreen() {
  const [activeTab, setActiveTab] = useState<YouTubeTab>('playlists');
  const [viewingPlaylist, setViewingPlaylist] =
    useState<YouTubePlaylist | null>(null);

  const playlistsTotal = useYouTubePlaylists({ page_size: 1 });
  const videosTotal = useYouTubeVideos({ page_size: 1 });

  const counts: Record<YouTubeTab, number> = {
    playlists: playlistsTotal.data?.count ?? 0,
    videos: videosTotal.data?.count ?? 0,
  };

  return (
    <div className="flex w-full flex-col gap-6">
      <YouTubeHeader />

      <YouTubeFilterTabs
        activeTab={activeTab}
        counts={counts}
        onTabChange={(tab) => {
          setViewingPlaylist(null);
          setActiveTab(tab);
        }}
      />

      {activeTab === 'videos' ? (
        <VideosPanel />
      ) : viewingPlaylist ? (
        <VideosPanel
          key={viewingPlaylist.id}
          playlist={viewingPlaylist}
          onBack={() => setViewingPlaylist(null)}
        />
      ) : (
        <PlaylistsPanel onViewVideos={setViewingPlaylist} />
      )}
    </div>
  );
}
