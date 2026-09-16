'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentBreadcrumbsContent, PageSectionRead } from '@/types/admin';

type ContentBreadcrumbsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type Crumb = NonNullable<ContentBreadcrumbsContent['items']>[number];

export default function ContentBreadcrumbsEditor({
  slug,
  section,
}: ContentBreadcrumbsEditorProps) {
  const content = localizedContent<ContentBreadcrumbsContent>(section.content);

  const [items, setItems] = useState<Crumb[]>(content.items ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentBreadcrumbsContent>(slug, section, () => ({
      items,
    }));

  function updateItem(index: number, next: Crumb) {
    setItems(items.map((item, i) => (i === index ? next : item)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="The trail of links shown above the page content"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {items.map((item, index) => {
        // The last crumb is the current page, so it carries no link.
        const isLast = index === items.length - 1;

        return (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Crumb {index + 1}
              {isLast ? ' · current page' : ''}
            </p>

            <FieldLabel label="Label">
              <Input
                variant="filled"
                size="medium"
                value={item.label ?? ''}
                onChange={(event) =>
                  updateItem(index, { ...item, label: event.target.value })
                }
              />
            </FieldLabel>

            {!isLast && (
              <FieldLabel label="Links to">
                <LinkTargetSelect
                  value={item.href ?? ''}
                  onChange={(href) => updateItem(index, { ...item, href })}
                />
              </FieldLabel>
            )}
          </div>
        );
      })}
    </SectionEditorShell>
  );
}
