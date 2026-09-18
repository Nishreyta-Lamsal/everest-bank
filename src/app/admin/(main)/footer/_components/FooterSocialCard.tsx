'use client';

import { useState } from 'react';

import FooterSocialRow from './FooterSocialRow';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { useFooterDraft } from './FooterDraftContext';
import { useFooterSocialLinks } from '@/hooks/api/admin/use-footer';

export default function FooterSocialCard() {
  const [newLabel, setNewLabel] = useState('');
  const [newHref, setNewHref] = useState('');

  const { draft, update } = useFooterDraft();
  const { data: socialLinks, isPending, isError } = useFooterSocialLinks();

  const sorted = [...(socialLinks ?? [])].sort(
    (a, b) => (a.position ?? 0) - (b.position ?? 0),
  );

  function addSocialLink() {
    update((current) => ({
      ...current,
      newSocials: [
        ...current.newSocials,
        {
          label: newLabel,
          href: newHref,
          position: sorted.length + current.newSocials.length,
        },
      ],
    }));

    setNewLabel('');
    setNewHref('');
  }

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-semibold text-neutral-900">
            Social links
          </p>
          <p className="text-paragraph-sm text-neutral-700">
            The icon shown on the site is matched from the link&apos;s slug.
          </p>
        </div>

        {isPending && (
          <div className="h-[48px] w-full animate-pulse rounded-[6px] bg-slate-100" />
        )}

        {isError && (
          <p className="text-[14px] text-neutral-700 opacity-[0.72]">
            Could not load the social links.
          </p>
        )}

        {sorted.map((socialLink) => (
          <FooterSocialRow key={socialLink.id} socialLink={socialLink} />
        ))}

        {draft.newSocials.map((socialLink, index) => (
          <div
            key={`pending-social-${index}`}
            className="flex w-full items-center gap-2"
          >
            <Input
              variant="filled"
              size="medium"
              aria-label="New social label"
              value={socialLink.label}
              readOnly
              className="flex-1"
            />
            <Input
              variant="filled"
              size="medium"
              aria-label="New social URL"
              value={socialLink.href}
              readOnly
              className="flex-1"
            />
            <button
              type="button"
              onClick={() =>
                update((current) => ({
                  ...current,
                  newSocials: current.newSocials.filter((_, i) => i !== index),
                }))
              }
              aria-label={`Remove ${socialLink.label}`}
              className="cursor-pointer p-1 text-slate-500 transition-colors hover:text-red-600"
            >
              <icon.trash className="size-4" />
            </button>
          </div>
        ))}

        <div className="flex w-full items-center gap-2 border-t border-[#e6ecf4] pt-3">
          <Input
            variant="filled"
            size="medium"
            aria-label="New social label"
            placeholder="Facebook"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
            className="flex-1"
          />
          <Input
            variant="filled"
            size="medium"
            aria-label="New social URL"
            placeholder="https://facebook.com/…"
            value={newHref}
            onChange={(event) => setNewHref(event.target.value)}
            className="flex-1"
          />
          <Button
            variant="outline"
            size="small"
            disabled={!newLabel.trim() || !newHref.trim()}
            onClick={addSocialLink}
          >
            <icon.plus />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
}
