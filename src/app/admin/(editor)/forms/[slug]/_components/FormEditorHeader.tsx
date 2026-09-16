'use client';

import Link from 'next/link';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';

import { cn } from '@/lib/utils';

import { ADMIN_ROUTE } from '@/constants/admin';

import type { FormStatus } from '@/types/admin';

const statusStyles: Record<FormStatus, { label: string; className: string }> = {
  published: { label: 'Published', className: 'bg-[#ebfef6] text-[#059669]' },
  draft: { label: 'Draft', className: 'bg-[#edf2f7] text-[#65738a]' },
  archived: { label: 'Archived', className: 'bg-[#fef3f2] text-[#b42318]' },
};

type FormEditorHeaderProps = {
  slug: string;
  status: FormStatus;
  canPublish: boolean;
  isPublishing: boolean;
  onPublish: () => void;
};

export default function FormEditorHeader({
  slug,
  status,
  canPublish,
  isPublishing,
  onPublish,
}: FormEditorHeaderProps) {
  const badge = statusStyles[status] ?? statusStyles.draft;
  const isPublished = status === 'published';

  return (
    <header className="bg-white-alpha-80 sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <Link
          href={ADMIN_ROUTE.FORMS}
          className="text-paragraph-sm flex items-center gap-2 text-[#4f4f4f]"
        >
          <icon.arrowLeft className="size-4" />
          Forms
        </Link>
        <span
          className={cn(
            'text-paragraph-sm-medium flex items-center rounded-full px-3 py-1',
            badge.className,
          )}
        >
          {badge.label}
        </span>
      </div>

      <div className="flex items-center gap-3">
        <Link href={`${ADMIN_ROUTE.FORMS}/${slug}/submissions`}>
          <Button variant="secondary" size="large">
            <icon.fileText />
            Submissions
          </Button>
        </Link>
        <Button
          variant="primary"
          size="large"
          onClick={onPublish}
          // Editors cannot publish. Disabling here mirrors the backend's
          // forms.publish capability instead of letting the click 403.
          disabled={!canPublish || isPublishing || isPublished}
          title={canPublish ? undefined : 'Only an Admin can publish a form.'}
        >
          {isPublishing
            ? 'Publishing…'
            : isPublished
              ? 'Published'
              : 'Publish form'}
        </Button>
      </div>
    </header>
  );
}
