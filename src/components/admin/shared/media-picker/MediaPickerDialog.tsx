'use client';

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { Button } from '@/components/admin/ui/button';
import { Select } from '@/components/admin/ui/select';
import { icon } from '@/components/admin/icons';
import MediaTypeThumbnail from '../MediaTypeThumbnail';
import MediaPickerGrid from './MediaPickerGrid';
import MediaPickerTable from './MediaPickerTable';

import {
  useMediaFolders,
  useMediaList,
  useMediaNormalSearch,
} from '@/hooks/api/admin/use-media-library';
import { useUploadMedia } from '@/hooks/api/admin/use-media';
import { cn } from '@/lib/utils';
import { readApiError } from '@/lib/admin/read-api-error';
import { formatFileSize } from '@/lib/admin/format-file-size';

import type { Media, MediaType } from '@/types/admin';

/** What each field's `mediaType` will accept in the OS upload dialog. */
const UPLOAD_ACCEPT: Record<MediaType, string> = {
  image: 'image/png,image/jpeg,image/webp',
  video: 'video/*',
  pdf: 'application/pdf',
  audio: 'audio/*',
  document: 'application/pdf,.doc,.docx,.xls,.xlsx',
};

/**
 * The media endpoint validates `ordering` against a fixed list and 400s on
 * anything else, so only values confirmed against it belong here.
 */
const SORT_OPTIONS = [
  { label: 'Newest first', value: '-created_at' },
  { label: 'Oldest first', value: 'created_at' },
  { label: 'Title A–Z', value: 'title' },
];

type ViewMode = 'grid' | 'table';

/** The dimensions, size and upload date line under a selected asset. */
function describeMedia(media: Media) {
  const parts: string[] = [];

  if (media.width && media.height) {
    parts.push(`${media.width} × ${media.height}`);
  }

  parts.push(formatFileSize(media.file_size ?? 0));

  const uploadedAt = new Date(media.created_at);

  if (!Number.isNaN(uploadedAt.getTime())) {
    parts.push(
      `Uploaded ${uploadedAt.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      })}`,
    );
  }

  return parts.join(' · ');
}

type MediaPickerDialogProps = {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (media: Media) => void;
  /** Limits the library to what this field can actually use. */
  mediaType?: MediaType;
  title?: string;
  selectedId?: number;
};

/**
 * Closed means unmounted, so each opening starts on a clean search and
 * selection without an effect resetting the fields.
 */
export default function MediaPickerDialog({
  isOpen,
  ...props
}: MediaPickerDialogProps) {
  if (!isOpen) return null;

  return <MediaPickerPanel {...props} />;
}

type MediaPickerPanelProps = Omit<MediaPickerDialogProps, 'isOpen'>;

function MediaPickerPanel({
  onClose,
  onSelect,
  mediaType = 'image',
  title = 'Select media',
  selectedId,
}: MediaPickerPanelProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<Element | null>(null);
  const uploadInputRef = useRef<HTMLInputElement>(null);

  const [search, setSearch] = useState('');
  const [folderId, setFolderId] = useState<number | undefined>(undefined);
  const [ordering, setOrdering] = useState(SORT_OPTIONS[0].value);
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [picked, setPicked] = useState<Media | undefined>(undefined);

  // Drives the open transition; the panel mounts in its "from" state and
  // flips on the first frame after paint.
  const [isEntering, setIsEntering] = useState(false);

  const uploadMedia = useUploadMedia();
  const { data: folderData } = useMediaFolders();

  const query = search.trim();
  const isSearching = query.length > 0;

  const listQuery = useMediaList(
    { media_type: mediaType, folder: folderId, ordering, page_size: 24 },
    !isSearching,
  );
  const searchQuery = useMediaNormalSearch({
    q: query,
    media_type: mediaType,
    folder: folderId,
    ordering,
    page_size: 24,
  });

  const activeQuery = isSearching ? searchQuery : listQuery;
  const items = activeQuery.data?.results ?? [];
  const folders = folderData?.results ?? [];
  const activeId = picked?.id ?? selectedId;

  useEffect(
    function () {
      triggerRef.current = document.activeElement;
      panelRef.current?.focus();

      const frame = requestAnimationFrame(() => setIsEntering(true));

      function handleKeyDown(event: KeyboardEvent) {
        if (event.key === 'Escape') onClose();
      }

      document.addEventListener('keydown', handleKeyDown);

      return function () {
        cancelAnimationFrame(frame);
        document.removeEventListener('keydown', handleKeyDown);

        if (triggerRef.current instanceof HTMLElement) {
          triggerRef.current.focus();
        }
      };
    },
    [onClose],
  );

  function handleUpload(file: File) {
    uploadMedia.mutate(
      // Uploading from inside a folder files it there, rather than dropping
      // it loose at the top of the library.
      { file, ...(folderId !== undefined ? { folder: folderId } : {}) },
      {
        // A fresh upload is almost always the one they want, so it is
        // selected straight away and only needs confirming.
        onSuccess: (media) => setPicked(media),
      },
    );
  }

  function handleConfirm() {
    if (!picked) return;

    onSelect(picked);
    onClose();
  }

  return createPortal(
    <div
      className={cn(
        'fixed inset-0 z-100 flex items-center justify-center bg-black/40 p-4 transition-opacity duration-200',
        isEntering ? 'opacity-100' : 'opacity-0',
      )}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        tabIndex={-1}
        className={cn(
          // A fixed height, so the dialog never resizes as results load or
          // the folder changes.
          'flex h-[85vh] max-h-[720px] w-full max-w-[1100px] flex-col overflow-hidden rounded-[16px] bg-white shadow-xl transition-all duration-200 outline-none',
          isEntering ? 'translate-y-0 scale-100' : 'translate-y-2 scale-[0.98]',
        )}
      >
        <div className="flex items-center gap-3 px-6 pt-5 pb-4">
          <h2 className="text-[20px] font-semibold text-neutral-900">
            {title}
          </h2>

          <div className="relative ml-auto w-full max-w-[340px]">
            <icon.search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search media"
              aria-label="Search media"
              className="w-full rounded-full border border-[#e6ecf4] py-2.5 pr-4 pl-9 text-[14px] outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-[150px] shrink-0">
            <Select
              variant="default"
              size="medium"
              options={SORT_OPTIONS}
              value={ordering}
              onValueChange={setOrdering}
            />
          </div>

          <div className="flex shrink-0 items-center gap-1 rounded-full border border-black/10 p-1">
            {(['table', 'grid'] as const).map((mode) => {
              const ModeIcon = mode === 'grid' ? icon.grid : icon.pageText;

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => setViewMode(mode)}
                  aria-label={`${mode} view`}
                  aria-pressed={viewMode === mode}
                  className={cn(
                    'flex size-8 cursor-pointer items-center justify-center rounded-full text-slate-500 transition-colors',
                    viewMode === mode && 'bg-slate-100 text-slate-950',
                  )}
                >
                  <ModeIcon className="size-4" />
                </button>
              );
            })}
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-slate-500 hover:bg-slate-100"
          >
            <icon.close className="size-4" />
          </button>
        </div>

        <div className="flex min-h-0 flex-1 border-t border-black/5">
          <aside className="w-[220px] shrink-0 overflow-y-auto border-r border-black/5 p-4">
            <p className="px-2 pb-2 text-[12px] text-neutral-700/68">Library</p>
            <button
              type="button"
              onClick={() => {
                setFolderId(undefined);
                setOrdering('-created_at');
              }}
              className={cn(
                'flex w-full cursor-pointer items-center gap-2 rounded-[8px] px-2 py-2 text-left text-[13px] transition-colors',
                folderId === undefined
                  ? 'bg-slate-100 text-neutral-900'
                  : 'text-neutral-900 hover:bg-slate-50',
              )}
            >
              <icon.bell className="size-3.5 shrink-0 text-slate-500" />
              Recently Used
            </button>

            <p className="px-2 pt-4 pb-2 text-[12px] text-neutral-700/68">
              Folders
            </p>
            <ul className="flex flex-col gap-0.5">
              {folders.map((folder) => (
                <li key={folder.id}>
                  <button
                    type="button"
                    onClick={() => setFolderId(folder.id)}
                    className={cn(
                      'flex w-full cursor-pointer items-center gap-2 rounded-[8px] px-2 py-2 text-left text-[13px] transition-colors',
                      folderId === folder.id
                        ? 'bg-slate-100 text-neutral-900'
                        : 'text-neutral-900 hover:bg-slate-50',
                    )}
                  >
                    <icon.image className="size-3.5 shrink-0 text-amber-500" />
                    <span className="min-w-0 flex-1 truncate">
                      {folder.name}
                    </span>
                    <span className="shrink-0 rounded-full bg-slate-100 px-1.5 py-0.5 text-[11px] text-neutral-700/68">
                      {folder.file_count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </aside>

          <div className="min-h-0 flex-1 overflow-y-auto p-4">
            {activeQuery.isPending ? (
              <p className="text-[14px] text-neutral-700">Loading media…</p>
            ) : activeQuery.isError ? (
              <p className="text-[14px] text-red-600">
                {readApiError(
                  activeQuery.error,
                  'Could not load the media library. Please try again.',
                )}
              </p>
            ) : items.length === 0 ? (
              <p className="text-[14px] text-neutral-700">
                {isSearching
                  ? `No media matches “${query}”.`
                  : 'This folder has no media yet.'}
              </p>
            ) : viewMode === 'grid' ? (
              <MediaPickerGrid
                items={items}
                selectedId={activeId}
                onSelect={setPicked}
              />
            ) : (
              <MediaPickerTable
                items={items}
                selectedId={activeId}
                onSelect={setPicked}
              />
            )}
          </div>
        </div>

        {picked && (
          <div className="flex items-center gap-3 border-t border-black/5 px-6 py-3">
            <MediaTypeThumbnail
              mediaType={picked.media_type}
              src={picked.thumbnail_url ?? picked.file_url}
              alt={picked.alt_text}
              sizes="48px"
              className="size-[44px] rounded-[8px]"
            />
            <div className="flex min-w-0 flex-col">
              <p className="truncate text-[13px] font-medium text-neutral-900">
                {picked.title || 'Untitled'}
              </p>
              <p className="truncate text-[12px] text-neutral-700/68">
                {describeMedia(picked)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => setPicked(undefined)}
              aria-label="Clear selection"
              className="ml-auto flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-[8px] bg-slate-100 text-slate-500 hover:bg-slate-200"
            >
              <icon.close className="size-3.5" />
            </button>
          </div>
        )}

        <div className="flex items-center gap-3 border-t border-black/5 px-6 py-4">
          <Button
            type="button"
            variant="secondary"
            disabled={uploadMedia.isPending}
            onClick={() => uploadInputRef.current?.click()}
          >
            <icon.image className="size-4" />
            {uploadMedia.isPending ? 'Uploading…' : 'Upload New'}
          </Button>

          {uploadMedia.isError && (
            <p className="text-[12px] text-red-600">
              {readApiError(uploadMedia.error, 'Upload failed.')}
            </p>
          )}

          <div className="ml-auto flex items-center gap-3">
            <Button type="button" variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleConfirm} disabled={!picked}>
              Add {mediaType === 'image' ? 'Image' : 'File'}
            </Button>
          </div>
        </div>

        <input
          ref={uploadInputRef}
          type="file"
          accept={UPLOAD_ACCEPT[mediaType]}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) handleUpload(file);

            event.target.value = '';
          }}
        />
      </div>
    </div>,
    document.body,
  );
}
