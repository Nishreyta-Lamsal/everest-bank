'use client';

import { useMemo, useRef, useState } from 'react';

import MediaThumbnail from './MediaThumbnail';
import { ACCEPTED_FILE_TYPES } from './AddMediaFileField';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Textarea } from '@/components/admin/ui/textarea';

import {
  useDeleteMedia,
  useMediaFolders,
  useUpdateMedia,
} from '@/hooks/api/admin/use-media-library';

import { formatFileSize } from '@/lib/admin/format-file-size';
import { readApiError } from '@/lib/admin/read-api-error';

import type { Media } from '@/types/admin';

type MediaDetailsDrawerProps = {
  media: Media;
  isOpen: boolean;
  onClose: () => void;
};

export default function MediaDetailsDrawer({
  media,
  isOpen,
  onClose,
}: MediaDetailsDrawerProps) {
  const [title, setTitle] = useState(media.title ?? '');
  const [altText, setAltText] = useState(media.alt_text ?? '');
  const [caption, setCaption] = useState(media.caption ?? '');
  const [credit, setCredit] = useState(media.credit ?? '');
  const [folderId, setFolderId] = useState(
    media.folder ? String(media.folder.id) : '',
  );
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  // A pending replacement, shown in place of the stored file until saved.
  const [replacement, setReplacement] = useState<File | null>(null);
  const replaceInputRef = useRef<HTMLInputElement>(null);

  const replacementPreview = useMemo(
    () =>
      replacement?.type.startsWith('image/')
        ? URL.createObjectURL(replacement)
        : null,
    [replacement],
  );

  const { data: foldersData } = useMediaFolders();
  const updateMedia = useUpdateMedia(media.id);
  const deleteMedia = useDeleteMedia();

  const folderOptions = [
    { label: 'No folder', value: '' },
    ...(foldersData?.results ?? []).map((folder) => ({
      label: folder.name,
      value: String(folder.id),
    })),
  ];

  function handleSave() {
    updateMedia.mutate(
      {
        title,
        alt_text: altText,
        caption,
        credit,
        folder: folderId ? Number(folderId) : null,
        ...(replacement ? { file: replacement } : {}),
      },
      { onSuccess: onClose },
    );
  }

  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        title="Media details"
        description={media.mime_type}
        footer={
          <>
            <Button
              type="button"
              variant="destructiveGhost"
              onClick={() => setIsDeleteOpen(true)}
              disabled={updateMedia.isPending}
            >
              Delete
            </Button>
            <div className="flex-1" />
            <Button
              type="button"
              variant="secondary"
              onClick={onClose}
              disabled={updateMedia.isPending}
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleSave}
              disabled={updateMedia.isPending}
            >
              {updateMedia.isPending ? 'Saving…' : 'Save changes'}
            </Button>
          </>
        }
      >
        <div className="relative w-full">
          <MediaThumbnail
            mediaType={media.media_type}
            src={replacementPreview ?? media.file_url}
            alt={media.alt_text}
            className="h-[220px] w-full"
          />

          <button
            type="button"
            disabled={updateMedia.isPending}
            onClick={() => replaceInputRef.current?.click()}
            className="absolute bottom-2 left-2 cursor-pointer rounded-[6px] bg-blue-500 px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] disabled:pointer-events-none disabled:opacity-50"
          >
            {media.media_type === 'image' ? 'Replace image' : 'Replace file'}
          </button>

          <input
            ref={replaceInputRef}
            type="file"
            accept={ACCEPTED_FILE_TYPES}
            hidden
            onChange={(event) => {
              setReplacement(event.target.files?.[0] ?? null);
              event.target.value = '';
            }}
          />
        </div>

        {replacement && (
          <div className="flex items-center justify-between gap-2 rounded-[6px] bg-blue-50 px-3 py-2">
            <p className="min-w-0 truncate text-[12px] text-blue-900">
              Replacing with {replacement.name}
            </p>
            <button
              type="button"
              onClick={() => setReplacement(null)}
              className="shrink-0 cursor-pointer text-[12px] font-medium text-blue-700 underline"
            >
              Undo
            </button>
          </div>
        )}

        <p className="text-[12px] text-neutral-700/68">
          {formatFileSize(media.file_size ?? 0)}
          {media.width && media.height
            ? ` · ${media.width}×${media.height}`
            : ''}
        </p>

        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Alt text">
          <Textarea
            variant="filled"
            size="medium"
            value={altText}
            onChange={(event) => setAltText(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Caption">
          <Textarea
            variant="filled"
            size="medium"
            value={caption}
            onChange={(event) => setCaption(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Credit">
          <Input
            variant="filled"
            size="medium"
            value={credit}
            onChange={(event) => setCredit(event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Folder">
          <Select
            variant="default"
            size="medium"
            options={folderOptions}
            value={folderId}
            onValueChange={setFolderId}
          />
        </FieldLabel>

        {updateMedia.isError && (
          <p className="text-[12px] text-red-600">
            {readApiError(updateMedia.error, 'Could not save changes.')}
          </p>
        )}
      </Drawer>

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deleteMedia.reset();
        }}
        onConfirm={() =>
          deleteMedia.mutate(media.id, {
            onSuccess: () => {
              setIsDeleteOpen(false);
              onClose();
            },
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
