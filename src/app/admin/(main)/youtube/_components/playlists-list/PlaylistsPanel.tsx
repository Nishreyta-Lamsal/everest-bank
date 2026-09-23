'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import PlaylistsListCard from './PlaylistsListCard';
import PlaylistEditDrawer from './PlaylistEditDrawer';

import {
  useSyncAllYouTubePlaylists,
  useYouTubePlaylists,
} from '@/hooks/api/admin/use-youtube';
import { useDebounce } from '@/hooks/useDebounce';

import { cn } from '@/lib/utils';

import type { YouTubePlaylist } from '@/types/admin';

const PAGE_SIZE = 10;

const ORDERING_OPTIONS = [
  { label: 'Newest first', value: '-created_at' },
  { label: 'Oldest first', value: 'created_at' },
  { label: 'Name A–Z', value: 'name' },
  { label: 'Name Z–A', value: '-name' },
];

type PlaylistsPanelProps = {
  onViewVideos: (playlist: YouTubePlaylist) => void;
};

export default function PlaylistsPanel({ onViewVideos }: PlaylistsPanelProps) {
  const [searchInput, setSearchInput] = useState('');
  const [ordering, setOrdering] = useState(ORDERING_OPTIONS[0].value);
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const search = useDebounce(searchInput.trim());

  const { data, isPending, isError } = useYouTubePlaylists({
    search: search || undefined,
    ordering,
    page,
    page_size: PAGE_SIZE,
  });
  const syncAll = useSyncAllYouTubePlaylists();

  // Deleting the last row of the last page leaves `page` past the end, which
  // the API answers with a 404, fall back to the first page.
  if (isError && page > 1) setPage(1);

  return (
    <>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            variant="default"
            size="medium"
            placeholder="Search playlists"
            containerClassName="w-[260px]"
            leftIcon={
              <icon.search className="size-4 shrink-0 text-slate-400" />
            }
            value={searchInput}
            onChange={(event) => {
              setSearchInput(event.target.value);
              setPage(1);
            }}
          />
          <Select
            variant="default"
            size="medium"
            className="w-[180px]"
            options={ORDERING_OPTIONS}
            value={ordering}
            onValueChange={(value) => {
              setOrdering(value);
              setPage(1);
            }}
          />
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="secondary"
            disabled={syncAll.isPending}
            onClick={() => syncAll.mutate()}
          >
            <icon.refresh
              className={cn('size-4', syncAll.isPending && 'animate-spin')}
            />
            {syncAll.isPending ? 'Syncing…' : 'Sync all'}
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={() => setIsAddOpen(true)}
          >
            <icon.plus />
            Add playlist
          </Button>
        </div>
      </div>

      <PlaylistsListCard
        items={data?.results ?? []}
        isPending={isPending}
        isError={isError}
        emptyLabel={
          search ? 'No playlists matched your search.' : 'No playlists yet.'
        }
        onViewVideos={onViewVideos}
        page={page}
        pageSize={PAGE_SIZE}
        count={data?.count ?? 0}
        onPageChange={setPage}
      />

      {isAddOpen && (
        <PlaylistEditDrawer
          entry={null}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </>
  );
}
