'use client';

import { useState } from 'react';

import Modal from '@/components/ui/modal/Modal';
import { icon } from '@/components/icons';

import type { CalendarRead } from '@/api/services/calendar.service';

type CalendarProps = {
  label: string;
  calendar: CalendarRead | null;
};

export default function Calendar({ label, calendar }: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!calendar) return null;
  if (!calendar.file_url) return null;

  const embedUrl = `${calendar.file_url}#toolbar=0&navpanes=1`;
  const displayLabel = `${label} ${calendar.year}`;

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-body-4-desktop flex cursor-pointer items-center gap-1 rounded py-2 text-red-500 transition-colors hover:text-red-600"
      >
        <icon.calendar className="size-[16px] shrink-0" />
        {displayLabel}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={displayLabel}
        className="h-[90vh]"
      >
        <iframe src={embedUrl} title={displayLabel} className="w-full flex-1" />
        <div className="border-grey-50 flex justify-end border-t px-6 py-3">
          <a
            href={calendar.file_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-body-4-desktop-md flex items-center gap-1 text-red-500 transition-colors hover:text-red-600"
          >
            Open in new tab
            <icon.arrowUpRight className="size-[16px] shrink-0" />
          </a>
        </div>
      </Modal>
    </>
  );
}
