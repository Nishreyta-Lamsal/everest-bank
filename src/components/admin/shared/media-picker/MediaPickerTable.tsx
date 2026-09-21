import MediaTypeThumbnail from '../MediaTypeThumbnail';

import { cn } from '@/lib/utils';
import { formatFileSize } from '@/lib/admin/format-file-size';

import type { Media } from '@/types/admin';

type MediaPickerTableProps = {
  items: Media[];
  selectedId?: number;
  onSelect: (media: Media) => void;
};

const COLUMNS = ['Title', 'Folder', 'File ID', 'File size'];

export default function MediaPickerTable({
  items,
  selectedId,
  onSelect,
}: MediaPickerTableProps) {
  return (
    <div className="overflow-hidden rounded-[10px] border border-black/8">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b border-black/8">
            {COLUMNS.map((column, index) => (
              <th
                key={column}
                scope="col"
                className={cn(
                  'px-4 py-3 text-[13px] font-medium text-neutral-700/68',
                  index === 0 ? 'text-left' : 'text-right whitespace-nowrap',
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {items.map((media) => {
            const isSelected = media.id === selectedId;

            return (
              <tr
                key={media.id}
                onClick={() => onSelect(media)}
                aria-selected={isSelected}
                className={cn(
                  'cursor-pointer border-b border-black/5 transition-colors last:border-b-0',
                  isSelected ? 'bg-blue-50' : 'hover:bg-slate-50',
                )}
              >
                <td className="px-4 py-2.5">
                  <div className="flex min-w-0 items-center gap-3">
                    <MediaTypeThumbnail
                      mediaType={media.media_type}
                      src={media.thumbnail_url ?? media.file_url}
                      alt={media.alt_text}
                      sizes="40px"
                      className="size-[34px] rounded-[6px]"
                    />
                    <span className="truncate text-[13px] text-neutral-900">
                      {media.title || 'Untitled'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-2.5 text-right text-[13px] text-neutral-700/68">
                  {media.folder?.name ?? '—'}
                </td>
                <td className="px-4 py-2.5 text-right text-[13px] whitespace-nowrap text-neutral-700/68">
                  #{media.id}
                </td>
                <td className="px-4 py-2.5 text-right text-[13px] whitespace-nowrap text-neutral-700/68">
                  {formatFileSize(media.file_size ?? 0)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
