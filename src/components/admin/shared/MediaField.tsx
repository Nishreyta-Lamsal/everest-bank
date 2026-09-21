'use client';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from './ImageDropzone';

import type { Media, MediaType, SectionMedia } from '@/types/admin';

type MediaFieldProps = {
  label: string;
  media?: SectionMedia;
  /**
   * Receives the library item the editor picked. Files are uploaded inside the
   * picker, so this is always an already-catalogued asset.
   */
  onSelect: (media: SectionMedia) => void;
  onRemove?: () => void;
  isUploading?: boolean;
  mediaType?: MediaType;
  previewSize?: 'small' | 'large';
};

/** The library shape the section content stores for a chosen asset. */
export function toSectionMedia(media: Media): SectionMedia {
  return {
    src: media.file_url,
    alt: media.alt_text || media.title || '',
    media_id: media.id,
  };
}

export default function MediaField({
  label,
  media,
  onSelect,
  onRemove,
  isUploading,
  mediaType,
  previewSize,
}: MediaFieldProps) {
  return (
    <FieldLabel label={label}>
      <ImageDropzone
        onMediaSelected={(picked) => onSelect(toSectionMedia(picked))}
        onRemove={onRemove}
        isUploading={isUploading}
        mediaType={mediaType}
        pickerTitle={label}
        selectedId={media?.media_id}
        preview={media?.src ? { src: media.src, alt: media.alt } : undefined}
        previewSize={previewSize}
      />
    </FieldLabel>
  );
}
