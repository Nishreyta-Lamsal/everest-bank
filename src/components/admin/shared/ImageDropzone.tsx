'use client';

import { useRef, useState } from 'react';

import ImagePreview from './ImagePreview';
import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

const ACCEPTED_TYPES = 'image/png,image/jpeg,image/webp';

type ImageDropzoneProps = {
  onFileSelected: (file: File) => void;
  onRemove?: () => void;
  isUploading?: boolean;
  error?: string;
  preview?: {
    src: string;
    alt?: string;
  };
  previewSize?: 'small' | 'large';
};

export default function ImageDropzone({
  onFileSelected,
  onRemove,
  isUploading,
  error,
  preview,
  previewSize = 'large',
}: ImageDropzoneProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFiles(files: FileList | null) {
    const file = files?.[0];

    if (file) {
      onFileSelected(file);
    }
  }

  if (preview) {
    return (
      <div className="flex w-full flex-col gap-1">
        <ImagePreview
          src={preview.src}
          alt={preview.alt}
          size={previewSize}
          onReplace={onFileSelected}
          onRemove={onRemove}
          isUploading={isUploading}
        />
        {error && <p className="text-[12px] text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col gap-1">
      <button
        type="button"
        disabled={isUploading}
        onClick={() => inputRef.current?.click()}
        onDragOver={(event) => {
          event.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          handleFiles(event.dataTransfer.files);
        }}
        aria-label="Upload image"
        className={cn(
          'flex w-full cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-dashed border-[#cfd9e8] bg-[rgba(0,0,0,0.03)] px-px py-[17px]',
          isDragging && 'border-blue-500 bg-blue-50',
          isUploading && 'cursor-not-allowed opacity-60',
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-[12px] border border-[#e6ecf4] bg-white">
          <icon.image className="size-4 text-slate-500" />
        </div>
        <div className="flex flex-col items-start gap-0.5 text-left">
          <p className="text-[14px] leading-[21px] font-semibold tracking-[-0.35px] text-slate-500">
            {isUploading ? 'Uploading…' : 'Click to add an image'}
          </p>
          <p className="text-[12px] leading-[18px] text-slate-400">
            or drag and drop — PNG, JPG, WEBP
          </p>
        </div>
      </button>
      <input
        ref={inputRef}
        type="file"
        accept={ACCEPTED_TYPES}
        hidden
        onChange={(event) => {
          handleFiles(event.target.files);
          event.target.value = '';
        }}
      />
      {error && <p className="text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
