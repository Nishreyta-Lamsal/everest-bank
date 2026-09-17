'use client';

import { useEffect, useRef, useState } from 'react';

import MediaThumbnail from '../MediaThumbnail';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { useMediaAutocomplete } from '@/hooks/api/admin/use-media-library';

import { useDebounce } from '@/hooks/useDebounce';

type MediaSearchInputProps = {
  value: string;
  onChange: (value: string) => void;
  folderId?: number;
};

export default function MediaSearchInput({
  value,
  onChange,
  folderId,
}: MediaSearchInputProps) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedValue = useDebounce(value, 250);

  const { data: suggestions } = useMediaAutocomplete(
    { q: debouncedValue, ...(folderId ? { folder_id: folderId } : {}) },
    isOpen,
  );

  useEffect(
    function () {
      if (!isOpen) return;

      function handlePointerDown(event: MouseEvent) {
        if (!containerRef.current?.contains(event.target as Node)) {
          setIsOpen(false);
        }
      }

      document.addEventListener('mousedown', handlePointerDown);

      return function () {
        document.removeEventListener('mousedown', handlePointerDown);
      };
    },
    [isOpen],
  );

  const items = suggestions ?? [];

  return (
    <div ref={containerRef} className="relative w-[220px]">
      <Input
        variant="default"
        size="medium"
        placeholder="Search media"
        leftIcon={<icon.search className="size-4 shrink-0 text-slate-400" />}
        value={value}
        onFocus={() => setIsOpen(true)}
        onChange={(event) => {
          onChange(event.target.value);
          setIsOpen(true);
        }}
        onKeyDown={(event) => {
          if (event.key === 'Escape') setIsOpen(false);
        }}
      />

      {isOpen && items.length > 0 && (
        <div className="absolute top-full right-0 left-0 z-20 mt-1 flex max-h-[280px] flex-col overflow-y-auto rounded-[8px] border border-black/5 bg-white py-1 shadow-lg">
          {items.map((suggestion, index) => (
            <button
              key={`${suggestion.text}-${index}`}
              type="button"
              onClick={() => {
                onChange(suggestion.text);
                setIsOpen(false);
              }}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-slate-50"
            >
              {suggestion.media_type && (
                <MediaThumbnail
                  mediaType={suggestion.media_type}
                  src={suggestion.thumbnail_url}
                  className="size-6"
                />
              )}
              <span className="min-w-0 truncate text-[13px] text-neutral-900">
                {suggestion.text}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
