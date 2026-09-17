'use client';

import { useState } from 'react';

import AddMediaDrawer from './AddMediaDrawer';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

export default function AssetsHeader() {
  const [isAddOpen, setIsAddOpen] = useState(false);

  return (
    <>
      <section className="flex w-full flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-heading-3 text-neutral-900">Media Library</p>
          <p className="text-paragraph-sm text-neutral-700">
            Every image, video and document on the website in one place.
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => setIsAddOpen(true)}
        >
          <icon.plus />
          Add new media
        </Button>
      </section>

      {isAddOpen && (
        <AddMediaDrawer
          isOpen={isAddOpen}
          onClose={() => setIsAddOpen(false)}
        />
      )}
    </>
  );
}
