'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Switch } from '@/components/admin/ui/switch';
import CalendarMediaField from './CalendarMediaField';

import {
  useCreateCalendar,
  useUpdateCalendar,
} from '@/hooks/api/admin/use-calendars';

import { getCurrentBsYear } from '@/lib/admin/bs-year';
import { readApiError } from '@/lib/admin/read-api-error';

import {
  calendarSchema,
  type CalendarFormValues,
} from '@/schemas/admin/calendar-schema';

import type { Media } from '@/types/admin';
import type { CalendarRead } from '@/api/services/admin/calendar.service';

type CalendarEditDrawerProps = {
  entry: CalendarRead | null;
  isOpen: boolean;
  onClose: () => void;
};

const FORM_ID = 'calendar-form';

const CURRENT_BS_YEAR = getCurrentBsYear();

const YEAR_OPTIONS = Array.from({ length: 11 }, (_, index) => {
  const year = CURRENT_BS_YEAR - index;

  return { label: String(year), value: String(year) };
});

export default function CalendarEditDrawer({
  entry,
  isOpen,
  onClose,
}: CalendarEditDrawerProps) {
  const isCreating = entry === null;

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CalendarFormValues>({
    resolver: zodResolver(calendarSchema),
    defaultValues: {
      year: entry?.year ?? CURRENT_BS_YEAR,
      title: entry?.title ?? '',
      is_active: entry?.is_active ?? true,
    },
  });

  const [pickedMedia, setPickedMedia] = useState<Media | null>(null);
  const [mediaError, setMediaError] = useState(false);

  const createCalendar = useCreateCalendar();
  const updateCalendar = useUpdateCalendar(entry?.id ?? 0);
  const mutation = isCreating ? createCalendar : updateCalendar;

  const onSubmit = handleSubmit((values) => {
    const commonFields = {
      year: values.year,
      title: values.title,
      is_active: values.is_active,
    };

    if (isCreating) {
      if (!pickedMedia) {
        setMediaError(true);
        return;
      }

      setMediaError(false);
      createCalendar.mutate(
        { ...commonFields, media: pickedMedia.id },
        { onSuccess: onClose },
      );

      return;
    }

    setMediaError(false);
    updateCalendar.mutate(
      { ...commonFields, ...(pickedMedia ? { media: pickedMedia.id } : {}) },
      { onSuccess: onClose },
    );
  });

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isCreating ? 'Add calendar' : 'Edit calendar'}
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
        <FieldLabel label="Calendar file">
          <CalendarMediaField
            existing={entry?.media ?? null}
            value={pickedMedia}
            onChange={(media) => {
              setPickedMedia(media);
              setMediaError(false);
            }}
          />
          {mediaError && (
            <p className="text-[12px] text-red-600">
              A calendar file is required.
            </p>
          )}
        </FieldLabel>

        <FieldLabel label="Year (B.S.)">
          <Controller
            control={control}
            name="year"
            render={({ field }) => (
              <Select
                variant="filled"
                size="medium"
                options={YEAR_OPTIONS}
                value={String(field.value)}
                onValueChange={(value) => field.onChange(Number(value))}
              />
            )}
          />
          {errors.year && (
            <p className="text-[12px] text-red-600">{errors.year.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Title">
          <Input
            variant="filled"
            size="medium"
            placeholder="e-Calendar 2082"
            aria-invalid={Boolean(errors.title)}
            {...register('title')}
          />
          {errors.title && (
            <p className="text-[12px] text-red-600">{errors.title.message}</p>
          )}
        </FieldLabel>

        <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-4">
          <div className="flex flex-col">
            <p className="text-[13px] text-neutral-900">Show on the website</p>
            <p className="text-[12px] text-neutral-700/68">
              Inactive calendars stay here but disappear from the public site.
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
