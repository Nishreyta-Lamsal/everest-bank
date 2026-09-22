'use client';

import { useState } from 'react';

import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import RichTextEditor from '@/components/admin/shared/RichTextEditor';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import NoticeMediaField from './NoticeMediaField';

import { useCreateNews, useUpdateNews } from '@/hooks/api/admin/use-news';
import {
  useCreateNotice,
  useUpdateNotice,
} from '@/hooks/api/admin/use-notices';
import { useUploadMedia } from '@/hooks/api/admin/use-media';

import { newsSchema, type NewsFormValues } from '@/schemas/admin/news-schema';
import {
  noticeSchema,
  type NoticeFormValues,
} from '@/schemas/admin/notice-schema';

import type { NoticesAndNewsTab } from '../notices-and-news-filters/NoticesAndNewsFilterTabs';
import type { Media, NoticesAndNewsEntry } from '@/types/admin';

type NoticesAndNewsEditDrawerProps = {
  entry: NoticesAndNewsEntry | null;
  kind: NoticesAndNewsTab;
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = NoticeFormValues | NewsFormValues;

const FORM_ID = 'notices-and-news-form';

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

const drawerLabels: Record<NoticesAndNewsTab, string> = {
  notice: 'notice',
  news: 'news article',
  'auction-notice': 'auction notice',
};

function readApiError(error: unknown) {
  const fallback = 'Could not save changes.';

  if (!isAxiosError(error)) return fallback;

  const data = error.response?.data as
    { message?: string; errors?: Record<string, string[]> } | undefined;

  const fieldError = Object.entries(data?.errors ?? {})
    .map(([field, messages]) => `${field}: ${messages.join(' ')}`)
    .join(' · ');

  return fieldError || data?.message || fallback;
}

function readDescription(content: unknown) {
  if (content && typeof content === 'object' && 'description' in content) {
    const { description } = content as { description?: unknown };

    return typeof description === 'string' ? description : '';
  }

  return '';
}

export default function NoticesAndNewsEditDrawer({
  entry,
  kind,
  isOpen,
  onClose,
}: NoticesAndNewsEditDrawerProps) {
  const isCreating = entry === null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(kind === 'news' ? newsSchema : noticeSchema),
    defaultValues: {
      title: entry?.title ?? '',
      description: readDescription(entry?.content),
      date: entry?.date ?? new Date().toISOString().slice(0, 10),
      status: entry?.status ?? 'draft',
    },
  });

  const [pickedMedia, setPickedMedia] = useState<Media | null>(null);
  const [isMediaCleared, setIsMediaCleared] = useState(false);

  const createNews = useCreateNews();
  const createNotice = useCreateNotice();
  const updateNews = useUpdateNews(entry?.id ?? 0);
  const updateNotice = useUpdateNotice(entry?.id ?? 0);
  const uploadMedia = useUploadMedia();

  const mutation = isCreating
    ? kind === 'news'
      ? createNews
      : createNotice
    : kind === 'news'
      ? updateNews
      : updateNotice;

  const isSaving = mutation.isPending || uploadMedia.isPending;

  // Notices and auction notices carry an attachment; news articles are text-only.
  const hasMedia = kind !== 'news';

  /**
   * The notice endpoints take a media id, and the picker only ever hands back
   * library assets. `undefined` leaves the existing attachment untouched;
   * `null` detaches it.
   */
  function resolveMediaId() {
    if (!hasMedia) return undefined;

    if (pickedMedia) return pickedMedia.id;

    return isMediaCleared ? null : undefined;
  }

  const onSubmit = handleSubmit(async (values) => {
    const media = resolveMediaId();

    if (isCreating) {
      if (kind === 'news') {
        createNews.mutate(
          {
            title: values.title,
            date: values.date,
            content: { description: values.description },
            status: values.status,
          },
          { onSuccess: onClose },
        );

        return;
      }

      createNotice.mutate(
        {
          title: values.title,
          date: values.date,
          content: { description: values.description },
          status: values.status,
          ...(media === undefined ? {} : { media }),
          ...(kind === 'auction-notice' ? { notice_type: kind } : {}),
        },
        { onSuccess: onClose },
      );

      return;
    }

    if (!entry) return;

    const existingContent =
      entry.content && typeof entry.content === 'object' ? entry.content : {};
    const payload = {
      title: values.title,
      content: { ...existingContent, description: values.description },
      date: values.date,
      status: values.status,
      ...(media === undefined ? {} : { media }),
    };

    if (kind === 'news') {
      updateNews.mutate(payload, { onSuccess: onClose });
    } else {
      updateNotice.mutate(payload, { onSuccess: onClose });
    }
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={`${isCreating ? 'Add' : 'Edit'} ${drawerLabels[kind]}`}
      className="max-w-[900px]"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            disabled={isSaving}
          >
            {isSaving ? 'Saving…' : isCreating ? 'Create' : 'Save changes'}
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
        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            aria-invalid={Boolean(errors.title)}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-[12px] text-red-600">{errors.title.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Description">
          <Controller
            control={control}
            name="description"
            render={({ field }) => (
              <RichTextEditor
                value={field.value}
                onChange={field.onChange}
                placeholder="Enter description"
              />
            )}
          />
          {errors.description && (
            <p className="text-[12px] text-red-600">
              {errors.description.message}
            </p>
          )}
        </FieldLabel>

        {hasMedia && (
          <FieldLabel label="Thumbnail">
            <NoticeMediaField
              existing={entry?.media ?? null}
              value={pickedMedia}
              onChange={(media) => {
                setPickedMedia(media);
                if (media) setIsMediaCleared(false);
              }}
              isCleared={isMediaCleared}
              onClear={() => setIsMediaCleared(true)}
              disabled={isSaving}
            />
            {uploadMedia.isError && (
              <p className="text-[12px] text-red-600">
                {readApiError(uploadMedia.error)}
              </p>
            )}
          </FieldLabel>
        )}

        <FieldLabel label="Publication date">
          <Input
            type="date"
            variant="filled"
            size="medium"
            aria-invalid={Boolean(errors.date)}
            {...register('date')}
          />
          {errors.date && (
            <p className="text-[12px] text-red-600">{errors.date.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Status">
          <Controller
            control={control}
            name="status"
            render={({ field }) => (
              <Select
                variant="default"
                size="medium"
                options={STATUS_OPTIONS}
                value={field.value}
                onValueChange={field.onChange}
              />
            )}
          />
          {errors.status && (
            <p className="text-[12px] text-red-600">{errors.status.message}</p>
          )}
        </FieldLabel>

        {mutation.isError && (
          <p className="text-[12px] text-red-600">
            {readApiError(mutation.error)}
          </p>
        )}
      </form>
    </Drawer>
  );
}
