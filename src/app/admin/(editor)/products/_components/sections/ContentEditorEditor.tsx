'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import RichTextEditor from '@/components/admin/shared/RichTextEditor';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  ContentEditorContent,
  ContentImagesBlock,
  ContentTextBlock,
  PageSectionRead,
} from '@/types/admin';

type ContentEditorEditorProps = {
  slug: string;
  section: PageSectionRead;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

/**
 * Some pages were saved before this section type moved to a single
 * rich-text field, and still carry the old headed-paragraphs-plus-images
 * shape. Flatten that into one HTML document so existing content still
 * shows up in the editor instead of looking empty.
 */
function legacyBlocksToHtml(
  blocks: (ContentTextBlock | ContentImagesBlock)[],
): string {
  return blocks
    .map((block) => {
      if (block.type === 'images') {
        return block.images
          .map(
            (image) =>
              `<img src="${escapeHtml(image.src)}" alt="${escapeHtml(image.alt ?? '')}">`,
          )
          .join('');
      }

      const heading = block.heading
        ? `<h2>${escapeHtml(block.heading)}</h2>`
        : '';
      const paragraphs = (block.paragraphs ?? [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join('');

      return heading + paragraphs;
    })
    .join('');
}

export default function ContentEditorEditor({
  slug,
  section,
}: ContentEditorEditorProps) {
  const content = localizedContent<ContentEditorContent>(section.content);

  const [body, setBody] = useState(
    content.body ?? legacyBlocksToHtml(content.blocks ?? []),
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentEditorContent>(slug, section, () => ({ body }));

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The rich-text body for this section"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Body">
        <RichTextEditor
          value={body}
          onChange={setBody}
          placeholder="Write the section body…"
        />
      </FieldLabel>
    </SectionEditorShell>
  );
}
