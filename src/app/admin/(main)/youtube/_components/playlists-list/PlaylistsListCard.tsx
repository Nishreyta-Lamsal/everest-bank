import { Card } from '@/components/admin/ui/card';
import ListPagination from '../ListPagination';
import PlaylistsList from './PlaylistsList';

import type { YouTubePlaylist } from '@/types/admin';

type PlaylistsListCardProps = {
  items: YouTubePlaylist[];
  isPending?: boolean;
  isError?: boolean;
  emptyLabel: string;
  onViewVideos: (playlist: YouTubePlaylist) => void;
  page: number;
  pageSize: number;
  count: number;
  onPageChange: (page: number) => void;
};

export default function PlaylistsListCard({
  items,
  isPending,
  isError,
  emptyLabel,
  onViewVideos,
  page,
  pageSize,
  count,
  onPageChange,
}: PlaylistsListCardProps) {
  return (
    <Card variant="primary" className="w-full px-4 py-3">
      <PlaylistsList
        items={items}
        isPending={isPending}
        isError={isError}
        emptyLabel={emptyLabel}
        onViewVideos={onViewVideos}
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
