'use client';

import { useState } from 'react';

import ActionMenu from '@/components/admin/shared/ActionMenu';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';

import { useDeletePage } from '@/hooks/api/admin/use-pages';

import { readApiError } from '@/lib/admin/read-api-error';

import type { Page } from '@/types/admin';

type ProductActionsProps = {
  page: Page;
};

export default function ProductActions({ page }: ProductActionsProps) {
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deletePage = useDeletePage(page.slug);

  return (
    <>
      <ActionMenu
        label={`Actions for ${page.title}`}
        items={[
          {
            label: 'Delete',
            iconKey: 'trash',
            onSelect: () => setIsDeleteOpen(true),
            isDestructive: true,
          },
        ]}
      />

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deletePage.reset();
        }}
        onConfirm={() =>
          deletePage.mutate(undefined, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete this product?"
        description={
          <>
            <span className="font-medium text-neutral-900">{page.title}</span>
            {' and all of its sections will be permanently removed. This' +
              ' cannot be undone.'}
          </>
        }
        isPending={deletePage.isPending}
        error={
          deletePage.isError
            ? readApiError(deletePage.error, 'Could not delete this product.')
            : undefined
        }
      />
    </>
  );
}
