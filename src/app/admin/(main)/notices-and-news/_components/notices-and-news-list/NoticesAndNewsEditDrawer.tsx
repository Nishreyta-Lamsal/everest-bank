'use client';

import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import RichTextEditor from '@/components/admin/shared/RichTextEditor';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';

import { useCreateNews, useUpdateNews } from '@/hooks/api/admin/use-news';
import {
  useCreateNotice,
  useUpdateNotice,
} from '@/hooks/api/admin/use-notices';

import { newsSchema, type NewsFormValues } from '@/schemas/admin/news-schema';
import {
  noticeSchema,
  type NoticeFormValues,
} from '@/schemas/admin/notice-schema';

import type { NoticesAndNewsEntry } from '@/types/admin';

type NoticesAndNewsEditDrawerProps = {
  entry: NoticesAndNewsEntry | null;
  kind: 'notice' | 'news';
  isOpen: boolean;
  onClose: () => void;
};

type FormValues = NoticeFormValues | NewsFormValues;

const FORM_ID = 'notices-and-news-form';

const STATUS_OPTIONS = [
  { label: 'Draft', value: 'draft' },
  { label: 'Published', value: 'published' },
];

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

  const createNews = useCreateNews();
  const createNotice = useCreateNotice();
  const updateNews = useUpdateNews(entry?.id ?? 0);
  const updateNotice = useUpdateNotice(entry?.id ?? 0);

  const mutation = isCreating
    ? kind === 'news'
      ? createNews
      : createNotice
    : kind === 'news'
      ? updateNews
      : updateNotice;

  const onSubmit = handleSubmit((values) => {
    if (isCreating) {
      const create = kind === 'news' ? createNews : createNotice;

      create.mutate(
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

    if (!entry) return;

    const existingContent =
      entry.content && typeof entry.content === 'object' ? entry.content : {};
    const payload = {
      title: values.title,
      content: { ...existingContent, description: values.description },
      date: values.date,
      status: values.status,
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
      title={
        isCreating
          ? kind === 'news'
            ? 'Add news article'
            : 'Add notice'
          : kind === 'news'
            ? 'Edit news article'
            : 'Edit notice'
      }
      className="max-w-[900px]"
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
                ? 'Create'
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
