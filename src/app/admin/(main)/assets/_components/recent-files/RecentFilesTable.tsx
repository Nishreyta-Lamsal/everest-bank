'use client';

import MediaThumbnail from '../MediaThumbnail';
import MediaActions from '../MediaActions';
import { useMediaDraggable } from '../dnd/media-dnd';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/admin/format-file-size';
import { formatRelativeTime } from '@/lib/admin/format-relative-time';

import type { Media } from '@/types/admin';

type MediaTableRowProps = {
  media: Media;
  onSelect: (media: Media) => void;
};

function MediaTableRow({ media, onSelect }: MediaTableRowProps) {
  const { attributes, listeners, setNodeRef, isDragging } =
    useMediaDraggable(media);

  return (
    <tr
      ref={setNodeRef}
      onClick={() => onSelect(media)}
      className={cn(
        'cursor-grab border-b border-black/3 transition-colors hover:bg-slate-50 active:cursor-grabbing',
        isDragging && 'opacity-40',
      )}
      {...listeners}
      {...attributes}
    >
      <td className="px-4 py-2">
        <div className="flex min-w-0 items-center gap-2">
          <MediaThumbnail
            mediaType={media.media_type}
            src={media.thumbnail_url ?? media.file_url}
            alt={media.alt_text}
            className="size-[38px]"
          />
          <p className="truncate text-[13px] font-medium text-neutral-900">
            {media.title || 'Untitled'}
          </p>
        </div>
      </td>
      <td className="px-4 py-2 text-[13px] text-neutral-700">
        {media.folder?.name ?? '—'}
      </td>
      <td className="px-4 py-2 text-[13px] text-neutral-700 capitalize">
        {media.media_type}
      </td>
      <td className="px-4 py-2 text-[13px] text-neutral-700">
        {formatFileSize(media.file_size ?? 0)}
      </td>
      <td className="px-4 py-2 text-[13px] text-neutral-700/68">
        {formatRelativeTime(media.updated_at)}
      </td>
      <td className="px-4 py-2">
        <MediaActions media={media} onViewDetails={() => onSelect(media)} />
      </td>
    </tr>
  );
}

type RecentFilesTableProps = {
  items: Media[];
  onSelect: (media: Media) => void;
};

export default function RecentFilesTable({
  items,
  onSelect,
}: RecentFilesTableProps) {
  return (
    <div className="w-full overflow-x-auto">
      <table className="w-full min-w-[640px] border-collapse">
        <thead>
          <tr className="border-y border-black/5 text-left">
            {['Name', 'Folder', 'Type', 'Size', 'Updated'].map((heading) => (
              <th
                key={heading}
                className="px-4 py-2 text-[12px] font-medium text-neutral-700/68"
              >
                {heading}
              </th>
            ))}
            <th className="w-[56px] px-4 py-2" />
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <MediaTableRow key={item.id} media={item} onSelect={onSelect} />
          ))}
        </tbody>
      </table>
    </div>
  );
}
