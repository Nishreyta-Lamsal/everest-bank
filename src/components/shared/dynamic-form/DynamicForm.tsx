'use client';

import { useForm, useWatch } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { isAxiosError } from 'axios';

import DynamicFormField from './DynamicFormField';

import { formService } from '@/api/services/form.service';

import { cn } from '@/lib/utils';

import type { PublicForm } from '@/api/services/form.service';

type FormValues = Record<string, unknown>;

/**
 * Empty optional answers are dropped rather than sent as "", which the backend
 * would otherwise validate as a present-but-invalid value for typed fields.
 */
function clean(values: FormValues) {
  return Object.fromEntries(
    Object.entries(values).filter(
      ([, value]) => value !== '' && value !== undefined && value !== null,
    ),
  );
}

type DynamicFormProps = {
  form: PublicForm;
  className?: string;
};

export default function DynamicForm({ form, className }: DynamicFormProps) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    setError,
    formState: { errors },
  } = useForm<FormValues>();

  // useWatch rather than watch(): watch() returns a function the React
  // Compiler cannot memoize, which opts this whole component out of it.
  const values = useWatch({ control }) as FormValues;

  const submit = useMutation({
    mutationFn: (payload: FormValues) => formService.submit(form.slug, payload),
    onSuccess: () => reset(),
    onError: (error) => {
      // The server validates independently; surface its field errors against
      // the same field names rather than showing one generic failure.
      if (!isAxiosError(error)) return;

      const details = error.response?.data?.data;
      if (!details || typeof details !== 'object') return;

      for (const [name, message] of Object.entries(details)) {
        setError(name, {
          type: 'server',
          message: Array.isArray(message)
            ? String(message[0])
            : String(message),
        });
      }
    },
  });

  if (submit.isSuccess) {
    return (
      <div
        role="status"
        className={cn(
          'flex flex-col items-center gap-2 border border-black/5 bg-white p-10 text-center',
          className,
        )}
      >
        <p className="text-lg font-semibold text-neutral-900">Thank you</p>
        <p className="text-sm text-neutral-700">
          {submit.data?.message ??
            form.success_message ??
            'Your request has been submitted.'}
        </p>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit((raw) => submit.mutate(clean(raw)))}
      className={cn(
        'flex flex-col gap-5 border border-black/5 bg-white p-6 md:p-8',
        className,
      )}
    >
      {form.description && (
        <p className="text-sm text-neutral-700">{form.description}</p>
      )}

      {/* Half-width fields pair up on desktop and stack on mobile. */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        {form.fields.map((field) => (
          <div
            key={field.name}
            className={
              field.width === 'half' ? 'md:col-span-1' : 'md:col-span-2'
            }
          >
            <DynamicFormField
              field={field}
              register={register}
              error={errors[field.name]?.message as string | undefined}
              values={values}
            />
          </div>
        ))}
      </div>

      {submit.isError && (
        <p role="alert" className="text-sm text-red-600">
          Your request could not be submitted. Please check the form and try
          again.
        </p>
      )}

      <div>
        <button
          type="submit"
          disabled={submit.isPending}
          className="cursor-pointer bg-[#a4262c] px-8 py-2.5 text-sm text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submit.isPending ? 'Submitting…' : form.submit_label || 'Submit'}
        </button>
      </div>
    </form>
  );
}
