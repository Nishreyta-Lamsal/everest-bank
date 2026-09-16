'use client';

import { useState } from 'react';

import Sidebar from '@/components/admin/layouts/sidebar/Sidebar';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import LivePreview from '../../../pages/[slug]/_components/LivePreview';
import FormEditorHeader from './FormEditorHeader';
import FormFieldRow from './FormFieldRow';
import FormFieldEditor from './FormFieldEditor';
import FormPreview from './FormPreview';
import FormSettingsCard from './FormSettingsCard';

import { useCapability } from '@/hooks/api/admin/use-auth';
import {
  useCreateFormField,
  useDeleteFormField,
  useForm,
  useFormFields,
  usePublishForm,
  useReorderFormFields,
  useUpdateForm,
  useUpdateFormField,
} from '@/hooks/api/admin/use-forms';

import type { FormFieldWritePayload } from '@/api/services/admin/form.service';

type FormEditorShellProps = {
  slug: string;
};

export default function FormEditorShell({ slug }: FormEditorShellProps) {
  const [selectedFieldId, setSelectedFieldId] = useState<number | null>(null);

  const { data: form, isPending, isError } = useForm(slug);
  const { data: fields = [] } = useFormFields(slug);

  const canPublish = useCapability('forms.publish');
  const publish = usePublishForm(slug);
  const updateForm = useUpdateForm(slug);
  const createField = useCreateFormField(slug);
  const updateField = useUpdateFormField(slug);
  const deleteField = useDeleteFormField(slug);
  const reorderFields = useReorderFormFields(slug);

  const selectedField = fields.find((field) => field.id === selectedFieldId);

  function move(index: number, direction: -1 | 1) {
    const next = [...fields];
    const target = index + direction;
    [next[index], next[target]] = [next[target], next[index]];
    reorderFields.mutate(next.map((field) => field.id));
  }

  async function addField() {
    const field = await createField.mutateAsync({
      label: `Field ${fields.length + 1}`,
      field_type: 'text',
    } satisfies FormFieldWritePayload);

    setSelectedFieldId(field.id);
  }

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <p className="text-paragraph-sm text-neutral-700/68">Loading form…</p>
      </div>
    );
  }

  if (isError || !form) {
    return (
      <div className="flex h-screen items-center justify-center bg-blue-50">
        <p className="text-paragraph-sm text-neutral-700/68">
          Could not load this form.
        </p>
      </div>
    );
  }

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-blue-50">
      <FormEditorHeader
        slug={slug}
        status={form.status}
        canPublish={canPublish}
        isPublishing={publish.isPending}
        onPublish={() => publish.mutate()}
      />

      <div className="flex min-h-0 flex-1">
        <Sidebar />
        <main className="flex min-h-0 min-w-0 flex-1 gap-4 p-4">
          <div className="flex min-w-0 flex-2 flex-col gap-4 overflow-y-auto">
            <Card className="flex w-full flex-col gap-6">
              <FormSettingsCard
                key={form.slug}
                form={form}
                isSaving={updateForm.isPending}
                onSave={(payload) => updateForm.mutate(payload)}
              />
            </Card>

            <Card className="flex w-full flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-paragraph-lg-bold text-neutral-900">
                  Fields
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="small"
                  onClick={addField}
                  disabled={createField.isPending}
                >
                  <icon.plus />
                  Add field
                </Button>
              </div>

              <div className="flex w-full flex-col gap-1">
                {fields.map((field, index) => (
                  <FormFieldRow
                    key={field.id}
                    field={field}
                    isSelected={field.id === selectedFieldId}
                    isFirst={index === 0}
                    isLast={index === fields.length - 1}
                    disabled={reorderFields.isPending}
                    onSelect={() => setSelectedFieldId(field.id)}
                    onMoveUp={() => move(index, -1)}
                    onMoveDown={() => move(index, 1)}
                  />
                ))}

                {fields.length === 0 && (
                  <p className="py-6 text-center text-[12px] text-neutral-700/68">
                    No fields yet. Add one to start building the form.
                  </p>
                )}
              </div>
            </Card>

            {selectedField && (
              <Card className="flex w-full flex-col gap-6">
                <FormFieldEditor
                  key={selectedField.id}
                  field={selectedField}
                  isSaving={updateField.isPending}
                  onSave={(payload) =>
                    updateField.mutate({
                      fieldId: selectedField.id,
                      payload,
                    })
                  }
                  onDelete={() => {
                    deleteField.mutate(selectedField.id);
                    setSelectedFieldId(null);
                  }}
                  onClose={() => setSelectedFieldId(null)}
                />
              </Card>
            )}
          </div>

          <div className="hidden min-h-0 w-[600px] shrink-0 xl:block">
            <LivePreview>
              <FormPreview form={form} fields={fields} />
            </LivePreview>
          </div>
        </main>
      </div>
    </div>
  );
}
