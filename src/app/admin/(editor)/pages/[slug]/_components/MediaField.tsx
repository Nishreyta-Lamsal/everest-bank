'use client';

import FieldLabel from './FieldLabel';
import ImageDropzone from './ImageDropzone';
import SlideImageThumbnail from './SlideImageThumbnail';

import type { SectionMedia } from '@/types/admin';

type MediaFieldProps = {
  label: string;
  media?: SectionMedia;
  onUpload: (file: File) => void;
  isUploading?: boolean;
};

export default function MediaField({
  label,
  media,
  onUpload,
  isUploading,
}: MediaFieldProps) {
  return (
    <FieldLabel label={label}>
      <div className="flex w-full flex-col gap-2">
        {media?.src && <SlideImageThumbnail src={media.src} alt={media.alt} />}
        <ImageDropzone onFileSelected={onUpload} isUploading={isUploading} />
      </div>
    </FieldLabel>
  );
}
