'use client';

import Link from 'next/link';
import { useState } from 'react';

import ActionMenu from '../ActionMenu';
import { useFolderDroppable } from '../dnd/media-dnd';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import {
  useDeleteMediaFolder,
  useRenameMediaFolder,
} from '@/hooks/api/admin/use-media-library';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/admin/format-file-size';
import { readApiError } from '@/lib/admin/read-api-error';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { MediaFolder } from '@/types/admin';

type FolderCardProps = {
  folder: MediaFolder;
};

export default function FolderCard({ folder }: FolderCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [name, setName] = useState(folder.name);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const renameFolder = useRenameMediaFolder();
  const deleteFolder = useDeleteMediaFolder();
  const { setNodeRef, isOver } = useFolderDroppable(folder.id);

  const fileLabel = `${folder.file_count} file${folder.file_count === 1 ? '' : 's'}`;

  function handleRename() {
    const value = name.trim();

    if (!value || value === folder.name) {
      setIsRenaming(false);

      return;
    }

    renameFolder.mutate(
      { id: folder.id, name: value },
      { onSuccess: () => setIsRenaming(false) },
    );
  }

  if (isRenaming) {
    return (
      <div className="flex min-w-0 flex-col gap-2 rounded-[8px] border border-black/5 bg-white p-3">
        <Input
          autoFocus
          variant="default"
          size="small"
          value={name}
          onChange={(event) => setName(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              handleRename();
            }

            if (event.key === 'Escape') {
              setName(folder.name);
              setIsRenaming(false);
            }
          }}
        />
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="primary"
            size="small"
            disabled={renameFolder.isPending}
            onClick={handleRename}
          >
            {renameFolder.isPending ? 'Saving…' : 'Save'}
          </Button>
          <Button
            type="button"
            variant="secondary"
            size="small"
            onClick={() => {
              setName(folder.name);
              setIsRenaming(false);
            }}
          >
            Cancel
          </Button>
        </div>
        {renameFolder.isError && (
          <p className="text-[12px] text-red-600">
            {readApiError(renameFolder.error, 'Could not rename the folder.')}
          </p>
        )}
      </div>
    );
  }

  return (
    <>
      <div
        ref={setNodeRef}
        className={cn(
          'relative flex min-w-0 items-center gap-3 rounded-[8px] border border-black/5 bg-white p-3 transition-colors hover:bg-slate-50',
          isOver && 'border-blue-500 bg-blue-50',
        )}
      >
        <Link
          href={`${ADMIN_ROUTE.ASSETS}/folders/${folder.id}`}
          className="flex min-w-0 flex-1 items-center gap-3"
        >
          <div className="flex shrink-0 items-center justify-center rounded-[6px] bg-slate-100 p-2.5">
            <icon.images className="size-5 text-slate-950" />
          </div>
          <div className="flex min-w-0 flex-col gap-0.5">
            <p className="truncate text-[14px] font-medium text-neutral-900">
              {folder.name}
            </p>
            <p className="truncate text-[12px] text-neutral-700/68">
              {fileLabel} · {formatFileSize(folder.total_size)}
            </p>
          </div>
        </Link>

        <ActionMenu
          label={`Actions for ${folder.name}`}
          className="shrink-0"
          items={[
            {
              label: 'Rename',
              iconKey: 'edit',
              onSelect: () => setIsRenaming(true),
            },
            {
              label: 'Delete',
              iconKey: 'trash',
              onSelect: () => setIsDeleteOpen(true),
              isDestructive: true,
            },
          ]}
        />
      </div>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deleteFolder.reset();
        }}
        onConfirm={() =>
          deleteFolder.mutate(folder.id, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete this folder?"
        description={
          <>
            <span className="font-medium text-neutral-900">{folder.name}</span>
            {folder.file_count > 0
              ? ` holds ${fileLabel}. Deleting the folder cannot be undone.`
              : ' will be permanently removed. This cannot be undone.'}
          </>
        }
        isPending={deleteFolder.isPending}
        error={
          deleteFolder.isError
            ? readApiError(deleteFolder.error, 'Could not delete this folder.')
            : undefined
        }
      />
    </>
  );
}
