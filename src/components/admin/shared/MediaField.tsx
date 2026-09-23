import type { Media, SectionMedia } from '@/types/admin';

/** The library shape the section content stores for a chosen asset. */
export function toSectionMedia(media: Media): SectionMedia {
  return {
    src: media.file_url,
    alt: media.alt_text || media.title || '',
    media_id: media.id,
  };
}
