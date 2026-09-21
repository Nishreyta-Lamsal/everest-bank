'use client';

import MediaSearchInput from './MediaSearchInput';
import FaceSearchButton from './FaceSearchButton';
import { Select } from '@/components/admin/ui/select';
import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { Media, MediaFolder } from '@/types/admin';

export type ViewMode = 'grid' | 'table';

/**
 * The media endpoint validates `ordering` against a fixed list and 400s on
 * anything else, so only values confirmed against it belong here.
 */
const SORT_OPTIONS = [
  { label: 'Newest first', value: '-created_at' },
  { label: 'Oldest first', value: 'created_at' },
  { label: 'Title A–Z', value: 'title' },
];

type RecentFilesToolbarProps = {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  search: string;
  onSearchChange: (value: string) => void;
  ordering: string;
  onOrderingChange: (value: string) => void;
  folderId: string;
  onFolderChange: (value: string) => void;
  folders: MediaFolder[];
  onFaceResults: (results: Media[] | null) => void;
  isFaceSearchActive: boolean;
  title?: string;
  /** Hidden inside a folder, where the folder is already fixed. */
  showFolderFilter?: boolean;
};

export default function RecentFilesToolbar({
  viewMode,
  onViewModeChange,
  search,
  onSearchChange,
  ordering,
  onOrderingChange,
  folderId,
  onFolderChange,
  folders,
  onFaceResults,
  isFaceSearchActive,
  title = 'Recent Files',
  showFolderFilter = true,
}: RecentFilesToolbarProps) {
  const folderOptions = [
    { label: 'All folders', value: '' },
    ...folders.map((folder) => ({
      label: folder.name,
      value: String(folder.id),
    })),
  ];

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-4">
      <p className="text-[16px] font-medium text-neutral-900">{title}</p>

      <div className="flex flex-wrap items-center gap-2">
        <MediaSearchInput
          value={search}
          onChange={onSearchChange}
          {...(folderId ? { folderId: Number(folderId) } : {})}
        />

        <FaceSearchButton
          onResults={onFaceResults}
          isActive={isFaceSearchActive}
        />

        {showFolderFilter && (
          <div className="w-[150px]">
            <Select
              variant="default"
              size="medium"
              options={folderOptions}
              value={folderId}
              onValueChange={onFolderChange}
            />
          </div>
        )}

        <div className="w-[160px]">
          <Select
            variant="default"
            size="medium"
            options={SORT_OPTIONS}
            value={ordering}
            onValueChange={onOrderingChange}
          />
        </div>

        <div className="flex shrink-0 items-center gap-1 rounded-[8px] border border-black/10 p-0.5">
          {(['grid', 'table'] as const).map((mode) => {
            const ModeIcon = mode === 'grid' ? icon.grid : icon.pageText;

            return (
              <button
                key={mode}
                type="button"
                onClick={() => onViewModeChange(mode)}
                aria-label={`${mode} view`}
                aria-pressed={viewMode === mode}
                className={cn(
                  'flex size-7 cursor-pointer items-center justify-center rounded-[6px] text-slate-500 transition-colors',
                  viewMode === mode && 'bg-slate-100 text-slate-950',
                )}
              >
                <ModeIcon className="size-4" />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
