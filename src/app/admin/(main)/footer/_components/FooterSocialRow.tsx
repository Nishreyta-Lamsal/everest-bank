'use client';

import { Input } from '@/components/admin/ui/input';
import { icon } from '@/components/admin/icons';

import { useFooterDraft } from './FooterDraftContext';

import type { FooterSocialLinkRead } from '@/types/admin';

type FooterSocialRowProps = {
  socialLink: FooterSocialLinkRead;
};

export default function FooterSocialRow({ socialLink }: FooterSocialRowProps) {
  const { draft, update } = useFooterDraft();

  const staged = draft.socials[socialLink.slug] ?? {};
  const isRemoved = draft.removedSocials.includes(socialLink.slug);

  function setField(field: 'label' | 'href', value: string) {
    update((current) => ({
      ...current,
      socials: {
        ...current.socials,
        [socialLink.slug]: {
          ...current.socials[socialLink.slug],
          [field]: value,
        },
      },
    }));
  }

  function toggleRemoved() {
    update((current) => ({
      ...current,
      removedSocials: isRemoved
        ? current.removedSocials.filter((slug) => slug !== socialLink.slug)
        : [...current.removedSocials, socialLink.slug],
    }));
  }

  return (
    <div className="flex w-full items-center gap-2">
      <Input
        variant="filled"
        size="medium"
        aria-label="Social label"
        value={staged.label ?? socialLink.label}
        disabled={isRemoved}
        onChange={(event) => setField('label', event.target.value)}
        className={isRemoved ? 'flex-1 line-through opacity-60' : 'flex-1'}
      />
      <Input
        variant="filled"
        size="medium"
        aria-label="Social URL"
        value={staged.href ?? socialLink.href}
        disabled={isRemoved}
        onChange={(event) => setField('href', event.target.value)}
        className={isRemoved ? 'flex-1 line-through opacity-60' : 'flex-1'}
      />
      <button
        type="button"
        onClick={toggleRemoved}
        aria-label={
          isRemoved ? `Keep ${socialLink.label}` : `Remove ${socialLink.label}`
        }
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
