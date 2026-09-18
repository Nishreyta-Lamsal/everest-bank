'use client';

import { useState } from 'react';

import Modal from '@/components/ui/modal/Modal';
import { icon } from '@/components/icons';

const CALENDAR_PDF_URL = '/docs/EBL-E-Calendar-2083.pdf';
const CALENDAR_PDF_EMBED_URL = `${CALENDAR_PDF_URL}#toolbar=0&navpanes=1`;

type CalendarProps = {
  label: string;
};

export default function Calendar({ label }: CalendarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="text-body-4-desktop flex cursor-pointer items-center gap-1 rounded py-2 text-red-500 transition-colors hover:text-red-600"
      >
        <icon.calendar className="size-[16px] shrink-0" />
        {label}
      </button>
      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title={label}
        className="h-[90vh]"
      >
        <iframe
          src={CALENDAR_PDF_EMBED_URL}
          title={label}
          className="w-full flex-1"
        />
        <div className="border-grey-50 flex justify-end border-t px-6 py-3">
          <a
            href={CALENDAR_PDF_URL}
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
