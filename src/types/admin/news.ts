export type NewsStatus = 'draft' | 'published';

export type NewsTypeBrief = {
  id: number;
  slug: string;
  label: string;
  label_ne: string;
};

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
  news_type: NewsTypeBrief | null;
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

export type NewsCategoryCountType = {
  slug: string;
  label: string;
  position: number;
  count: number;
};

export type NewsCategoryCounts = {
  all: number;
  types: NewsCategoryCountType[];
};

export type NewsListData = {
  category_counts: NewsCategoryCounts;
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsRead[];
};
