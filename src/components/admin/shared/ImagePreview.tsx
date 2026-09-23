'use client';

import Image from 'next/image';
import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import MediaPickerDialog from './media-picker/MediaPickerDialog';

import { cn } from '@/lib/utils';

import type { Media, MediaType } from '@/types/admin';

type ImagePreviewProps = {
  src: string;
  alt?: string;
  size?: 'small' | 'large';
  /** Replacing picks another library asset rather than uploading a file. */
  onReplace?: (media: Media) => void;
  onRemove?: () => void;
  isUploading?: boolean;
  mediaType?: MediaType;
};

const sizeClasses = {
  small: 'h-[64px] w-[88px] shrink-0',
  large: 'h-[120px] w-full',
};

export default function ImagePreview({
  src,
  alt,
  size = 'small',
  onReplace,
  onRemove,
  isUploading,
  mediaType = 'image',
}: ImagePreviewProps) {
  const [isPickerOpen, setIsPickerOpen] = useState(false);

  const isVideo = mediaType === 'video';
  const label = isVideo ? 'video' : 'image';
  const image = isVideo ? (
    <video
      src={src}
      muted
      playsInline
      preload="metadata"
      className="absolute inset-0 size-full object-cover"
    />
  ) : (
    <Image
      src={src}
      alt={alt ?? ''}
      fill
      sizes={size === 'small' ? '88px' : '400px'}
      className="object-cover"
    />
  );

  return (
    <div
      className={cn(
        'group relative overflow-hidden rounded-[6px] border border-[#e6ecf4] bg-[rgba(0,0,0,0.03)]',
        sizeClasses[size],
      )}
    >
      {onReplace ? (
        <button
          type="button"
          disabled={isUploading}
          onClick={() => setIsPickerOpen(true)}
          aria-label={`Replace ${label}`}
          className="absolute inset-0 block cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
        >
          {image}
          <span className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-white opacity-0 transition-opacity group-hover:bg-black/50 group-hover:opacity-100">
            <icon.edit className={size === 'small' ? 'size-3.5' : 'size-4'} />
            {size === 'large' && (
              <span className="text-[12px] font-medium">
                {isUploading ? 'Uploading…' : 'Click to replace'}
              </span>
            )}
          </span>
        </button>
      ) : (
        image
      )}

      {onReplace && (
        <MediaPickerDialog
          isOpen={isPickerOpen}
          onClose={() => setIsPickerOpen(false)}
          onSelect={onReplace}
          mediaType={mediaType}
          title={`Replace ${label}`}
        />
      )}

      {onRemove && (
        <button
          type="button"
          disabled={isUploading}
          onClick={onRemove}
          aria-label={`Remove ${label}`}
          className="absolute top-1 right-1 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          <icon.trash className="size-3" />
        </button>
      )}
    </div>
  );
}
