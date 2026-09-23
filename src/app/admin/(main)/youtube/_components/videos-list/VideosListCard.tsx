import { Card } from '@/components/admin/ui/card';
import ListPagination from '../ListPagination';
import VideosList from './VideosList';

import type { YouTubePlaylist, YouTubeVideo } from '@/types/admin';

type VideosListCardProps = {
  items: YouTubeVideo[];
  isPending?: boolean;
  isError?: boolean;
  emptyLabel: string;
  playlists: YouTubePlaylist[];
  playlistNames: Record<number, string>;
  showPlaylist: boolean;
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export default function VideosListCard({
  items,
  isPending,
  isError,
  emptyLabel,
  playlists,
  playlistNames,
  showPlaylist,
  page,
  pageSize,
  count,
  onPageChange,
}: VideosListCardProps) {
  return (
    <Card variant="primary" className="w-full px-4 py-3">
      <VideosList
        items={items}
        isPending={isPending}
        isError={isError}
        emptyLabel={emptyLabel}
        playlists={playlists}
        playlistNames={playlistNames}
        showPlaylist={showPlaylist}
      />
      <ListPagination
        page={page}
        pageSize={pageSize}
        count={count}
        onPageChange={onPageChange}
      />
    </Card>
  );
}
