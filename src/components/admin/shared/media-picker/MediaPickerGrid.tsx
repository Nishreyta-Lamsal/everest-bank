import MediaTypeThumbnail from '../MediaTypeThumbnail';
import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/admin/format-file-size';

import type { Media } from '@/types/admin';

type MediaPickerGridProps = {
  items: Media[];
  selectedId?: number;
  onSelect: (media: Media) => void;
};

export default function MediaPickerGrid({
  items,
  selectedId,
  onSelect,
}: MediaPickerGridProps) {
  return (
    <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((media) => {
        const isSelected = media.id === selectedId;

        return (
          <li key={media.id}>
            <button
              type="button"
              aria-pressed={isSelected}
              onClick={() => onSelect(media)}
              className={cn(
                'flex w-full cursor-pointer flex-col gap-2 rounded-[12px] border bg-white p-2 text-left transition-colors',
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-1 ring-blue-500'
                  : 'border-black/8 hover:border-black/16',
              )}
            >
              <div className="relative">
                <MediaTypeThumbnail
                  mediaType={media.media_type}
                  src={media.thumbnail_url ?? media.file_url}
                  alt={media.alt_text}
                  className="h-[150px] w-full rounded-[8px]"
                />
                <span className="absolute right-2 bottom-2 rounded-[6px] bg-black/55 px-1.5 py-0.5 text-[11px] font-medium text-white">
                  {formatFileSize(media.file_size ?? 0)}
                </span>
                {isSelected && (
                  <span className="absolute top-2 right-2 flex size-5 items-center justify-center rounded-full bg-blue-500 text-white">
                    <icon.checkmark className="size-3" />
                  </span>
                )}
              </div>
              <p
                className={cn(
                  'truncate px-1 pb-1 text-[13px]',
                  isSelected ? 'text-blue-600' : 'text-neutral-900',
                )}
              >
                {media.title || 'Untitled'}
              </p>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
