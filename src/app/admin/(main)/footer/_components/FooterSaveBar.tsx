'use client';

import { useState } from 'react';

import { Button } from '@/components/admin/ui/button';

import { useFooterDraft } from './FooterDraftContext';
import { footerAdminService } from '@/api/services/admin/footer.service';
import { readApiError } from '@/lib/admin/read-api-error';

import { useQueryClient } from '@tanstack/react-query';

export default function FooterSaveBar() {
  const { draft, reset, hasChanges } = useFooterDraft();
  const queryClient = useQueryClient();

  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<unknown>(null);

  async function save() {
    setIsSaving(true);
    setError(null);

    try {
      // Removals first, so a slug freed here can be reused by a new item.
      for (const slug of draft.removedColumns) {
        await footerAdminService.removeColumn(slug);
      }

      for (const { columnSlug, linkSlug } of draft.removedLinks) {
        // Skip links whose whole column is going anyway.
        if (draft.removedColumns.includes(columnSlug)) continue;

        await footerAdminService.removeLink(columnSlug, linkSlug);
      }

      for (const slug of draft.removedSocials) {
        await footerAdminService.removeSocialLink(slug);
      }

      for (const [slug, payload] of Object.entries(draft.columns)) {
        if (draft.removedColumns.includes(slug)) continue;

        await footerAdminService.updateColumn(slug, payload);
      }

      for (const [key, payload] of Object.entries(draft.links)) {
        const [columnSlug, linkSlug] = key.split('/');

        if (draft.removedColumns.includes(columnSlug)) continue;

        await footerAdminService.updateLink(columnSlug, linkSlug, payload);
      }

      for (const [slug, payload] of Object.entries(draft.socials)) {
        if (draft.removedSocials.includes(slug)) continue;

        await footerAdminService.updateSocialLink(slug, payload);
      }

      for (const payload of draft.newColumns) {
        await footerAdminService.createColumn(payload);
      }

      for (const { columnSlug, payload } of draft.newLinks) {
        await footerAdminService.createLink(columnSlug, payload);
      }

      for (const payload of draft.newSocials) {
        await footerAdminService.createSocialLink(payload);
      }

      if (Object.keys(draft.settings).length > 0) {
        await footerAdminService.updateSettings(draft.settings);
      }

      await queryClient.invalidateQueries({ queryKey: ['footer-admin'] });
      reset();
    } catch (caught) {
      setError(caught);
    } finally {
      setIsSaving(false);
    }
  }

  if (!hasChanges) return null;

  return (
    <div className="bg-white-alpha-70 sticky bottom-4 z-40 w-full rounded-lg border border-white p-3 shadow-sm backdrop-blur-xs">
      <div className="flex w-full flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col gap-0.5">
          <p className="text-paragraph-sm-medium text-neutral-900">
            You have unsaved changes
          </p>
          {Boolean(error) && (
            <p className="text-paragraph-mini text-red-600">
              {readApiError(error, 'Could not save the footer.')}
            </p>
          )}
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="large"
            disabled={isSaving}
            onClick={reset}
          >
            Discard
          </Button>
          <Button
            variant="primary"
            size="large"
            disabled={isSaving}
            onClick={save}
          >
            {isSaving ? 'Saving…' : 'Save changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
