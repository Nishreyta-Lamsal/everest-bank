'use client';

import Link from 'next/link';
import { useState } from 'react';

import AddMediaDrawer from '../../../_components/AddMediaDrawer';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

import { formatFileSize } from '@/lib/admin/format-file-size';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { MediaFolder } from '@/types/admin';

type FolderDetailsHeaderProps = {
  folder: MediaFolder;
  lastUploadAt?: string;
};

export default function FolderDetailsHeader({
  folder,
  lastUploadAt,
}: FolderDetailsHeaderProps) {
  const [isAddOpen, setIsAddOpen] = useState(false);

  const fileLabel = `${folder.file_count} file${folder.file_count === 1 ? '' : 's'}`;

  return (
    <>
      <div className="flex w-full flex-col items-start gap-4">
        <Link
          href={ADMIN_ROUTE.ASSETS}
          className="flex items-center gap-1.5 text-[13px] font-medium text-neutral-700 transition-colors hover:text-slate-950"
        >
          <icon.arrowLeft className="size-4" />
          Back
        </Link>

        <div className="flex w-full flex-wrap items-end justify-between gap-4">
          <div className="flex min-w-0 items-center gap-3">
            <div className="flex size-12 shrink-0 items-center justify-center rounded-[8px] bg-black/5">
              <icon.images className="size-6 text-slate-950" />
            </div>

            <div className="flex min-w-0 flex-col gap-2">
              <p className="truncate text-[30px] leading-[30px] font-medium text-neutral-900">
                {folder.name}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[12px] font-medium text-neutral-700">
                  {fileLabel}
                </p>
                <span className="size-1 shrink-0 rounded-full bg-black/20" />
                <p className="text-[12px] font-medium text-neutral-700">
                  {formatFileSize(folder.total_size)}
                </p>
                <span className="size-1 shrink-0 rounded-full bg-black/20" />
                <p className="text-[12px] font-medium text-neutral-700">
                  {lastUploadAt
                    ? `Last upload ${formatRelativeTime(lastUploadAt)}`
                    : 'No uploads yet'}
                </p>
              </div>
            </div>
          </div>

          <Button
            type="button"
            variant="primary"
            onClick={() => setIsAddOpen(true)}
          >
            <icon.plus />
            Add new media
          </Button>
        </div>
      </div>

      {isAddOpen && (
        <AddMediaDrawer
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
          defaultFolderId={folder.id}
        />
      )}
    </>
  );
}
