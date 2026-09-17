'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import AddMediaFileField from './AddMediaFileField';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Textarea } from '@/components/admin/ui/textarea';

import { useUploadMedia } from '@/hooks/api/admin/use-media';
import { useMediaFolders } from '@/hooks/api/admin/use-media-library';

import { readApiError } from '@/lib/admin/read-api-error';

import {
  mediaUploadSchema,
  type MediaUploadFormValues,
} from '@/schemas/admin/media-schema';

type AddMediaDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
  defaultFolderId?: number;
};

const FORM_ID = 'add-media-form';

export default function AddMediaDrawer({
  isOpen,
  onClose,
  defaultFolderId,
}: AddMediaDrawerProps) {
  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<MediaUploadFormValues>({
    resolver: zodResolver(mediaUploadSchema),
    defaultValues: {
      title: '',
      altText: '',
      caption: '',
      credit: '',
      folder: defaultFolderId ? String(defaultFolderId) : '',
    },
  });

  const { data: foldersData } = useMediaFolders();
  const uploadMedia = useUploadMedia();

  const folderOptions = [
    { label: 'No folder', value: '' },
    ...(foldersData?.results ?? []).map((folder) => ({
      label: folder.name,
      value: String(folder.id),
    })),
  ];

  const onSubmit = handleSubmit((values) => {
    uploadMedia.mutate(
      {
        file: values.file,
        title: values.title?.trim() || undefined,
        alt_text: values.altText?.trim() || undefined,
        caption: values.caption?.trim() || undefined,
        credit: values.credit?.trim() || undefined,
        ...(values.folder ? { folder: Number(values.folder) } : {}),
      },
      { onSuccess: onClose },
    );
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title="Add new media"
      description="Upload a file and describe it for the library."
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={uploadMedia.isPending}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form={FORM_ID}
            variant="primary"
            disabled={uploadMedia.isPending}
          >
            {uploadMedia.isPending ? 'Uploading…' : 'Upload'}
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
        <Controller
          control={control}
          name="file"
          render={({ field }) => (
            <AddMediaFileField
              value={field.value ?? null}
              onChange={field.onChange}
              disabled={uploadMedia.isPending}
            />
          )}
        />
        {errors.file && (
          <p className="text-[12px] text-red-600">{errors.file.message}</p>
        )}

        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            placeholder="Enter a title"
            {...register('title')}
          />
        </FieldLabel>

        <FieldLabel label="Alt text">
          <Input
            variant="filled"
            size="medium"
            placeholder="Describe this for accessibility"
            {...register('altText')}
          />
        </FieldLabel>

        <FieldLabel label="Caption">
          <Textarea
            variant="filled"
            size="medium"
            placeholder="Shown alongside the media"
            {...register('caption')}
          />
        </FieldLabel>

        <FieldLabel label="Credit">
          <Input
            variant="filled"
            size="medium"
            placeholder="Photographer or source"
            {...register('credit')}
          />
        </FieldLabel>

        <FieldLabel label="Folder">
          <Controller
            control={control}
            name="folder"
            render={({ field }) => (
              <Select
                variant="default"
                size="medium"
                options={folderOptions}
                value={field.value ?? ''}
                onValueChange={field.onChange}
              />
            )}
          />
        </FieldLabel>

        {uploadMedia.isError && (
          <p className="text-[12px] text-red-600">
            {readApiError(uploadMedia.error, 'Could not upload this file.')}
          </p>
        )}
      </form>
    </Drawer>
  );
}
