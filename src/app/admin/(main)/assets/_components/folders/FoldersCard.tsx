'use client';

import { useState } from 'react';

import FolderList from './FolderList';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import {
  useCreateMediaFolder,
  useMediaFolders,
} from '@/hooks/api/admin/use-media-library';

import { readApiError } from '@/lib/admin/read-api-error';

export default function FoldersCard() {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');

  const { data, isPending, isError } = useMediaFolders();
  const createFolder = useCreateMediaFolder();

  const folders = data?.results ?? [];

  function handleCreate() {
    const value = name.trim();

    if (!value) return;

    createFolder.mutate(value, {
      onSuccess: () => {
        setName('');
        setIsCreating(false);
      },
    });
  }

  return (
    <div className="flex w-full flex-col gap-4 rounded-[8px] border border-white bg-white/90 p-3 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]">
      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-[14px] font-medium text-neutral-900">Folders</p>
          <p className="text-[12px] text-neutral-700/68">
            Group related media together.
          </p>
        </div>
        <Button
          type="button"
          variant="secondary"
          size="small"
          onClick={() => setIsCreating((open) => !open)}
        >
          <icon.plus />
          New
        </Button>
      </div>

      {isCreating && (
        <div className="flex w-full flex-col gap-2">
          <div className="flex w-full items-center gap-2">
            <Input
              autoFocus
              variant="default"
              size="medium"
              placeholder="Folder name"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  handleCreate();
                }

                if (event.key === 'Escape') setIsCreating(false);
              }}
            />
            <Button
              type="button"
              variant="primary"
              size="default"
              className="shrink-0"
              disabled={createFolder.isPending || !name.trim()}
              onClick={handleCreate}
            >
              {createFolder.isPending ? 'Adding…' : 'Add'}
            </Button>
          </div>
          {createFolder.isError && (
            <p className="text-[12px] text-red-600">
              {readApiError(createFolder.error, 'Could not create the folder.')}
            </p>
          )}
        </div>
      )}

      {isPending && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[64px] animate-pulse rounded-[8px] bg-slate-100"
            />
          ))}
        </div>
      )}

      {isError && (
        <p className="py-4 text-center text-[13px] text-neutral-700/68">
          Could not load folders.
        </p>
      )}

      {!isPending && !isError && folders.length === 0 && (
        <p className="py-4 text-center text-[13px] text-neutral-700/68">
          No folders yet.
        </p>
      )}

      {folders.length > 0 && <FolderList folders={folders} />}
    </div>
  );
}
