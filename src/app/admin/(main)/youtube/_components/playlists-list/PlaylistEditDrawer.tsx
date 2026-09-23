'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Switch } from '@/components/admin/ui/switch';
import { Textarea } from '@/components/admin/ui/textarea';

import {
  useCreateYouTubePlaylist,
  useUpdateYouTubePlaylist,
} from '@/hooks/api/admin/use-youtube';

import { readApiError } from '@/lib/admin/read-api-error';

import {
  extractPlaylistId,
  youtubePlaylistSchema,
  type YouTubePlaylistFormValues,
} from '@/schemas/admin/youtube-playlist-schema';

import type { YouTubePlaylist } from '@/types/admin';

type PlaylistEditDrawerProps = {
  entry: YouTubePlaylist | null;
  isOpen: boolean;
  onClose: () => void;
};

const FORM_ID = 'youtube-playlist-form';

export default function PlaylistEditDrawer({
  entry,
  isOpen,
  onClose,
}: PlaylistEditDrawerProps) {
  const isCreating = entry === null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YouTubePlaylistFormValues>({
    resolver: zodResolver(youtubePlaylistSchema),
    defaultValues: {
      playlist_id: entry?.playlist_id ?? '',
      channel_id: entry?.channel_id ?? '',
      name: entry?.name ?? '',
      description: entry?.description ?? '',
      is_active: entry?.is_active ?? true,
    },
  });

  const createPlaylist = useCreateYouTubePlaylist();
  const updatePlaylist = useUpdateYouTubePlaylist(entry?.id ?? 0);
  const mutation = isCreating ? createPlaylist : updatePlaylist;

  const onSubmit = handleSubmit((values) => {
    const playlistId = extractPlaylistId(values.playlist_id);
    const channelId = values.channel_id.trim();

    const payload = {
      name: values.name,
      description: values.description.trim(),
      is_active: values.is_active,
      ...(playlistId ? { playlist_id: playlistId } : {}),
      ...(channelId || !isCreating ? { channel_id: channelId } : {}),
    };

    if (isCreating) {
      createPlaylist.mutate(payload, { onSuccess: onClose });
    } else {
      updatePlaylist.mutate(payload, { onSuccess: onClose });
    }
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isCreating ? 'Add playlist' : 'Edit playlist'}
      description="Videos are pulled from YouTube when the playlist is synced."
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={mutation.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            disabled={mutation.isPending}
          >
            {mutation.isPending
              ? 'Saving…'
              : isCreating
                ? 'Add playlist'
                : 'Save changes'}
          </Button>
        </>
      }
    >
      <form
        id={FORM_ID}
        onSubmit={onSubmit}
        noValidate
        className="flex w-full flex-col gap-4"
      >
        <FieldLabel label="Playlist ID or URL">
          <Input
            variant="filled"
            size="medium"
            placeholder="PLxxxxxxxx or https://www.youtube.com/playlist?list=…"
            aria-invalid={Boolean(errors.playlist_id)}
            {...register('playlist_id')}
          />
          {errors.playlist_id && (
            <p className="text-[12px] text-red-600">
              {errors.playlist_id.message}
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Channel ID (optional)">
          <Input
            variant="filled"
            size="medium"
            placeholder="UCxxxxxxxx"
            aria-invalid={Boolean(errors.channel_id)}
            {...register('channel_id')}
          />
          {errors.channel_id ? (
            <p className="text-[12px] text-red-600">
              {errors.channel_id.message}
            </p>
          ) : (
            <p className="text-[12px] text-neutral-700/68">
              Without a playlist ID, the channel&apos;s uploads are tracked
              instead.
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Name">
          <Input
            variant="filled"
            size="medium"
            placeholder="Everest Bank highlights"
            aria-invalid={Boolean(errors.name)}
            {...register('name')}
          />
          {errors.name && (
            <p className="text-[12px] text-red-600">{errors.name.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Description">
          <Textarea
            variant="filled"
            size="medium"
            containerClassName="h-[120px]"
            placeholder="Write a short description"
            {...register('description')}
          />
        </FieldLabel>

        <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-4">
          <div className="flex flex-col">
            <p className="text-[13px] text-neutral-900">Active</p>
            <p className="text-[12px] text-neutral-700/68">
              Inactive playlists stay saved but are skipped when syncing.
            </p>
          </div>
          <Controller
            control={control}
            name="is_active"
            render={({ field }) => (
              <Switch checked={field.value} onCheckedChange={field.onChange} />
            )}
          />
        </div>

        {mutation.isError && (
          <p className="text-[12px] text-red-600">
            {readApiError(mutation.error, 'Could not save changes.')}
          </p>
        )}
      </form>
    </Drawer>
  );
}
