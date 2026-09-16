'use client';

import SelectField from '@/components/ui/inputs/SelectField';
import TextField from '@/components/ui/inputs/TextField';
import Textarea from '@/components/ui/inputs/Textarea';

import { buildRules, filterOptions } from './validation';

import type { PublicFormField } from '@/api/services/form.service';
import type { UseFormRegister } from 'react-hook-form';

type FormValues = Record<string, unknown>;

type DynamicFormFieldProps = {
  field: PublicFormField;
  register: UseFormRegister<FormValues>;
  error?: string;
  values: FormValues;
};

/**
 * The shared field components size their own label. These forms need the small
 * uppercase label the design uses, so it is overridden here rather than by
 * changing a component the rest of the site shares.
 */
const LABEL_CLASSES =
  '[&>label]:text-[11px] [&>label]:font-semibold [&>label]:uppercase [&>label]:tracking-wide [&>label]:text-neutral-700';

/** Native input types that TextField can render directly. */
const TEXT_INPUT_TYPES: Record<string, string> = {
  text: 'text',
  email: 'email',
  tel: 'tel',
  number: 'number',
  date: 'date',
};

export default function DynamicFormField({
  field,
  register,
  error,
  values,
}: DynamicFormFieldProps) {
  const rules = buildRules(field);
  const label = field.is_required ? `${field.label} *` : field.label;

  if (field.field_type === 'textarea') {
    return (
      <Textarea
        // Textarea takes no variant prop, so the tinted row the other fields
        // get from variant="secondary" is applied directly here.
        className={`${LABEL_CLASSES} [&>div]:bg-grey-bluish-grey [&>div]:rounded-[4px]`}
        label={label}
        hint={field.help_text || undefined}
        error={error}
        placeholder={field.placeholder}
        {...register(field.name, rules)}
      />
    );
  }

  if (field.field_type === 'select') {
    const options = filterOptions(field, values);

    return (
      <SelectField
        variant="secondary"
        className={LABEL_CLASSES}
        label={label}
        hint={field.help_text || undefined}
        error={error}
        options={options}
        placeholder={field.placeholder || `Select ${field.label}`}
        {...register(field.name, rules)}
      />
    );
  }

  if (field.field_type === 'radio') {
    const options = filterOptions(field, values);

    return (
      <fieldset className="flex flex-col gap-2">
        <legend className="text-[11px] font-semibold tracking-wide text-neutral-700 uppercase">
          {label}
        </legend>
        {options.map((option) => (
          <label
            key={option.value}
            className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800"
          >
            {/* aria-invalid is not valid on role=radio; the group's error
                message below carries the state instead. */}
            <input
              type="radio"
              value={option.value}
              {...register(field.name, rules)}
            />
            {option.label}
          </label>
        ))}
        {field.help_text && (
          <p className="text-xs text-neutral-600">{field.help_text}</p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </fieldset>
    );
  }

  if (field.field_type === 'checkbox') {
    return (
      <div className="flex flex-col gap-1">
        <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-800">
          <input
            type="checkbox"
            aria-invalid={Boolean(error)}
            {...register(field.name, rules)}
          />
          {label}
        </label>
        {field.help_text && (
          <p className="text-xs text-neutral-600">{field.help_text}</p>
        )}
        {error && <p className="text-xs text-red-600">{error}</p>}
      </div>
    );
  }

  return (
    <TextField
      variant="secondary"
      className={LABEL_CLASSES}
      label={label}
      hint={field.help_text || undefined}
      error={error}
      type={TEXT_INPUT_TYPES[field.field_type] ?? 'text'}
      placeholder={field.placeholder}
      {...register(field.name, rules)}
    />
  );
}
