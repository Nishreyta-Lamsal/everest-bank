'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import NewFormDialog from './NewFormDialog';

export default function FormsHeader() {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <section className="flex w-full items-center justify-between">
      <div className="flex flex-col gap-1">
        <p className="text-heading-3 text-neutral-900">Forms</p>
        <p className="text-paragraph-sm text-neutral-700">
          Application and enquiry forms shown on the website, and the
          submissions they collect.
        </p>
      </div>
      <Button variant="primary" onClick={() => setDialogOpen(true)}>
        <icon.plus />
        Add new form
      </Button>
      <NewFormDialog open={dialogOpen} onOpenChange={setDialogOpen} />
    </section>
  );
}
