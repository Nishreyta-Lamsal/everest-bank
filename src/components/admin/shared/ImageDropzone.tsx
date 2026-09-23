'use client';

import { useState } from 'react';

import ImagePreview from './ImagePreview';
import MediaPickerDialog from './media-picker/MediaPickerDialog';
import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { Media, MediaType } from '@/types/admin';

type ImageDropzoneProps = {
  onMediaSelected: (media: Media) => void;
  onRemove?: () => void;
  isUploading?: boolean;
  error?: string;
  mediaType?: MediaType;
  pickerTitle?: string;
  selectedId?: number;
  preview?: {
    src: string;
    alt?: string;
  };
  previewSize?: 'small' | 'large';
};

/**
 * Everything the CMS uses must be catalogued in the media library, so this
 * opens the picker rather than the browser's file dialog — uploading a new
 * file happens inside the picker, which registers it as it goes.
 */
export default function ImageDropzone({
  onMediaSelected,
  onRemove,
  isUploading,
  error,
  mediaType = 'image',
  pickerTitle,
  selectedId,
  preview,
  previewSize = 'small',
}: ImageDropzoneProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isImage = mediaType === 'image';

  return (
    <div className="flex w-full flex-col gap-2">
      {preview && (
        <ImagePreview
          src={preview.src}
          alt={preview.alt}
          size={previewSize}
          onReplace={onMediaSelected}
          onRemove={onRemove}
          isUploading={isUploading}
          mediaType={mediaType}
        />
      )}
      <button
        type="button"
        disabled={isUploading}
        onClick={() => setIsPickerOpen(true)}
        aria-label={isImage ? 'Choose an image' : 'Choose a file'}
        aria-haspopup="dialog"
        className={cn(
          'flex w-full cursor-pointer items-center justify-center gap-3 rounded-[6px] border border-dashed border-[#cfd9e8] bg-[rgba(0,0,0,0.03)] px-px py-[17px]',
          isUploading && 'cursor-not-allowed opacity-60',
        )}
      >
        <div className="flex size-10 items-center justify-center rounded-[12px] border border-[#e6ecf4] bg-white">
          <icon.image className="size-4 text-slate-500" />
        </div>
        <div className="flex flex-col items-start gap-0.5 text-left">
          <p className="text-[14px] leading-[21px] font-semibold tracking-[-0.35px] text-slate-500">
            {isUploading
              ? 'Uploading…'
              : isImage
                ? 'Click to choose an image'
                : 'Click to choose a file'}
          </p>
          <p className="text-[12px] leading-[18px] text-slate-400">
            Pick from assets, or upload a new one there
          </p>
        </div>
      </button>

      <MediaPickerDialog
        isOpen={isPickerOpen}
        onClose={() => setIsPickerOpen(false)}
        onSelect={onMediaSelected}
        mediaType={mediaType}
        selectedId={selectedId}
        title={pickerTitle ?? (isImage ? 'Select an image' : 'Select a file')}
      />

      {error && <p className="text-[12px] text-red-600">{error}</p>}
    </div>
  );
}
