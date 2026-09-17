export type NewsStatus = 'draft' | 'published';

export type NewsMediaBrief = {
  id: number;
  title?: string;
  file_url?: string;
  thumbnail_url?: string;
  alt_text?: string;
};

export type NewsRead = {
  id: number;
  slug: string;
  title: string;
  title_ne: string;
  content: unknown;
  content_ne: unknown;
  date: string;
  expires_on: string | null;
  media: NewsMediaBrief | null;
  document: NewsMediaBrief | null;
  attachment_url: string | null;
  status: NewsStatus;
  status_label: string;
  is_pinned: boolean;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type NewsListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsRead[];
};
