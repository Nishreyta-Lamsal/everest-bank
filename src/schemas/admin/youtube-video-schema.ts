import { z } from 'zod';

const VIDEO_ID = /^[A-Za-z0-9_-]{11}$/;
const VIDEO_URL =
  /(?:[?&]v=|youtu\.be\/|\/shorts\/|\/embed\/|\/live\/)([A-Za-z0-9_-]{11})/;

/** Accepts either a bare 11-character video ID or a YouTube video URL. */
export function extractVideoId(value: string) {
  const trimmed = value.trim();

  return trimmed.match(VIDEO_URL)?.[1] ?? trimmed;
}

const optionalUrl = z.union([
  z.literal(''),
  z.url('Enter a valid URL').max(500, 'URL must be 500 characters or fewer'),
]);

export const youtubeVideoSchema = z.object({
  playlist: z.string().min(1, 'Playlist is required'),
  youtube_video_id: z
    .string()
    .min(1, 'Video ID is required')
    .refine(
      (value) => VIDEO_ID.test(extractVideoId(value)),
      'Not a YouTube video ID — paste the 11-character ID or the video URL.',
    ),
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(255, 'Title must be 255 characters or fewer'),
  custom_title: z
    .string()
    .max(255, 'Custom title must be 255 characters or fewer'),
  video_url: optionalUrl,
  thumbnail: optionalUrl,
  description: z.string(),
  show_on_homepage: z.boolean(),
});

export type YouTubeVideoFormValues = z.infer<typeof youtubeVideoSchema>;
