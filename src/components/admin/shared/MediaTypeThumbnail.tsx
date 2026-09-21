import Image from 'next/image';

import { icon } from '@/components/admin/icons';

import { cn } from '@/lib/utils';

import type { MediaType } from '@/types/admin';

const FALLBACK_ICONS: Record<MediaType, keyof typeof icon> = {
  image: 'image',
  video: 'video',
  pdf: 'fileText',
  audio: 'fileText',
  document: 'fileText',
};

type MediaTypeThumbnailProps = {
  mediaType: MediaType;
  src?: string | null;
  alt?: string;
  sizes?: string;
  className?: string;
};

export default function MediaTypeThumbnail({
  mediaType,
  src,
  alt,
  sizes = '160px',
  className,
}: MediaTypeThumbnailProps) {
  const Fallback = icon[FALLBACK_ICONS[mediaType] ?? 'fileText'];

  if (mediaType !== 'image' || !src) {
    return (
      <div
        className={cn(
          'flex shrink-0 items-center justify-center rounded-[6px] bg-slate-100',
          className,
        )}
      >
        <Fallback className="size-4 text-slate-500" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        'relative shrink-0 overflow-hidden rounded-[6px] bg-slate-100',
        className,
      )}
    >
      <Image
        src={src}
        alt={alt ?? ''}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  );
}
