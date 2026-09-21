'use client';

import { useState } from 'react';

import Modal from '@/components/ui/modal/Modal';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

import {
  useCreateLocationType,
  useDeleteLocationType,
  useLocationTypes,
  useUpdateLocationType,
} from '@/hooks/api/admin/use-locations';

type LocationTypesModalProps = {
  open: boolean;
  onClose: () => void;
};

/**
 * Types are few and change rarely, so they live in a modal off the list
 * header rather than taking their own sidebar entry.
 */
export default function LocationTypesModal({
  open,
  onClose,
}: LocationTypesModalProps) {
  const { data: types = [] } = useLocationTypes();
  const createType = useCreateLocationType();
  const updateType = useUpdateLocationType();
  const deleteType = useDeleteLocationType();

  const [newLabel, setNewLabel] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function remove(slug: string, count: number) {
    setError(null);

    if (count > 0) {
      // The backend protects this, but saying so up front beats a 400.
      setError(
        `That type still has ${count} location${count === 1 ? '' : 's'}. Move or delete them first.`,
      );
      return;
    }

    try {
      await deleteType.mutateAsync(slug);
    } catch {
      setError('Could not delete that type.');
    }
  }

  return (
    <Modal isOpen onClose={onClose} title="Location types" className="max-w-md">
      <div className="flex w-full flex-col gap-3 px-5 py-4">
        <ul className="flex w-full flex-col gap-2">
          {types.map((type) => (
            <li key={type.slug} className="flex items-center gap-2">
              <Input
                variant="filled"
                size="small"
                defaultValue={type.label}
                onBlur={(event) => {
                  const label = event.target.value.trim();

                  if (label && label !== type.label) {
                    updateType.mutate({ slug: type.slug, payload: { label } });
                  }
                }}
              />
              <span className="w-20 shrink-0 text-[12px] text-neutral-700/68">
                {type.locations_count ?? 0} used
              </span>
              <button
                type="button"
                aria-label={`Delete ${type.label}`}
                onClick={() => remove(type.slug, type.locations_count ?? 0)}
                className="flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-red-500 transition-colors hover:text-red-700"
              >
                <icon.trash className="size-4" />
              </button>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2 border-t border-black/5 pt-3">
          <Input
            variant="default"
            size="small"
            placeholder="New type, e.g. Extension Counter"
            value={newLabel}
            onChange={(event) => setNewLabel(event.target.value)}
          />
          <Button
            type="button"
            variant="outline"
            size="small"
            disabled={!newLabel.trim() || createType.isPending}
            onClick={async () => {
              await createType.mutateAsync({ label: newLabel.trim() });
              setNewLabel('');
            }}
          >
            <icon.plus />
            Add
          </Button>
        </div>

        {error && (
          <p role="alert" className="text-[12px] text-red-600">
            {error}
          </p>
        )}

        <p className="text-[12px] text-neutral-700/68">
          Renaming a type updates it everywhere it appears on the website. Your
          locations stay linked to it, so nothing breaks.
        </p>
      </div>
    </Modal>
  );
}
