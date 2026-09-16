'use client';

import { cn } from '@/lib/utils';

import type { FormDetail, FormField } from '@/types/admin';

/** Read-only replica of the public form page layout. */
function PreviewField({ field }: { field: FormField }) {
  const options =
    field.options_source === 'static' ? field.options : field.resolved_options;

  return (
    <div
      className={cn('flex flex-col gap-2', field.width === 'half' && 'w-full')}
    >
      <p className="text-[11px] font-semibold tracking-wide text-neutral-700 uppercase">
        {field.label}
        {field.is_required && <span className="ml-1 text-red-500">*</span>}
      </p>

      {field.field_type === 'textarea' ? (
        <div className="h-24 w-full rounded-sm border border-slate-300 bg-white" />
      ) : field.field_type === 'radio' ? (
        <div className="flex flex-col gap-1.5">
          {options.slice(0, 4).map((option, index) => (
            <span
              key={index}
              className="flex items-center gap-2 text-[12px] text-neutral-700"
            >
              <span className="size-3 rounded-full border border-slate-400" />
              {option.label || 'Option'}
            </span>
          ))}
          {options.length === 0 && (
            <span className="text-[12px] text-neutral-400">No options yet</span>
          )}
        </div>
      ) : field.field_type === 'checkbox' ? (
        <span className="flex items-center gap-2 text-[12px] text-neutral-700">
          <span className="size-3 rounded-xs border border-slate-400" />
          {field.placeholder || field.label}
        </span>
      ) : field.field_type === 'select' ? (
        <div className="flex h-9 w-full items-center justify-between rounded-sm border border-slate-300 bg-white px-3">
          <span className="text-[12px] text-neutral-400">
            {field.placeholder || `Select ${field.label}`}
          </span>
          <span className="text-[10px] text-neutral-500">▾</span>
        </div>
      ) : (
        <div className="flex h-9 w-full items-center rounded-sm border border-slate-300 bg-white px-3">
          <span className="text-[12px] text-neutral-400">
            {field.placeholder}
          </span>
        </div>
      )}

      {field.help_text && (
        <p className="text-[11px] text-neutral-500">{field.help_text}</p>
      )}
    </div>
  );
}

type FormPreviewProps = {
  form: FormDetail;
  fields: FormField[];
};

export default function FormPreview({ form, fields }: FormPreviewProps) {
  const visible = fields.filter((field) => field.is_active);

  return (
    <div className="flex w-full flex-col bg-[#f4f2f0]">
      {form.banner?.file_url && (
        /* The preview is scaled inside a transformed container, where
           next/image mis-sizes, so a plain img is used here. */
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={form.banner.file_url}
          alt={form.banner.alt_text || form.title}
          className="h-[180px] w-full object-cover"
        />
      )}

      <div className="flex w-full items-center justify-between border-y border-black/5 bg-white px-10 py-5">
        <p className="text-[20px] font-bold tracking-wide text-[#a4262c] uppercase">
          {form.title}
        </p>
        <p className="text-[12px] text-neutral-600">Home › {form.title}</p>
      </div>

      <div className="flex w-full items-start gap-6 px-10 py-8">
        <div className="flex flex-1 flex-col gap-5 border border-black/5 bg-white p-8">
          {/* Half-width fields pair up; full-width fields span the row. */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-5">
            {visible.map((field) => (
              <div
                key={field.id}
                className={field.width === 'half' ? 'col-span-1' : 'col-span-2'}
              >
                <PreviewField field={field} />
              </div>
            ))}
          </div>

          {visible.length === 0 && (
            <p className="text-[12px] text-neutral-500">
              Add a field to see the form take shape.
            </p>
          )}

          <div className="flex">
            <span className="rounded-sm bg-[#a4262c] px-6 py-2 text-[12px] text-white">
              {form.submit_label || 'Submit'}
            </span>
          </div>
        </div>

        {form.sidebar_cards.length > 0 && (
          <div className="flex w-[220px] shrink-0 flex-col gap-4">
            {form.sidebar_cards.map((card, index) => (
              <div
                key={index}
                className="flex flex-col border border-black/5 bg-white"
              >
                <p className="px-4 py-3 text-[13px] font-semibold text-neutral-800">
                  {card.title}
                </p>
                <div className="mx-4 mb-4 h-[130px] bg-slate-200" />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
