'use client';

import Link from 'next/link';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { usePageEditor } from '@/store/PageEditorContext';

type PageEditorHeaderProps = {
  pageName: string;
  backHref: string;
  domainLabel: string;
  domainHref: string;
};

export default function PageEditorHeader({
  pageName,
  backHref,
  domainLabel,
  domainHref,
}: PageEditorHeaderProps) {
  const { publish, isPublishing, canPublish } = usePageEditor();

  return (
    <header className="bg-white-alpha-80 sticky top-0 z-10 flex items-center justify-between px-4 py-2.5 backdrop-blur-sm">
      <div className="flex items-center gap-6">
        <Link
          href={backHref}
          className="text-paragraph-sm flex items-center gap-2 text-[#4f4f4f]"
        >
          <icon.arrowLeft className="size-4" />
          {pageName}
        </Link>
        <a
          href={domainHref}
          target="_blank"
          rel="noopener noreferrer"
          className="text-paragraph-sm flex items-center gap-1 text-[#4f4f4f] opacity-60"
        >
          {domainLabel}
          <icon.openLink className="size-2" />
        </a>
      </div>
      <div className="flex items-center gap-3">
        <Button
          variant="primary"
          size="large"
          onClick={publish}
          disabled={!canPublish || isPublishing}
        >
          {isPublishing ? 'Publishing…' : 'Publish Changes'}
        </Button>
      </div>
    </header>
  );
}
