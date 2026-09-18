'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentSidebarContent, PageSectionRead } from '@/types/admin';

type ContentSidebarEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type SocialLink = NonNullable<ContentSidebarContent['social_links']>[number];
type RelatedPage = NonNullable<ContentSidebarContent['related_pages']>[number];

export default function ContentSidebarEditor({
  slug,
  section,
}: ContentSidebarEditorProps) {
  const content = localizedContent<ContentSidebarContent>(section.content);

  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    content.social_links ?? [],
  );
  const [relatedPages, setRelatedPages] = useState<RelatedPage[]>(
    content.related_pages ?? [],
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentSidebarContent>(slug, section, () => ({
      social_links: socialLinks,
      related_pages: relatedPages,
    }));

  function updateSocialLink(index: number, next: SocialLink) {
    setSocialLinks(socialLinks.map((link, i) => (i === index ? next : link)));
  }

  function updateRelatedPage(index: number, next: RelatedPage) {
    setRelatedPages(relatedPages.map((page, i) => (i === index ? next : page)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="The social links and related pages listed beside the content"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Social links
        </p>

        {socialLinks.map((link, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Link {index + 1}
              {link.label ? ` · ${link.label}` : ''}
            </p>

            <FieldLabel label="Label">
              <Input
                variant="filled"
                size="medium"
                value={link.label ?? ''}
                onChange={(event) =>
                  updateSocialLink(index, {
                    ...link,
                    label: event.target.value,
                  })
                }
              />
            </FieldLabel>

            <FieldLabel label="Links to">
              <Input
                variant="filled"
                size="medium"
                placeholder="https://"
                value={link.href ?? ''}
                onChange={(event) =>
                  updateSocialLink(index, { ...link, href: event.target.value })
                }
              />
            </FieldLabel>
          </div>
        ))}
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Related pages
        </p>

        {relatedPages.map((page, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Page {index + 1}
              {page.title ? ` · ${page.title}` : ''}
            </p>

            <FieldLabel label="Title">
              <Input
                variant="filled"
                size="medium"
                value={page.title ?? ''}
                onChange={(event) =>
                  updateRelatedPage(index, {
                    ...page,
                    title: event.target.value,
                  })
                }
              />
            </FieldLabel>

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={page.href ?? ''}
                onChange={(href) => updateRelatedPage(index, { ...page, href })}
              />
            </FieldLabel>
          </div>
        ))}
      </div>
    </SectionEditorShell>
  );
}
