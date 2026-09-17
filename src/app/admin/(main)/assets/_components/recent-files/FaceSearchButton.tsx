'use client';

import { useRef } from 'react';

import { icon } from '@/components/admin/icons';

import { useFaceSearch } from '@/hooks/api/admin/use-media-library';

import { cn } from '@/lib/utils';

import type { Media } from '@/types/admin';

type FaceSearchButtonProps = {
  onResults: (results: Media[] | null) => void;
  isActive: boolean;
};

/** Finds media containing a similar face to the uploaded photo. */
export default function FaceSearchButton({
  onResults,
  isActive,
}: FaceSearchButtonProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const faceSearch = useFaceSearch();

  return (
    <>
      <button
        type="button"
        disabled={faceSearch.isPending}
        title={isActive ? 'Clear face search' : 'Search by face'}
        aria-label={isActive ? 'Clear face search' : 'Search by face'}
        onClick={() => {
          if (isActive) {
            onResults(null);
            faceSearch.reset();

            return;
          }

          inputRef.current?.click();
        }}
        className={cn(
          'flex size-9 shrink-0 cursor-pointer items-center justify-center rounded-[8px] border border-black/10 text-slate-500 transition-colors hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60',
          isActive && 'border-blue-500 bg-blue-50 text-blue-600',
        )}
      >
        {faceSearch.isPending ? (
          <span className="size-3.5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
        ) : (
          <icon.search className="size-4" />
        )}
      </button>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/webp"
        hidden
        onChange={(event) => {
          const file = event.target.files?.[0];

          if (file) {
            faceSearch.mutate({ image: file }, { onSuccess: onResults });
          }

          event.target.value = '';
        }}
      />
    </>
  );
}
