'use client';

import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

export const ACCEPTED_FILE_TYPES =
  'image/*,video/*,audio/*,application/pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.txt,.csv';

type AddMediaFileFieldProps = {
  value: File | null;
  onChange: (file: File | null) => void;
  disabled?: boolean;
};

export default function AddMediaFileField({
  value,
  onChange,
  disabled,
}: AddMediaFileFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const isImage = value?.type.startsWith('image/') ?? false;
  const previewUrl = useMemo(
    () => (isImage && value ? URL.createObjectURL(value) : null),
    [isImage, value],
  );

  useEffect(
    function () {
      return function () {
        if (previewUrl) URL.revokeObjectURL(previewUrl);
      };
    },
    [previewUrl],
  );

  const fileInput = (
    <input
      ref={inputRef}
      type="file"
      accept={ACCEPTED_FILE_TYPES}
      hidden
      disabled={disabled}
      onChange={(event) => {
        onChange(event.target.files?.[0] ?? null);
        event.target.value = '';
      }}
    />
  );

  if (value) {
    return (
      <div className="relative h-[240px] w-full shrink-0 overflow-hidden rounded-[8px] border border-black/5 bg-slate-50">
        {previewUrl ? (
          <Image
            src={previewUrl}
            alt=""
            fill
            unoptimized
            className="object-cover"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-2">
            <icon.fileText className="size-8 text-slate-500" />
            <p className="max-w-3/4 truncate text-[13px] font-medium text-slate-600">
              {value.name}
            </p>
          </div>
        )}

        <button
          type="button"
          disabled={disabled}
          onClick={() => inputRef.current?.click()}
          className="absolute bottom-2 left-2 cursor-pointer rounded-[6px] bg-blue-500 px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)] disabled:pointer-events-none disabled:opacity-50"
        >
          {isImage ? 'Replace image' : 'Replace file'}
        </button>

        {fileInput}
      </div>
    );
  }

  return (
    <>
      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          onChange(event.dataTransfer.files?.[0] ?? null);
        }}
        className={cn(
          'flex h-[240px] w-full shrink-0 cursor-pointer flex-col items-center justify-center gap-4 rounded-[8px] border border-dashed border-[#cfd9e8] bg-black/3 p-4 transition-colors',
          isDragging && 'border-blue-500 bg-blue-50',
          disabled && 'pointer-events-none opacity-50',
        )}
      >
        <div className="flex flex-col items-center gap-2">
          <icon.image className="size-6 text-slate-500" />
          <p className="text-[13px] font-medium text-slate-500">
            Click to upload or drag and drop
          </p>
          <p className="text-[12px] font-medium text-slate-400">
            Images, video, audio, PDF or documents
          </p>
        </div>
        <span className="rounded-[6px] bg-blue-500 px-2 py-1 text-[12px] font-medium text-white shadow-[inset_0px_0px_4px_0px_rgba(255,255,255,0.24)]">
          Browse file
        </span>
      </button>

      {fileInput}
    </>
  );
}
