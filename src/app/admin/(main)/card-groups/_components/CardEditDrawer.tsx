'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Switch } from '@/components/admin/ui/switch';

import { usePages } from '@/hooks/api/admin/use-pages';
import {
  useCreateCard,
  useDeleteCard,
  useUpdateCard,
} from '@/hooks/api/admin/use-card-groups';

import type { CardWritePayload } from '@/api/services/admin/card-group.service';
import type { Card, CardScreen, SectionMedia } from '@/types/admin';

const LINK_TO_URL = '__url__';

type CardEditDrawerProps = {
  groupSlug: string;
  /** Null means the drawer is creating a new card. */
  card: Card | null;
  screens: CardScreen[];
  onClose: () => void;
};

export default function CardEditDrawer({
  groupSlug,
  card,
  screens,
  onClose,
}: CardEditDrawerProps) {
  const isNew = card === null;

  const { data: pagesData } = usePages();
  const createCard = useCreateCard(groupSlug);
  const updateCard = useUpdateCard(groupSlug);
  const deleteCard = useDeleteCard(groupSlug);

  const [image, setImage] = useState<SectionMedia | null>(
    card?.image?.file_url
      ? {
          src: card.image.file_url,
          alt: card.image.alt_text ?? '',
          media_id: card.image.id,
        }
      : null,
  );
  const [draft, setDraft] = useState<CardWritePayload>({
    title: card?.title ?? '',
    image: card?.image?.id ?? null,
    page: card?.page ?? null,
    href: card?.href ?? '',
    cta_label: card?.cta_label ?? '',
    screens: card?.screens ?? [],
    is_active: card?.is_active ?? true,
  });
  const [error, setError] = useState<string | null>(null);

  // A card links to a page or to a plain URL, never both at once.
  const [linkMode, setLinkMode] = useState(
    card?.page ? card.page : LINK_TO_URL,
  );

  const isSaving = createCard.isPending || updateCard.isPending;
  const hasTarget =
    linkMode !== LINK_TO_URL || (draft.href ?? '').trim() !== '';
  const canSave = draft.title.trim() !== '' && hasTarget;

  function set<K extends keyof CardWritePayload>(
    key: K,
    value: CardWritePayload[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function selectImage(media: SectionMedia) {
    if (media.media_id === undefined) return;

    setImage(media);
    set('image', media.media_id);
  }

  async function save() {
    setError(null);

    const payload: CardWritePayload = {
      ...draft,
      page: linkMode === LINK_TO_URL ? null : linkMode,
      href: linkMode === LINK_TO_URL ? draft.href : '',
    };

    try {
      if (isNew) {
        await createCard.mutateAsync(payload);
      } else {
        await updateCard.mutateAsync({ cardId: card.id, payload });
      }
      onClose();
    } catch {
      setError('Could not save this card. Please check the fields.');
    }
  }

  const pageOptions = [
    { label: 'A web address', value: LINK_TO_URL },
    ...(pagesData?.pages ?? []).map((page) => ({
      label: `${page.title} (${page.path})`,
      value: page.slug,
    })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="flex-1 cursor-default bg-black/20"
      />

      <aside className="flex h-full w-full max-w-[480px] flex-col gap-4 overflow-y-auto bg-white p-5 shadow-xl">
        <div className="flex items-center justify-between">
          <p className="text-paragraph-lg-bold text-neutral-900">
            {isNew ? 'Add card' : 'Edit card'}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="hover:bg-black-alpha-5 flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-500"
          >
            <icon.close className="size-4" />
          </button>
        </div>

        <FieldLabel label="Title">
          <Input
            variant="default"
            size="medium"
            placeholder="Loan Products"
            value={draft.title}
            onChange={(event) => set('title', event.target.value)}
          />
        </FieldLabel>

        <MediaField
          label="Image"
          media={image ?? undefined}
          onSelect={selectImage}
          onRemove={() => {
            setImage(null);
            set('image', null);
          }}
        />

        <FieldLabel label="Links to">
          <Select
            variant="filled"
            size="medium"
            options={pageOptions}
            value={linkMode}
            onValueChange={setLinkMode}
          />
        </FieldLabel>

        {linkMode === LINK_TO_URL ? (
          <FieldLabel label="Web address">
            <Input
              variant="default"
              size="medium"
              placeholder="https://example.com or #"
              value={draft.href ?? ''}
              onChange={(event) => set('href', event.target.value)}
            />
          </FieldLabel>
        ) : (
          <p className="rounded-lg bg-slate-50 px-3 py-2.5 text-[12px] text-neutral-700/68">
            The link follows this page. If the page URL changes later, this card
            keeps working.
          </p>
        )}

        <FieldLabel label="Button text">
          <Input
            variant="default"
            size="medium"
            placeholder="Explore more"
            value={draft.cta_label ?? ''}
            onChange={(event) => set('cta_label', event.target.value)}
          />
        </FieldLabel>

        <div className="flex w-full flex-col gap-2 border-t border-black/5 pt-4">
          <p className="text-[13px] text-neutral-900">Shown on</p>
          <p className="text-[12px] text-neutral-700/68">
            Tick nothing to show this card on every page.
          </p>
          <div className="grid grid-cols-2 gap-2">
            {screens.map((screen) => {
              const checked = (draft.screens ?? []).includes(screen.key);

              return (
                <label
                  key={screen.key}
                  className="flex cursor-pointer items-center gap-2 text-[13px] text-neutral-800"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() =>
                      set(
                        'screens',
                        checked
                          ? (draft.screens ?? []).filter(
                              (key) => key !== screen.key,
                            )
                          : [...(draft.screens ?? []), screen.key],
                      )
                    }
                  />
                  {screen.label}
                </label>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-4">
          <div className="flex flex-col">
            <p className="text-[13px] text-neutral-900">Show this card</p>
            <p className="text-[12px] text-neutral-700/68">
              Hidden cards stay here but disappear from the website.
            </p>
          </div>
          <Switch
            checked={draft.is_active ?? true}
            onCheckedChange={(checked) => set('is_active', checked)}
          />
        </div>

        {error && (
          <p role="alert" className="text-[12px] text-red-600">
            {error}
          </p>
        )}

        <div className="flex items-center justify-between gap-2 border-t border-black/5 pt-4">
          {!isNew ? (
            <Button
              type="button"
              variant="destructiveGhost"
              disabled={deleteCard.isPending}
              onClick={async () => {
                await deleteCard.mutateAsync(card.id);
                onClose();
              }}
            >
              <icon.trash />
              Delete
            </Button>
          ) : (
            <span />
          )}
          <div className="flex items-center gap-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="button"
              variant="primary"
              disabled={!canSave || isSaving}
              onClick={save}
            >
              {isSaving ? 'Saving…' : 'Save card'}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
