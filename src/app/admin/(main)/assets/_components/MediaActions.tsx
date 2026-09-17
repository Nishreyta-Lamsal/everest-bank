'use client';

import { useState } from 'react';

import ActionMenu from './ActionMenu';
import MoveToFolderDialog from './MoveToFolderDialog';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';

import { useDeleteMedia } from '@/hooks/api/admin/use-media-library';

import { readApiError } from '@/lib/admin/read-api-error';

import type { Media } from '@/types/admin';

type MediaActionsProps = {
  media: Media;
  onViewDetails: () => void;
  className?: string;
};

export default function MediaActions({
  media,
  onViewDetails,
  className,
}: MediaActionsProps) {
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteMedia = useDeleteMedia();

  function handleDownload() {
    window.open(media.file_url, '_blank', 'noopener,noreferrer');
  }

  return (
    <>
      <ActionMenu
        label={`Actions for ${media.title || 'this file'}`}
        className={className}
        items={[
          {
            label: 'View details',
            iconKey: 'eye',
            onSelect: onViewDetails,
          },
          {
            label: 'Download',
            iconKey: 'openLink',
            onSelect: handleDownload,
          },
          {
            label: 'Move to folder',
            iconKey: 'images',
            onSelect: () => setIsMoveOpen(true),
          },
          {
            label: 'Delete',
            iconKey: 'trash',
            onSelect: () => setIsDeleteOpen(true),
            isDestructive: true,
          },
        ]}
      />

      {isMoveOpen && (
        <MoveToFolderDialog
          mediaId={media.id}
          currentFolderId={media.folder?.id ?? null}
          isOpen={isMoveOpen}
          onClose={() => setIsMoveOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deleteMedia.reset();
        }}
        onConfirm={() =>
          deleteMedia.mutate(media.id, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete this media?"
        description={
          <>
            <span className="font-medium text-neutral-900">
              {media.title || 'This file'}
            </span>
            {' will be permanently removed. Pages using it will lose the file.'}
          </>
        }
        isPending={deleteMedia.isPending}
        error={
          deleteMedia.isError
            ? readApiError(deleteMedia.error, 'Could not delete this media.')
            : undefined
        }
      />
    </>
  );
}
