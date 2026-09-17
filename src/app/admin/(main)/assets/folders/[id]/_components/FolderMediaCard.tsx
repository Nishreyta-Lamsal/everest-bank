'use client';

import { useState } from 'react';

import RecentFilesToolbar, {
  type ViewMode,
} from '../../../_components/recent-files/RecentFilesToolbar';
import RecentFilesGrid from '../../../_components/recent-files/RecentFilesGrid';
import RecentFilesTable from '../../../_components/recent-files/RecentFilesTable';
import RecentFilesPagination from '../../../_components/recent-files/RecentFilesPagination';
import MediaDetailsDrawer from '../../../_components/MediaDetailsDrawer';

import {
  useMediaList,
  useMediaNormalSearch,
} from '@/hooks/api/admin/use-media-library';

import { useCursorPagination } from '@/hooks/useCursorPagination';
import { useDebounce } from '@/hooks/useDebounce';

import { readNextCursor } from '@/lib/api/unwrap-response';

import type { Media } from '@/types/admin';

type FolderMediaCardProps = {
  folderId: number;
  onLatestChange?: (createdAt?: string) => void;
};

export default function FolderMediaCard({ folderId }: FolderMediaCardProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [search, setSearch] = useState('');
  const [ordering, setOrdering] = useState('-created_at');
  const [selected, setSelected] = useState<Media | null>(null);
  const listPagination = useCursorPagination();
  const searchPagination = useCursorPagination();
  const [faceResults, setFaceResults] = useState<Media[] | null>(null);

  const debouncedSearch = useDebounce(search, 400);

  const isSearching = debouncedSearch.trim().length > 0;
  const isFaceSearching = faceResults !== null;
  const cursor = listPagination.cursor;
  const searchCursor = searchPagination.cursor;

  const listQuery = useMediaList(
    {
      folder: folderId,
      ordering,
      ...(cursor ? { cursor } : {}),
    },
    !isSearching && !isFaceSearching,
  );

  const searchQuery = useMediaNormalSearch(
    {
      q: debouncedSearch,
      folder: folderId,
      ordering,
      ...(searchCursor ? { cursor: searchCursor } : {}),
    },
    isSearching && !isFaceSearching,
  );

  const activeQuery = isSearching ? searchQuery : listQuery;
  const { data } = activeQuery;

  const isPending = isFaceSearching ? false : activeQuery.isPending;
  const isError = isFaceSearching ? false : activeQuery.isError;

  const items = faceResults ?? data?.results ?? [];

  function resetPaging<T>(setter: (value: T) => void) {
    return (value: T) => {
      listPagination.reset();
      searchPagination.reset();
      setter(value);
    };
  }

  return (
    <>
      <div className="flex w-full flex-col rounded-[8px] border border-white bg-white/90 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]">
        <RecentFilesToolbar
          title="Files"
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          search={search}
          onSearchChange={resetPaging(setSearch)}
          ordering={ordering}
          onOrderingChange={resetPaging(setOrdering)}
          folderId={String(folderId)}
          onFolderChange={() => {}}
          folders={[]}
          showFolderFilter={false}
          onFaceResults={setFaceResults}
          isFaceSearchActive={isFaceSearching}
        />

        {isPending && (
          <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="h-[160px] animate-pulse rounded-[8px] bg-slate-100"
              />
            ))}
          </div>
        )}

        {isError && (
          <p className="px-4 py-10 text-center text-[13px] text-neutral-700/68">
            Could not load this folder&apos;s media.
          </p>
        )}

        {!isPending && !isError && items.length === 0 && (
          <p className="px-4 py-10 text-center text-[13px] text-neutral-700/68">
            {isSearching || isFaceSearching
              ? 'No media matched that search.'
              : 'This folder is empty.'}
          </p>
        )}

        {items.length > 0 &&
          (viewMode === 'grid' ? (
            <RecentFilesGrid items={items} onSelect={setSelected} />
          ) : (
            <RecentFilesTable items={items} onSelect={setSelected} />
          ))}

        <RecentFilesPagination
          hasPrevious={
            !isFaceSearching &&
            (isSearching
              ? searchPagination.canGoPrevious
              : listPagination.canGoPrevious)
          }
          hasNext={
            !isFaceSearching &&
            (data?.has_more ?? Boolean(readNextCursor(data)))
          }
          onPrevious={() => {
            if (isSearching) {
              searchPagination.goToPreviousPage();

              return;
            }

            listPagination.goToPreviousPage();
          }}
          onNext={() => {
            const next = readNextCursor(data);

            if (isSearching) {
              searchPagination.goToNextPage(next);

              return;
            }

            listPagination.goToNextPage(next);
          }}
        />
      </div>

      {selected && (
        <MediaDetailsDrawer
          media={selected}
          isOpen={Boolean(selected)}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
