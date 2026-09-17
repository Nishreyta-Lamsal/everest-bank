import MediaThumbnail from '../MediaThumbnail';
import MediaActions from '../MediaActions';
import { useMediaDraggable } from '../dnd/media-dnd';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/admin/format-file-size';

import type { Media } from '@/types/admin';

type MediaGridCardProps = {
  media: Media;
  onSelect: (media: Media) => void;
};

function MediaGridCard({ media, onSelect }: MediaGridCardProps) {
  const { attributes, listeners, setNodeRef, isDragging } =
    useMediaDraggable(media);

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'group relative flex flex-col gap-2 rounded-[8px] border border-black/5 p-2 transition-colors hover:bg-slate-50',
        isDragging && 'opacity-40',
      )}
    >
      <button
        type="button"
        onClick={() => onSelect(media)}
        className="flex cursor-grab flex-col gap-2 text-left active:cursor-grabbing"
        {...listeners}
        {...attributes}
      >
        <MediaThumbnail
          mediaType={media.media_type}
          src={media.thumbnail_url ?? media.file_url}
          alt={media.alt_text}
          className="h-[110px] w-full"
        />
        <div className="flex min-w-0 flex-col gap-0.5">
          <p className="truncate text-[13px] font-medium text-neutral-900">
            {media.title || 'Untitled'}
          </p>
          <p className="truncate text-[12px] text-neutral-700/68">
            {formatFileSize(media.file_size ?? 0)}
          </p>
        </div>
      </button>

      <MediaActions
        media={media}
        onViewDetails={() => onSelect(media)}
        className="absolute top-3 right-3"
      />
    </div>
  );
}

type RecentFilesGridProps = {
  items: Media[];
  onSelect: (media: Media) => void;
};

export default function RecentFilesGrid({
  items,
  onSelect,
}: RecentFilesGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3 px-4 pb-4 sm:grid-cols-3 lg:grid-cols-4">
      {items.map((item) => (
        <MediaGridCard key={item.id} media={item} onSelect={onSelect} />
      ))}
    </div>
  );
}
