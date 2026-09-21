'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import { Button } from '@/components/admin/ui/button';
import { Drawer } from '@/components/admin/ui/drawer';
import { Input } from '@/components/admin/ui/input';
import { Switch } from '@/components/admin/ui/switch';

import {
  useCreateCard,
  useUpdateCard,
} from '@/hooks/api/admin/use-more-services';

import type { CardWritePayload } from '@/api/services/admin/more-service.service';
import type { Card, SectionMedia } from '@/types/admin';

type CardEditDrawerProps = {
  groupSlug: string;
  /** Null means the drawer is creating a new card. */
  card: Card | null;
  isOpen: boolean;
  onClose: () => void;
};

export default function CardEditDrawer({
  groupSlug,
  card,
  isOpen,
  onClose,
}: CardEditDrawerProps) {
  const isNew = card === null;

  const createCard = useCreateCard(groupSlug);
  const updateCard = useUpdateCard(groupSlug);

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

  const isSaving = createCard.isPending || updateCard.isPending;
  const canSave = draft.title.trim() !== '' && (draft.href ?? '').trim() !== '';

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
      page: null,
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

  return (
    <Drawer
      isOpen={isOpen}
      onClose={onClose}
      title={isNew ? 'Add card' : 'Edit card'}
      className="max-w-[480px]"
      footer={
        <>
          <Button
            type="button"
            variant="secondary"
            onClick={onClose}
            disabled={isSaving}
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="primary"
            disabled={!canSave || isSaving}
            onClick={save}
          >
            {isSaving ? 'Saving…' : isNew ? 'Create' : 'Save changes'}
          </Button>
        </>
      }
    >
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
        <Input
          variant="default"
          size="medium"
          placeholder="https://example.com or #"
          value={draft.href ?? ''}
          onChange={(event) => set('href', event.target.value)}
        />
      </FieldLabel>

      <FieldLabel label="Button text">
        <Input
          variant="default"
          size="medium"
          placeholder="Explore more"
          value={draft.cta_label ?? ''}
          onChange={(event) => set('cta_label', event.target.value)}
        />
      </FieldLabel>

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
    </Drawer>
  );
}
