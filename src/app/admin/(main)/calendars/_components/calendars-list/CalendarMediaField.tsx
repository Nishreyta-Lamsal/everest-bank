'use client';

import Image from 'next/image';
import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import MediaPickerDialog from '@/components/admin/shared/media-picker/MediaPickerDialog';

import { cn } from '@/lib/utils';

import type { Media, NewsMediaBrief } from '@/types/admin';

type CalendarMediaFieldProps = {
  /** The file already attached, when editing an existing calendar. */
  existing: NewsMediaBrief | null;
  /** The asset picked from the library, when one has been chosen. */
  value: Media | null;
  onChange: (media: Media) => void;
  disabled?: boolean;
};

export default function CalendarMediaField({
  existing,
  value,
  onChange,
  disabled,
}: CalendarMediaFieldProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const attachment = value ?? existing;
  const thumbnailUrl =
    value?.media_type === 'image'
      ? (value.thumbnail_url ?? value.file_url)
      : null;

  const picker = (
    <MediaPickerDialog
      isOpen={isPickerOpen}
      onClose={() => setIsPickerOpen(false)}
      onSelect={onChange}
      mediaType="pdf"
      title="Select calendar file"
      selectedId={value?.id}
    />
  );

  if (attachment) {
    return (
      <div className="relative flex h-[88px] w-full shrink-0 items-center gap-3 overflow-hidden rounded-[8px] border border-black/5 bg-slate-50 px-4">
        {thumbnailUrl ? (
          <div className="relative size-[56px] shrink-0 overflow-hidden rounded-[6px]">
            <Image
              src={thumbnailUrl}
              alt=""
              fill
              unoptimized
              className="object-cover"
            />
          </div>
        ) : (
          <div className="flex size-[56px] shrink-0 items-center justify-center rounded-[6px] bg-slate-100">
            <icon.fileText className="size-6 text-slate-500" />
          </div>
        )}
        <p className="min-w-0 flex-1 truncate text-[13px] font-medium text-slate-600">
          {attachment.title || 'Attached file'}
        </p>
        <button
          type="button"
          disabled={disabled}
          onClick={() => setIsPickerOpen(true)}
          className="shrink-0 cursor-pointer rounded-[6px] bg-blue-500 px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] disabled:pointer-events-none disabled:opacity-50"
        >
          Replace
        </button>

        {picker}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => setIsPickerOpen(true)}
        className={cn(
          'flex h-[88px] w-full shrink-0 cursor-pointer items-center justify-center gap-3 rounded-[8px] border border-dashed border-[#cfd9e8] bg-black/3 px-4',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <icon.fileText className="size-5 text-slate-500" />
        <p className="text-[13px] font-medium text-slate-500">
          Click to choose the calendar PDF or image
        </p>
      </button>

      {picker}
    </>
  );
}
