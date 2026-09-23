import PlaylistRow from './PlaylistRow';

import type { YouTubePlaylist } from '@/types/admin';

type PlaylistsListProps = {
  items: YouTubePlaylist[];
  isPending?: boolean;
  isError?: boolean;
  emptyLabel: string;
  onViewVideos: (playlist: YouTubePlaylist) => void;
};

function Message({ children }: { children: string }) {
  return (
    <p className="text-paragraph-sm px-4 py-6 text-neutral-700/68">
      {children}
    </p>
  );
}

export default function PlaylistsList({
  items,
  isPending,
  isError,
  emptyLabel,
  onViewVideos,
}: PlaylistsListProps) {
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
    return <Message>Could not load playlists.</Message>;
  }

  if (items.length === 0) {
    return <Message>{emptyLabel}</Message>;
  }

  return (
    <div className="flex w-full flex-col divide-y divide-black/3">
      {items.map((playlist) => (
        <PlaylistRow
          key={playlist.id}
          playlist={playlist}
          onViewVideos={onViewVideos}
        />
      ))}
    </div>
  );
}
