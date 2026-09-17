export type MediaType = 'image' | 'video' | 'pdf' | 'audio' | 'document';

export type MediaItemFolder = {
  id: number;
  name: string;
};

export type Media = {
  id: number;
  title?: string;
  file_url: string;
  thumbnail_url: string | null;
  converted_url?: string | null;
  media_type: MediaType;
  folder?: MediaItemFolder | null;
  alt_text?: string;
  caption?: string;
  credit?: string;
  mime_type?: string;
  file_size?: number | null;
  width?: number | null;
  height?: number | null;
  priority?: number;
  created_at: string;
  updated_at: string;
};

export type MediaUploadInput = {
  file: File;
  title?: string;
  alt_text?: string;
  caption?: string;
  credit?: string;
  folder?: number;
};

export type MediaFolder = {
  id: number;
  name: string;
  parent: number | null;
  file_count: number;
  total_size: number;
  created_at: string;
  updated_at: string;
};

export type MediaStorageByType = {
  bytes: number;
  percent: number;
};

export type MediaStorageUsage = {
  used_bytes: number;
  quota_bytes: number;
  used_percent: number;
  by_type: Record<MediaType, MediaStorageByType>;
};

/**
 * The media list endpoints page by cursor: `next_cursor` is an opaque token to
 * send back as `?cursor=`, and `has_more` says whether one follows. `count` is
 * absent or capped (`count_is_capped`), so there is no total to page against.
 *
 * `next`/`previous` are the DRF-style URL form some deployments return instead;
 * `readNextCursor` reads whichever of the two is present.
 */
export type MediaListData = {
  count?: number;
  count_is_capped?: boolean;
  source?: string;
  has_more?: boolean;
  next_cursor?: string | null;
  next: string | null;
  previous: string | null;
  results: Media[];
};

export type MediaFolderListData = {
  count?: number;
  next: string | null;
  previous: string | null;
  results: MediaFolder[];
};
