'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import type { FormDetail } from '@/types/admin';

type FormSettingsCardProps = {
  form: FormDetail;
  isSaving: boolean;
  onSave: (payload: {
    title: string;
    description: string;
    submit_label: string;
    success_message: string;
  }) => void;
};

export default function FormSettingsCard({
  form,
  isSaving,
  onSave,
}: FormSettingsCardProps) {
  // Keyed on the form slug by the parent, so a refetch never clobbers what
  // the user is currently typing.
  const [draft, setDraft] = useState({
    title: form.title,
    description: form.description,
    submit_label: form.submit_label,
    success_message: form.success_message,
  });

  return (
    <div className="flex w-full flex-col gap-4">
      <FieldLabel label="Form name">
        <Input
          variant="default"
          size="medium"
          value={draft.title}
          onChange={(event) =>
            setDraft((current) => ({ ...current, title: event.target.value }))
          }
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
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              description: event.target.value,
            }))
          }
        />
      </FieldLabel>

      <div className="flex w-full items-start gap-3">
        <FieldLabel label="Submit button text">
          <Input
            variant="default"
            size="medium"
            placeholder="Submit"
            value={draft.submit_label}
            onChange={(event) =>
              setDraft((current) => ({
                ...current,
                submit_label: event.target.value,
              }))
            }
          />
        </FieldLabel>
      </div>

      <FieldLabel label="Thank-you message">
        <Input
          variant="default"
          size="medium"
          placeholder="Your application has been submitted."
          value={draft.success_message}
          onChange={(event) =>
            setDraft((current) => ({
              ...current,
              success_message: event.target.value,
            }))
          }
        />
      </FieldLabel>

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
