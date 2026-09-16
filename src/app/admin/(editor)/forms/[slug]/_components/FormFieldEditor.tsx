'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Switch } from '@/components/admin/ui/switch';
import OptionListEditor from './OptionListEditor';

import {
  FIELD_TYPE_OPTIONS,
  OPTIONS_SOURCE_OPTIONS,
  WIDTH_OPTIONS,
} from './field-options';

import type { FormFieldWritePayload } from '@/api/services/admin/form.service';
import type {
  FieldWidth,
  FormField,
  FormFieldType,
  OptionsSource,
} from '@/types/admin';

const CHOICE_TYPES: FormFieldType[] = ['select', 'radio'];

type FormFieldEditorProps = {
  field: FormField;
  isSaving: boolean;
  onSave: (payload: Partial<FormFieldWritePayload>) => void;
  onDelete: () => void;
  onClose: () => void;
  /** Fires on every edit so the preview can show the field before it saves. */
  onDraftChange: (field: FormField) => void;
};

export default function FormFieldEditor({
  field,
  isSaving,
  onSave,
  onDelete,
  onClose,
  onDraftChange,
}: FormFieldEditorProps) {
  // The parent keys this component on the field id, so selecting a different
  // field remounts it and these initial values are always the right ones.
  const [draft, setDraft] = useState(field);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const isChoice = CHOICE_TYPES.includes(draft.field_type);
  const isDynamic = draft.options_source !== 'static';

  function set<K extends keyof FormField>(key: K, value: FormField[K]) {
    const next = { ...draft, [key]: value };

    setDraft(next);
    onDraftChange(next);
  }

  function save() {
    onSave({
      label: draft.label,
      field_type: draft.field_type,
      is_required: draft.is_required,
      placeholder: draft.placeholder,
      help_text: draft.help_text,
      width: draft.width,
      is_active: draft.is_active,
      options_source: draft.options_source,
      // A live source ignores the stored list, so do not send a stale one.
      options: isChoice && !isDynamic ? draft.options : [],
      validation: draft.validation,
    });
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="text-paragraph-lg-bold text-neutral-900">Edit field</p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close field editor"
          className="hover:bg-black-alpha-5 flex size-7 cursor-pointer items-center justify-center rounded-lg text-slate-500"
        >
          <icon.close className="size-4" />
        </button>
      </div>

      <FieldLabel label="Label">
        <Input
          variant="default"
          size="medium"
          placeholder="Monthly income"
          value={draft.label}
          onChange={(event) => set('label', event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full items-start gap-3">
        <FieldLabel label="Type">
          <Select
            variant="filled"
            size="medium"
            options={FIELD_TYPE_OPTIONS}
            value={draft.field_type}
            onValueChange={(value) => set('field_type', value as FormFieldType)}
          />
        </FieldLabel>
        <FieldLabel label="Width">
          <Select
            variant="filled"
            size="medium"
            options={WIDTH_OPTIONS}
            value={draft.width}
            onValueChange={(value) => set('width', value as FieldWidth)}
          />
        </FieldLabel>
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <p className="text-[13px] text-neutral-900">Required</p>
          <p className="text-[12px] text-neutral-700/68">
            The visitor cannot submit without answering.
          </p>
        </div>
        <Switch
          checked={draft.is_required}
          onCheckedChange={(checked) => set('is_required', checked)}
        />
      </div>

      <div className="flex items-center justify-between gap-3">
        <div className="flex flex-col">
          <p className="text-[13px] text-neutral-900">Shown on the site</p>
          <p className="text-[12px] text-neutral-700/68">
            Hiding keeps past answers readable.
          </p>
        </div>
        <Switch
          checked={draft.is_active}
          onCheckedChange={(checked) => set('is_active', checked)}
        />
      </div>

      <FieldLabel label="Placeholder">
        <Input
          variant="default"
          size="medium"
          placeholder="e.g. NPR 25,000 or above"
          value={draft.placeholder}
          onChange={(event) => set('placeholder', event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Helper text">
        <Input
          variant="default"
          size="medium"
          placeholder="Shown under the input"
          value={draft.help_text}
          onChange={(event) => set('help_text', event.target.value)}
        />
      </FieldLabel>

      {isChoice && (
        <>
          <FieldLabel label="Choices come from">
            <Select
              variant="filled"
              size="medium"
              options={OPTIONS_SOURCE_OPTIONS}
              value={draft.options_source}
              onValueChange={(value) =>
                set('options_source', value as OptionsSource)
              }
            />
          </FieldLabel>

          {isDynamic ? (
            <div className="flex flex-col gap-1 rounded-lg bg-slate-50 px-3 py-2.5">
              <p className="text-[12px] text-neutral-900">
                {field.resolved_options.length} option
                {field.resolved_options.length === 1 ? '' : 's'} from bank data
              </p>
              <p className="text-[12px] text-neutral-700/68">
                Kept up to date automatically. Save to refresh this preview.
              </p>
            </div>
          ) : (
            <FieldLabel label="Options">
              <OptionListEditor
                options={draft.options}
                onChange={(options) => set('options', options)}
              />
            </FieldLabel>
          )}
        </>
      )}

      <div className="flex w-full flex-col gap-3 border-t border-black/5 pt-3">
        <button
          type="button"
          onClick={() => setAdvancedOpen((open) => !open)}
          className="flex cursor-pointer items-center gap-1.5 text-[13px] text-neutral-700"
        >
          <icon.chevronDown
            className={`size-3.5 transition-transform ${advancedOpen ? 'rotate-180' : ''}`}
          />
          Advanced
        </button>

        {advancedOpen && (
          <div className="flex w-full flex-col gap-3">
            <div className="flex w-full items-start gap-3">
              <FieldLabel label="Min length">
                <Input
                  variant="filled"
                  size="small"
                  type="number"
                  value={draft.validation.min_length ?? ''}
                  onChange={(event) =>
                    set('validation', {
                      ...draft.validation,
                      min_length: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                />
              </FieldLabel>
              <FieldLabel label="Max length">
                <Input
                  variant="filled"
                  size="small"
                  type="number"
                  value={draft.validation.max_length ?? ''}
                  onChange={(event) =>
                    set('validation', {
                      ...draft.validation,
                      max_length: event.target.value
                        ? Number(event.target.value)
                        : undefined,
                    })
                  }
                />
              </FieldLabel>
            </div>
            <FieldLabel label="Pattern (regular expression)">
              <Input
                variant="filled"
                size="small"
                placeholder="^9\d{9}$"
                value={draft.validation.pattern ?? ''}
                onChange={(event) =>
                  set('validation', {
                    ...draft.validation,
                    pattern: event.target.value || undefined,
                  })
                }
              />
            </FieldLabel>
            <p className="text-[12px] text-neutral-700/68">
              Field key: <code>{draft.name}</code>. Past answers are stored
              against it, so it cannot be changed.
            </p>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-black/5 pt-3">
        <Button type="button" variant="destructiveGhost" onClick={onDelete}>
          <icon.trash />
          Delete
        </Button>
        <Button
          type="button"
          variant="primary"
          onClick={save}
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save field'}
        </Button>
      </div>
    </div>
  );
}
