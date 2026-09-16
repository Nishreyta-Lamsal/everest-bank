import type { FormFieldType, OptionsSource } from '@/types/admin';

export const FIELD_TYPE_OPTIONS: { label: string; value: FormFieldType }[] = [
  { label: 'Short text', value: 'text' },
  { label: 'Long text', value: 'textarea' },
  { label: 'Email', value: 'email' },
  { label: 'Phone', value: 'tel' },
  { label: 'Number', value: 'number' },
  { label: 'Dropdown', value: 'select' },
  { label: 'Radio buttons', value: 'radio' },
  { label: 'Checkbox', value: 'checkbox' },
  { label: 'Date', value: 'date' },
];

export const OPTIONS_SOURCE_OPTIONS: { label: string; value: OptionsSource }[] =
  [
    { label: 'Custom list', value: 'static' },
    { label: 'Provinces (live)', value: 'provinces' },
    { label: 'Districts (live)', value: 'districts' },
    { label: 'Branches (live)', value: 'branches' },
  ];

export const WIDTH_OPTIONS = [
  { label: 'Full width', value: 'full' },
  { label: 'Half width', value: 'half' },
];

export const FIELD_TYPE_LABELS: Record<FormFieldType, string> =
  Object.fromEntries(
    FIELD_TYPE_OPTIONS.map((option) => [option.value, option.label]),
  ) as Record<FormFieldType, string>;
