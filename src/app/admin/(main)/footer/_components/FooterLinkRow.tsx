'use client';

import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { linkKey, useFooterDraft } from './FooterDraftContext';

import type { FooterLinkRead } from '@/types/admin';

type FooterLinkRowProps = {
  columnSlug: string;
  link: FooterLinkRead;
};

export default function FooterLinkRow({
  columnSlug,
  link,
}: FooterLinkRowProps) {
  const { draft, update } = useFooterDraft();

  const key = linkKey(columnSlug, link.slug);
  const staged = draft.links[key] ?? {};
  const isRemoved = draft.removedLinks.some(
    (removed) =>
      removed.columnSlug === columnSlug && removed.linkSlug === link.slug,
  );

  function setField(field: 'label' | 'href', value: string) {
    update((current) => ({
      ...current,
      links: {
        ...current.links,
        [key]: { ...current.links[key], [field]: value },
      },
    }));
  }

  function toggleRemoved() {
    update((current) => ({
      ...current,
      removedLinks: isRemoved
        ? current.removedLinks.filter(
            (removed) =>
              !(
                removed.columnSlug === columnSlug &&
                removed.linkSlug === link.slug
              ),
          )
        : [...current.removedLinks, { columnSlug, linkSlug: link.slug }],
    }));
  }

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        variant="filled"
        size="medium"
        aria-label="Link label"
        value={staged.label ?? link.label}
        disabled={isRemoved}
        onChange={(event) => setField('label', event.target.value)}
        className={isRemoved ? 'flex-1 line-through opacity-60' : 'flex-1'}
      />
      <Input
        variant="filled"
        size="medium"
        aria-label="Link URL"
        value={staged.href ?? link.href}
        disabled={isRemoved}
        onChange={(event) => setField('href', event.target.value)}
        className={isRemoved ? 'flex-1 line-through opacity-60' : 'flex-1'}
      />
      <button
        type="button"
        onClick={toggleRemoved}
        aria-label={isRemoved ? `Keep ${link.label}` : `Remove ${link.label}`}
        className="cursor-pointer p-1 text-slate-500 transition-colors hover:text-red-600"
      >
        {isRemoved ? (
          <span className="text-[12px] whitespace-nowrap">Undo</span>
        ) : (
          <icon.trash className="size-4" />
        )}
      </button>
    </div>
  );
}
