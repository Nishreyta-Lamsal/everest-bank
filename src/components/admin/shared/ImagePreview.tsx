'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

const ACCEPTED_TYPES = 'image/png,image/jpeg,image/webp';

type ImagePreviewProps = {
  src: string;
  alt?: string;
  size?: 'small' | 'large';
  onReplace?: (file: File) => void;
  onRemove?: () => void;
  isUploading?: boolean;
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
}: ImagePreviewProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const image = (
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
          onClick={() => inputRef.current?.click()}
          aria-label="Replace image"
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
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          hidden
          onChange={(event) => {
            const file = event.target.files?.[0];

            if (file) {
              onReplace(file);
            }

            event.target.value = '';
          }}
        />
      )}

      {onRemove && (
        <button
          type="button"
          disabled={isUploading}
          onClick={onRemove}
          aria-label="Remove image"
          className="absolute top-1 right-1 z-10 flex size-5 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white transition-colors disabled:cursor-not-allowed disabled:opacity-60"
        >
          <icon.trash className="size-3" />
        </button>
      )}
    </div>
  );
}
