export type MediaType = 'image' | 'video' | 'pdf' | 'audio' | 'document';

export type Media = {
  id: number;
  title?: string;
  file_url: string;
  thumbnail_url: string | null;
  media_type: MediaType;
  alt_text?: string;
  caption?: string;
  credit?: string;
  mime_type?: string;
  file_size?: number | null;
  width?: number | null;
  height?: number | null;
  created_at: string;
  updated_at: string;
};

export type MediaUploadInput = {
  file: File;
  title?: string;
  alt_text?: string;
  folder?: number;
};
