'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import ActionMenu from '@/components/admin/shared/ActionMenu';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import PlaylistEditDrawer from './PlaylistEditDrawer';

import {
  useDeleteYouTubePlaylist,
  useSyncYouTubePlaylist,
} from '@/hooks/api/admin/use-youtube';

import { cn } from '@/lib/utils';
import { formatUpdatedLabel } from '@/lib/admin/format-updated-label';
import { readApiError } from '@/lib/admin/read-api-error';

import type { YouTubePlaylist } from '@/types/admin';

type PlaylistRowProps = {
  playlist: YouTubePlaylist;
  onViewVideos: (playlist: YouTubePlaylist) => void;
};

export default function PlaylistRow({
  playlist,
  onViewVideos,
}: PlaylistRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deletePlaylist = useDeleteYouTubePlaylist();
  const syncPlaylist = useSyncYouTubePlaylist();

  const meta = [
    `${playlist.video_count} video${playlist.video_count === 1 ? '' : 's'}`,
    playlist.playlist_id,
    playlist.added_by?.trim() && `added by ${playlist.added_by.trim()}`,
    formatUpdatedLabel(playlist.updated_at),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex shrink-0 items-center rounded-[4px] bg-slate-100 p-3">
              <icon.video className="size-6 text-slate-950" />
            </div>
            <div className="flex min-w-0 flex-col gap-0.5">
              <button
                type="button"
                onClick={() => onViewVideos(playlist)}
                title={playlist.name}
                className="cursor-pointer truncate text-left text-[16px] leading-[1.6] text-neutral-700 hover:underline"
              >
                {playlist.name}
              </button>
              <p className="truncate text-[12px] leading-[1.6] text-neutral-700/68">
                {meta}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
          {syncPlaylist.isPending && (
            <span className="flex items-center gap-1.5 text-[13px] text-slate-600">
              <icon.refresh className="size-4 animate-spin" />
              Syncing…
            </span>
          )}

          <span
            className={cn(
              'text-paragraph-sm-medium flex items-center justify-center gap-1.5 rounded-full px-3 py-2',
              playlist.is_active
                ? 'bg-[#ebfef6] text-[#059669]'
                : 'bg-[#edf2f7] text-[#65738a]',
            )}
          >
            {playlist.is_active ? 'Active' : 'Inactive'}
          </span>

          <ActionMenu
            label={`Actions for ${playlist.name}`}
            items={[
              {
                label: 'View videos',
                iconKey: 'video',
                onSelect: () => onViewVideos(playlist),
              },
              {
                label: 'Sync',
                iconKey: 'refresh',
                onSelect: () => {
                  if (!syncPlaylist.isPending) syncPlaylist.mutate(playlist.id);
                },
              },
              {
                label: 'Edit',
                iconKey: 'edit',
                onSelect: () => setIsEditOpen(true),
              },
              {
                label: 'Delete',
                iconKey: 'trash',
                isDestructive: true,
                onSelect: () => setIsDeleteOpen(true),
              },
            ]}
          />
        </div>
      </div>

      {isEditOpen && (
        <PlaylistEditDrawer
          entry={playlist}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deletePlaylist.reset();
        }}
        onConfirm={() =>
          deletePlaylist.mutate(playlist.id, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete playlist?"
        description={
          <>
            <span className="font-medium text-neutral-900">
              {playlist.name}
            </span>
            {' will be permanently removed. This cannot be undone.'}
          </>
        }
        isPending={deletePlaylist.isPending}
        error={
          deletePlaylist.isError
            ? readApiError(deletePlaylist.error, 'Could not delete this item.')
            : undefined
        }
      />
    </>
  );
}
