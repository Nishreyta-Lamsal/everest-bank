'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import type { FormDetail } from '@/types/admin';

export type FormSettingsDraft = {
  title: string;
  description: string;
  submit_label: string;
  success_message: string;
};

type FormSettingsCardProps = {
  form: FormDetail;
  isSaving: boolean;
  onSave: (payload: FormSettingsDraft) => void;
  /** Fires on every keystroke so the preview can follow along, debounced. */
  onDraftChange: (draft: FormSettingsDraft) => void;
};

export default function FormSettingsCard({
  form,
  isSaving,
  onSave,
  onDraftChange,
}: FormSettingsCardProps) {
  // Keyed on the form slug by the parent, so a refetch never clobbers what
  // the user is currently typing.
  const [draft, setDraft] = useState<FormSettingsDraft>({
    title: form.title,
    description: form.description,
    submit_label: form.submit_label,
    success_message: form.success_message,
  });

  function update(patch: Partial<FormSettingsDraft>) {
    const next = { ...draft, ...patch };

    setDraft(next);
    onDraftChange(next);
  }

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldLabel label="Form title">
        <Input
          variant="default"
          size="medium"
          value={draft.title}
          onChange={(event) => update({ title: event.target.value })}
        />
      </FieldLabel>

      <FieldLabel label="URL">
        <div className="flex w-full items-center gap-2 rounded-lg bg-slate-50 px-3 py-2.5">
          <p className="text-[12px] text-neutral-700/68">everestbankltd.com/</p>
          <p className="text-[12px] text-neutral-900">{form.slug}</p>
        </div>
      </FieldLabel>

      <FieldLabel label="Description">
        <Textarea
          rows={2}
          value={draft.description}
          onChange={(event) => update({ description: event.target.value })}
        />
      </FieldLabel>

      <div className="flex w-full items-start gap-3">
        <FieldLabel label="Submit button label">
          <Input
            variant="default"
            size="medium"
            placeholder="Submit"
            value={draft.submit_label}
            onChange={(event) => update({ submit_label: event.target.value })}
          />
        </FieldLabel>
      </div>

      <div className="flex justify-end">
        <Button
          type="button"
          variant="outline"
          onClick={() => onSave(draft)}
          disabled={isSaving}
        >
          {isSaving ? 'Saving…' : 'Save settings'}
        </Button>
      </div>
    </div>
  );
}
