import VideoRow from './VideoRow';

import type { YouTubePlaylist, YouTubeVideo } from '@/types/admin';

type VideosListProps = {
  items: YouTubeVideo[];
  isPending?: boolean;
  isError?: boolean;
  emptyLabel: string;
  playlists: YouTubePlaylist[];
  playlistNames: Record<number, string>;
  showPlaylist: boolean;
};

function Message({ children }: { children: string }) {
  return (
    <p className="text-paragraph-sm px-4 py-6 text-neutral-700/68">
      {children}
    </p>
  );
}

export default function VideosList({
  items,
  isPending,
  isError,
  emptyLabel,
  playlists,
  playlistNames,
  showPlaylist,
}: VideosListProps) {
  if (isPending) {
    return (
      <div className="flex w-full flex-col gap-2 py-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-[74px] w-full animate-pulse rounded-[6px] bg-slate-100"
          />
        ))}
      </div>
    );
  }

  if (isError) {
    return <Message>Could not load videos.</Message>;
  }

  if (items.length === 0) {
    return <Message>{emptyLabel}</Message>;
  }

  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((video) => (
        <VideoRow
          key={video.id}
          video={video}
          playlists={playlists}
          playlistName={
            showPlaylist
              ? (playlistNames[video.playlist] ?? `Playlist #${video.playlist}`)
              : undefined
          }
        />
      ))}
    </div>
  );
}
