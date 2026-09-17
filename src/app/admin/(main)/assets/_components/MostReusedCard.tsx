'use client';

import MediaThumbnail from './MediaThumbnail';

import { useMostReusedMedia } from '@/hooks/api/admin/use-media-library';

export default function MostReusedCard() {
  const { data, isPending, isError } = useMostReusedMedia();

  const items = (data ?? []).slice(0, 4);

  return (
    <div className="flex w-full flex-col gap-6 rounded-[8px] border border-white bg-white/90 p-3 shadow-[0px_1px_2px_0px_rgba(15,23,42,0.04)]">
      <div className="flex flex-col gap-0.5">
        <p className="text-[14px] font-medium text-neutral-900">
          Most Reused Assets
        </p>
        <p className="text-[12px] text-neutral-700/68">
          Embedded across most pages · 30d
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {isPending &&
          Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="h-[38px] w-full animate-pulse rounded-[6px] bg-slate-100"
            />
          ))}

        {isError && (
          <p className="py-2 text-center text-[13px] text-neutral-700/68">
            Could not load this list.
          </p>
        )}

        {!isPending && !isError && items.length === 0 && (
          <p className="py-2 text-center text-[13px] text-neutral-700/68">
            No reused assets in the last 30 days.
          </p>
        )}

        {items.map((item, index) => (
          <div key={item.id} className="flex w-full items-center gap-2 py-1">
            <p className="w-4 shrink-0 text-center text-[13px] font-medium text-slate-400">
              {index + 1}
            </p>

            <MediaThumbnail
              mediaType={item.media_type}
              src={item.thumbnail_url ?? item.file_url}
              alt={item.alt_text}
              className="size-[38px]"
            />

            <div className="flex min-w-0 flex-1 items-center justify-between gap-2">
              <p className="truncate text-[13px] font-medium text-neutral-900">
                {item.title || 'Untitled'}
              </p>
              <p className="shrink-0 text-[12px] text-neutral-700/68">
                {item.folder?.name ?? '—'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
