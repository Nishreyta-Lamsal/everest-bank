'use client';

import { useState } from 'react';

import { isAxiosError } from 'axios';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import RichTextEditor from '@/components/admin/shared/RichTextEditor';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';

import { useUpdateNews } from '@/hooks/api/admin/use-news';
import { useUpdateNotice } from '@/hooks/api/admin/use-notices';

import type { NewsStatus, NoticesAndNewsEntry } from '@/types/admin';

type NoticesAndNewsEditDrawerProps = {
  entry: NoticesAndNewsEntry;
  kind: 'notice' | 'news';
  isOpen: boolean;
  onClose: () => void;
};

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
  const [title, setTitle] = useState(entry.title);
  const [description, setDescription] = useState(() =>
    readDescription(entry.content),
  );
  const [date, setDate] = useState(entry.date ?? '');
  const [status, setStatus] = useState<NewsStatus>(entry.status);

  const updateNews = useUpdateNews(entry.id);
  const updateNotice = useUpdateNotice(entry.id);
  const mutation = kind === 'news' ? updateNews : updateNotice;

  function handleSave() {
    const existingContent =
      entry.content && typeof entry.content === 'object' ? entry.content : {};

    mutation.mutate(
      {
        title,
        content: { ...existingContent, description },
        ...(date ? { date } : {}),
        status,
      },
      { onSuccess: onClose },
    );
  }

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={kind === 'news' ? 'Edit news article' : 'Edit notice'}
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
            type="button"
            variant="primary"
            onClick={handleSave}
            disabled={mutation.isPending || !title.trim()}
          >
            {mutation.isPending ? 'Saving…' : 'Save changes'}
          </Button>
        </>
      }
    >
      <FieldLabel label="Title">
        <Input
          variant="filled"
          size="medium"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Description">
        <RichTextEditor
          value={description}
          onChange={setDescription}
          placeholder="Enter description"
        />
      </FieldLabel>

      <FieldLabel label="Publication date">
        <Input
          type="date"
          variant="filled"
          size="medium"
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Status">
        <Select
          variant="default"
          size="medium"
          options={STATUS_OPTIONS}
          value={status}
          onValueChange={(value) => setStatus(value as NewsStatus)}
        />
      </FieldLabel>

      {mutation.isError && (
        <p className="text-[12px] text-red-600">
          {readApiError(mutation.error)}
        </p>
      )}
    </Drawer>
  );
}
