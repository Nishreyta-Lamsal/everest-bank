export type MediaType = 'image' | 'video' | 'pdf' | 'audio' | 'document';

export type MediaBrief = {
  id: number;
  title: string;
  file_url: string;
  thumbnail_url: string | null;
  alt_text: string;
  media_type: MediaType;
};
