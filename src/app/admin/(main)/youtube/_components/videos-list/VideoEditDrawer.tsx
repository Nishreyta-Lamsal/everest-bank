'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Switch } from '@/components/admin/ui/switch';
import { Textarea } from '@/components/admin/ui/textarea';

import {
  useCreateYouTubeVideo,
  useUpdateYouTubeVideo,
} from '@/hooks/api/admin/use-youtube';

import { readApiError } from '@/lib/admin/read-api-error';

import {
  extractVideoId,
  youtubeVideoSchema,
  type YouTubeVideoFormValues,
} from '@/schemas/admin/youtube-video-schema';

import type { YouTubePlaylist, YouTubeVideo } from '@/types/admin';

type VideoEditDrawerProps = {
  entry: YouTubeVideo | null;
  playlists: YouTubePlaylist[];
  defaultPlaylistId?: number | null;
  isOpen: boolean;
  onClose: () => void;
};

const FORM_ID = 'youtube-video-form';

export default function VideoEditDrawer({
  entry,
  playlists,
  defaultPlaylistId = null,
  isOpen,
  onClose,
}: VideoEditDrawerProps) {
  const isCreating = entry === null;

  const playlistOptions = playlists.map((playlist) => ({
    label: playlist.name,
    value: String(playlist.id),
  }));

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<YouTubeVideoFormValues>({
    resolver: zodResolver(youtubeVideoSchema),
    defaultValues: {
      playlist: String(entry?.playlist ?? defaultPlaylistId ?? ''),
      youtube_video_id: entry?.youtube_video_id ?? '',
      title: entry?.title ?? '',
      custom_title: entry?.custom_title ?? '',
      video_url: entry?.video_url ?? '',
      thumbnail: entry?.thumbnail ?? '',
      description: entry?.description ?? '',
      show_on_homepage: entry?.show_on_homepage ?? false,
    },
  });

  const createVideo = useCreateYouTubeVideo();
  const updateVideo = useUpdateYouTubeVideo(entry?.id ?? 0);
  const mutation = isCreating ? createVideo : updateVideo;

  const onSubmit = handleSubmit((values) => {
    const youtubeVideoId = extractVideoId(values.youtube_video_id);

    const payload = {
      playlist: Number(values.playlist),
      youtube_video_id: youtubeVideoId,
      title: values.title,
      custom_title: values.custom_title.trim() || null,
      video_url:
        values.video_url || `https://www.youtube.com/watch?v=${youtubeVideoId}`,
      thumbnail: values.thumbnail || null,
      description: values.description.trim(),
      show_on_homepage: values.show_on_homepage,
    };

    if (isCreating) {
      createVideo.mutate(payload, { onSuccess: onClose });
    } else {
      updateVideo.mutate(payload, { onSuccess: onClose });
    }
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isCreating ? 'Add video' : 'Edit video'}
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
                ? 'Add video'
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
        <FieldLabel label="Playlist">
          <Controller
            control={control}
            name="playlist"
            render={({ field }) => (
              <Select
                variant="filled"
                size="medium"
                placeholder={
                  playlistOptions.length > 0
                    ? 'Select playlist'
                    : 'Add a playlist first'
                }
                options={playlistOptions}
                value={field.value}
                onValueChange={field.onChange}
                disabled={playlistOptions.length === 0}
              />
            )}
          />
          {errors.playlist && (
            <p className="text-[12px] text-red-600">
              {errors.playlist.message}
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="YouTube video ID or URL">
          <Input
            variant="filled"
            size="medium"
            placeholder="dQw4w9WgXcQ or https://youtu.be/…"
            aria-invalid={Boolean(errors.youtube_video_id)}
            {...register('youtube_video_id')}
          />
          {errors.youtube_video_id && (
            <p className="text-[12px] text-red-600">
              {errors.youtube_video_id.message}
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            placeholder="Video title"
            aria-invalid={Boolean(errors.title)}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-[12px] text-red-600">{errors.title.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Custom title (optional)">
          <Input
            variant="filled"
            size="medium"
            placeholder="Shown instead of the YouTube title"
            aria-invalid={Boolean(errors.custom_title)}
            {...register('custom_title')}
          />
          {errors.custom_title && (
            <p className="text-[12px] text-red-600">
              {errors.custom_title.message}
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Video URL (optional)">
          <Input
            variant="filled"
            size="medium"
            placeholder="Defaults to the YouTube watch link"
            aria-invalid={Boolean(errors.video_url)}
            {...register('video_url')}
          />
          {errors.video_url && (
            <p className="text-[12px] text-red-600">
              {errors.video_url.message}
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Thumbnail URL (optional)">
          <Input
            variant="filled"
            size="medium"
            placeholder="https://i.ytimg.com/vi/…"
            aria-invalid={Boolean(errors.thumbnail)}
            {...register('thumbnail')}
          />
          {errors.thumbnail && (
            <p className="text-[12px] text-red-600">
              {errors.thumbnail.message}
            </p>
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
            <p className="text-[13px] text-neutral-900">Show on homepage</p>
            <p className="text-[12px] text-neutral-700/68">
              Featured in the homepage video section.
            </p>
          </div>
          <Controller
            control={control}
            name="show_on_homepage"
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
