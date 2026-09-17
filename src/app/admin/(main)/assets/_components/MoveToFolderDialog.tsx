'use client';

import { useState } from 'react';

import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { icon } from '@/components/admin/icons';

import {
  useMediaFolders,
  useMoveMedia,
} from '@/hooks/api/admin/use-media-library';

import { cn } from '@/lib/utils';
import { readApiError } from '@/lib/admin/read-api-error';

type MoveToFolderDialogProps = {
  mediaId: number;
  currentFolderId?: number | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function MoveToFolderDialog({
  mediaId,
  currentFolderId,
  isOpen,
  onClose,
}: MoveToFolderDialogProps) {
  const [selectedId, setSelectedId] = useState<number | null>(
    currentFolderId ?? null,
  );

  const { data, isPending } = useMediaFolders();
  const moveMedia = useMoveMedia();

  const folders = data?.results ?? [];

  function handleMove() {
    moveMedia.mutate(
      { media_ids: [mediaId], folder: selectedId },
      { onSuccess: onClose },
    );
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Move to folder"
      description="Choose where this file should live."
      className="max-w-[420px]"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={moveMedia.isPending}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            onClick={handleMove}
            disabled={moveMedia.isPending}
          >
            {moveMedia.isPending ? 'Moving…' : 'Move'}
          </Button>
        </>
      }
    >
      {isPending && (
        <div className="flex w-full flex-col gap-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[52px] animate-pulse rounded-[8px] bg-slate-100"
            />
          ))}
        </div>
      )}

      <button
        type="button"
        onClick={() => setSelectedId(null)}
        className={cn(
          'flex w-full items-center gap-3 rounded-[8px] border p-3 text-left transition-colors',
          selectedId === null
            ? 'border-blue-500 bg-blue-50'
            : 'border-black/5 hover:bg-slate-50',
        )}
      >
        <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-slate-100 p-2">
          <icon.close className="size-4 text-slate-500" />
        </div>
        <p className="text-[14px] font-medium text-neutral-900">No folder</p>
      </button>

      {folders.map((folder) => (
        <button
          key={folder.id}
          type="button"
          onClick={() => setSelectedId(folder.id)}
          className={cn(
            'flex w-full items-center gap-3 rounded-[8px] border p-3 text-left transition-colors',
            selectedId === folder.id
              ? 'border-blue-500 bg-blue-50'
              : 'border-black/5 hover:bg-slate-50',
          )}
        >
          <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-slate-100 p-2">
            <icon.images className="size-4 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col">
            <p className="truncate text-[14px] font-medium text-neutral-900">
              {folder.name}
            </p>
            <p className="text-[12px] text-neutral-700/68">
              {folder.file_count} file{folder.file_count === 1 ? '' : 's'}
            </p>
          </div>
        </button>
      ))}

      {moveMedia.isError && (
        <p className="text-[12px] text-red-600">
          {readApiError(moveMedia.error, 'Could not move this file.')}
        </p>
      )}
    </Drawer>
  );
}
