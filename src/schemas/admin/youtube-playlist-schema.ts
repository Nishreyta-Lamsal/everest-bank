import { z } from 'zod';

const PLAYLIST_ID = /^(?:PL|UU|LL|RD|OL|FL)[A-Za-z0-9_-]{10,32}$/;
const PLAYLIST_URL = /[?&]list=([A-Za-z0-9_-]+)/;
const CHANNEL_ID = /^UC[A-Za-z0-9_-]{22}$/;

/** Accepts either a bare playlist ID or any YouTube URL carrying `list=`. */
export function extractPlaylistId(value: string) {
  const trimmed = value.trim();

  return trimmed.match(PLAYLIST_URL)?.[1] ?? trimmed;
}

export const youtubePlaylistSchema = z
  .object({
    playlist_id: z
      .string()
      .refine(
        (value) => !value.trim() || PLAYLIST_ID.test(extractPlaylistId(value)),
        'Not a YouTube playlist ID. It starts with PL, UU, LL, RD, OL or FL — or paste the playlist URL.',
      ),
    channel_id: z
      .string()
      .refine(
        (value) => !value.trim() || CHANNEL_ID.test(value.trim()),
        'Not a YouTube channel ID. It starts with UC and is 24 characters long.',
      ),
    name: z
      .string()
      .trim()
      .min(1, 'Name is required')
      .max(255, 'Name must be 255 characters or fewer'),
    description: z.string(),
    is_active: z.boolean(),
  })
  .refine((values) => values.playlist_id.trim() || values.channel_id.trim(), {
    message: 'Enter a playlist ID or a channel ID.',
    path: ['playlist_id'],
  });

export type YouTubePlaylistFormValues = z.infer<typeof youtubePlaylistSchema>;
