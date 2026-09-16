import type { NewsMediaBrief, NewsStatus } from './news';

export type NoticeRead = {
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

export type NoticeListData = {
  count: number;
  next: string | null;
  previous: string | null;
  results: NoticeRead[];
};


export type NoticesAndNewsEntry = NoticeRead;
