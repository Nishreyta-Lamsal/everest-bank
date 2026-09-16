'use client';

import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import Modal from '@/components/ui/modal/Modal';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { useCreateForm } from '@/hooks/api/admin/use-forms';

import { ADMIN_ROUTE } from '@/constants/admin';

type NewFormValues = {
  title: string;
  description: string;
};

type NewFormDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function NewFormDialog({
  open,
  onOpenChange,
}: NewFormDialogProps) {
  const router = useRouter();
  const createForm = useCreateForm();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewFormValues>({
    defaultValues: { title: '', description: '' },
  });

  function close() {
    reset();
    createForm.reset();
    onOpenChange(false);
  }

  const onSubmit = handleSubmit(async (values) => {
    // Created as a draft. The slug comes from the title and is frozen after
    // this, so the form never moves URL when it is later renamed.
    const form = await createForm.mutateAsync({
      title: values.title,
      description: values.description,
    });

    close();
    router.push(`${ADMIN_ROUTE.FORMS}/${form.slug}`);
  });

  return (
    <Modal isOpen={open} onClose={close} title="New form" className="max-w-md">
      <form onSubmit={onSubmit} className="flex w-full flex-col gap-4">
        <FieldLabel label="Form name">
          <Input
            variant="default"
            size="medium"
            placeholder="Apply for Card"
            aria-invalid={Boolean(errors.title)}
            {...register('title', { required: 'Give the form a name.' })}
          />
          {errors.title && (
            <p className="text-[12px] text-red-600">{errors.title.message}</p>
          )}
        </FieldLabel>

        <FieldLabel label="Description (optional)">
          <Textarea
            rows={3}
            placeholder="Shown under the form title on the public page."
            {...register('description')}
          />
        </FieldLabel>

        {createForm.isError && (
          <p className="text-[12px] text-red-600">
            Could not create the form. Please try again.
          </p>
        )}

        <div className="flex items-center justify-end gap-2">
          <Button type="button" variant="outline" onClick={close}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            disabled={createForm.isPending}
          >
            {createForm.isPending ? 'Creating…' : 'Create draft'}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
