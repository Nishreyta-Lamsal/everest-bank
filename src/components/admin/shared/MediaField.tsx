'use client';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from './ImageDropzone';

import type { SectionMedia } from '@/types/admin';

type MediaFieldProps = {
  label: string;
  media?: SectionMedia;
  onUpload: (file: File) => void;
  onRemove?: () => void;
  isUploading?: boolean;
};

export default function MediaField({
  label,
  media,
  onUpload,
  onRemove,
  isUploading,
}: MediaFieldProps) {
  return (
    <FieldLabel label={label}>
      <ImageDropzone
        onFileSelected={onUpload}
        onRemove={onRemove}
        isUploading={isUploading}
        preview={media?.src ? { src: media.src, alt: media.alt } : undefined}
      />
    </FieldLabel>
  );
}
