'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { Switch } from '@/components/admin/ui/switch';
import { Textarea } from '@/components/admin/ui/textarea';

import {
  useCreateLocation,
  useDeleteLocation,
  useDistricts,
  useLocationTypes,
  useUpdateLocation,
} from '@/hooks/api/admin/use-locations';

import type { LocationWritePayload } from '@/api/services/admin/location.service';
import type { Location } from '@/types/admin';

type LocationEditDrawerProps = {
  /** Null means the drawer is creating a new location. */
  location: Location | null;
  defaultTypeSlug?: string;
  onClose: () => void;
};

export default function LocationEditDrawer({
  location,
  defaultTypeSlug,
  onClose,
}: LocationEditDrawerProps) {
  const isNew = location === null;

  const { data: types = [] } = useLocationTypes();
  const { data: districts = [] } = useDistricts();
  const createLocation = useCreateLocation();
  const updateLocation = useUpdateLocation();
  const deleteLocation = useDeleteLocation();

  const [draft, setDraft] = useState<LocationWritePayload>({
    name: location?.name ?? '',
    location_type:
      location?.location_type.slug ??
      (defaultTypeSlug && defaultTypeSlug !== 'all' ? defaultTypeSlug : ''),
    district: location?.district.slug ?? '',
    address: location?.address ?? '',
    phone: location?.phone ?? '',
    hours: location?.hours ?? '',
    map_embed_url: location?.map_embed_url ?? '',
    services: location?.services ?? [],
    is_active: location?.is_active ?? true,
  });
  const [error, setError] = useState<string | null>(null);

  const isSaving = createLocation.isPending || updateLocation.isPending;
  const canSave =
    draft.name.trim() !== '' &&
    draft.location_type !== '' &&
    draft.district !== '' &&
    draft.address.trim() !== '';

  function set<K extends keyof LocationWritePayload>(
    key: K,
    value: LocationWritePayload[K],
  ) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function save() {
    setError(null);

    try {
      if (isNew) {
        await createLocation.mutateAsync(draft);
      } else {
        await updateLocation.mutateAsync({ id: location.id, payload: draft });
      }
      onClose();
    } catch {
      setError('Could not save this location. Please check the fields.');
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="animate-in fade-in absolute inset-0 cursor-default bg-black/20 duration-200"
      />

      <aside className="animate-in slide-in-from-right relative flex h-full w-full max-w-[520px] flex-col gap-4 overflow-y-auto bg-white px-6 pt-5 pb-0 shadow-xl duration-300 ease-out">
        <div className="flex items-center justify-between">
          <p className="text-paragraph-lg-bold text-neutral-900">
            {isNew ? 'Add location' : 'Edit location'}
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 cursor-pointer items-center justify-center rounded-lg text-slate-500 transition-colors hover:text-red-500"
          >
            <icon.close className="size-4" />
          </button>
        </div>

        <FieldLabel label="Name">
          <Input
            variant="default"
            size="medium"
            placeholder="Lazimpat Branch"
            value={draft.name}
            onChange={(event) => set('name', event.target.value)}
          />
        </FieldLabel>

        <div className="flex w-full items-start gap-3">
          <FieldLabel label="Type">
            <Select
              variant="filled"
              size="medium"
              placeholder="Select type"
              options={types.map((type) => ({
                label: type.label,
                value: type.slug,
              }))}
              value={draft.location_type}
              onValueChange={(value) => set('location_type', value)}
            />
          </FieldLabel>
          <FieldLabel label="District">
            <Select
              variant="filled"
              size="medium"
              placeholder="Select district"
              options={districts.map((district) => ({
                label: district.province
                  ? `${district.name} (${district.province.name})`
                  : district.name,
                value: district.slug,
              }))}
              value={draft.district}
              onValueChange={(value) => set('district', value)}
            />
          </FieldLabel>
        </div>
        <p className="-mt-2 text-[12px] text-neutral-700/68">
          Province is set automatically from the district.
        </p>

        <FieldLabel label="Address">
          <Textarea
            rows={2}
            value={draft.address}
            onChange={(event) => set('address', event.target.value)}
          />
        </FieldLabel>

        <div className="flex w-full items-start gap-3">
          <FieldLabel label="Phone">
            <Input
              variant="default"
              size="medium"
              placeholder="01-4443377"
              value={draft.phone ?? ''}
              onChange={(event) => set('phone', event.target.value)}
            />
          </FieldLabel>
          <FieldLabel label="Opening hours">
            <Input
              variant="default"
              size="medium"
              placeholder="Sun-Fri 9:30-4:30"
              value={draft.hours ?? ''}
              onChange={(event) => set('hours', event.target.value)}
            />
          </FieldLabel>
        </div>

        <FieldLabel label="Services">
          <Input
            variant="default"
            size="medium"
            placeholder="Cash, Deposits, Loans"
            value={(draft.services ?? []).join(', ')}
            onChange={(event) =>
              set(
                'services',
                event.target.value
                  .split(',')
                  .map((service) => service.trim())
                  .filter(Boolean),
              )
            }
          />
        </FieldLabel>

        <FieldLabel label="Map">
          <Textarea
            rows={2}
            placeholder="Paste the Google Maps embed code or URL"
            value={draft.map_embed_url ?? ''}
            onChange={(event) => set('map_embed_url', event.target.value)}
          />
        </FieldLabel>
        <p className="-mt-2 text-[12px] text-neutral-700/68">
          In Google Maps use Share, then Embed a map, and paste the whole
          thing. Only the map address is kept.
        </p>

        {draft.map_embed_url?.startsWith('http') && (
          // A wrong map URL is invisible until someone visits the page, so
          // show the actual map here while it is being entered.
          <iframe
            src={draft.map_embed_url}
            title="Map preview"
            className="h-[180px] w-full rounded-lg border border-black/5"
            loading="lazy"
          />
        )}

        <div className="flex items-center justify-between gap-3 border-t border-black/5 pt-4">
          <div className="flex flex-col">
            <p className="text-[13px] text-neutral-900">Show on the website</p>
            <p className="text-[12px] text-neutral-700/68">
              Hidden locations stay here but disappear from the public map.
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

        <div className="sticky bottom-0 -mx-6 mt-auto flex items-center justify-between gap-2 border-t border-black/5 bg-white px-6 pt-4 pb-5">
          {!isNew ? (
            <Button
              type="button"
              variant="destructiveGhost"
              disabled={deleteLocation.isPending}
              onClick={async () => {
                await deleteLocation.mutateAsync(location.id);
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
              {isSaving ? 'Saving…' : 'Save location'}
            </Button>
          </div>
        </div>
      </aside>
    </div>
  );
}
