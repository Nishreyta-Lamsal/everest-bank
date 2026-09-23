'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import VideosListCard from './VideosListCard';
import VideoEditDrawer from './VideoEditDrawer';

import {
  useYouTubePlaylists,
  useYouTubeVideos,
} from '@/hooks/api/admin/use-youtube';
import { useDebounce } from '@/hooks/useDebounce';

import type { YouTubePlaylist } from '@/types/admin';

const PAGE_SIZE = 10;

const PLAYLIST_OPTIONS_PAGE_SIZE = 100;

type HomepageFilter = 'all' | 'on' | 'off';

const HOMEPAGE_FILTER_OPTIONS: { label: string; value: HomepageFilter }[] = [
  { label: 'All videos', value: 'all' },
  { label: 'On homepage', value: 'on' },
  { label: 'Not on homepage', value: 'off' },
];

type VideosPanelProps = {
  playlist?: YouTubePlaylist | null;
  onBack?: () => void;
};

export default function VideosPanel({
  playlist = null,
  onBack,
}: VideosPanelProps) {
  const [searchInput, setSearchInput] = useState('');
  const [homepageFilter, setHomepageFilter] = useState<HomepageFilter>('all');
  const [page, setPage] = useState(1);
  const [isAddOpen, setIsAddOpen] = useState(false);

  const search = useDebounce(searchInput.trim());

  const { data, isPending, isError } = useYouTubeVideos({
    search: search || undefined,
    playlist: playlist?.id,
    show_on_homepage:
      homepageFilter === 'all' ? undefined : homepageFilter === 'on',
    page,
    page_size: PAGE_SIZE,
  });

  const { data: playlistsData } = useYouTubePlaylists({
    ordering: 'name',
    page_size: PLAYLIST_OPTIONS_PAGE_SIZE,
  });
  const playlists = playlistsData?.results ?? [];
  const playlistNames = Object.fromEntries(
    playlists.map((item) => [item.id, item.name]),
  ) as Record<number, string>;

  // Deleting the last row of the last page leaves `page` past the end, which
  // the API answers with a 404, fall back to the first page.
  if (isError && page > 1) setPage(1);

  const hasFilters = Boolean(search) || homepageFilter !== 'all';

  return (
    <>
      {playlist && (
        <div className="flex flex-wrap items-center gap-3">
          <Button type="button" variant="secondary" onClick={onBack}>
            <icon.arrowLeft className="size-4" />
            All playlists
          </Button>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-[16px] font-medium text-neutral-900">
              {playlist.name}
            </p>
            <p className="truncate text-[12px] text-neutral-700/68">
              {playlist.playlist_id}
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <Input
            variant="default"
            size="medium"
            placeholder="Search videos"
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
            options={HOMEPAGE_FILTER_OPTIONS}
            value={homepageFilter}
            onValueChange={(value) => {
              setHomepageFilter(value as HomepageFilter);
              setPage(1);
            }}
          />
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => setIsAddOpen(true)}
        >
          <icon.plus />
          Add video
        </Button>
      </div>

      <VideosListCard
        items={data?.results ?? []}
        isPending={isPending}
        isError={isError}
        emptyLabel={
          hasFilters
            ? 'No videos matched your filters.'
            : 'No videos yet. Sync a playlist or add one manually.'
        }
        playlists={playlists}
        playlistNames={playlistNames}
        showPlaylist={!playlist}
        page={page}
        pageSize={PAGE_SIZE}
        count={data?.count ?? 0}
        onPageChange={setPage}
      />

      {isAddOpen && (
        <VideoEditDrawer
          entry={null}
          playlists={playlists}
          defaultPlaylistId={playlist?.id ?? null}
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </>
  );
}
