'use client';

import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import LocationEditDrawer from './LocationEditDrawer';
import LocationTypesModal from './LocationTypesModal';
import LocationRow from './locations-list/LocationRow';
import LocationTypeTabs from './locations-list/LocationTypeTabs';

import { useDebounce } from '@/hooks/useDebounce';
import { useLocations } from '@/hooks/api/admin/use-locations';

import type { Location } from '@/types/admin';

/** What the drawer is doing: closed, creating, or editing a row. */
type DrawerState =
  { mode: 'closed' } | { mode: 'new' } | { mode: 'edit'; location: Location };

export default function LocationsScreen() {
  const [typeSlug, setTypeSlug] = useState('all');
  const [search, setSearch] = useState('');
  const [drawer, setDrawer] = useState<DrawerState>({ mode: 'closed' });
  const [typesOpen, setTypesOpen] = useState(false);

  // One request per pause in typing rather than one per keystroke.
  const debouncedSearch = useDebounce(search, 300);

  const { data, isPending, isError, refetch } = useLocations({
    ...(typeSlug === 'all' ? {} : { location_type: typeSlug }),
    ...(debouncedSearch.trim() ? { search: debouncedSearch.trim() } : {}),
  });

  const locations = data?.results ?? [];

  return (
    <div className="flex w-full flex-col gap-6">
      <section className="flex w-full items-center justify-between">
        <div className="flex flex-col gap-1">
          <p className="text-heading-3 text-neutral-900">Locations</p>
          <p className="text-paragraph-sm text-neutral-700">
            Branches, ATMs, and counters shown on the website maps.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => setTypesOpen(true)}>
            Manage types
          </Button>
          <Button variant="primary" onClick={() => setDrawer({ mode: 'new' })}>
            <icon.plus />
            Add location
          </Button>
        </div>
      </section>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <LocationTypeTabs
          counts={data?.type_counts}
          active={typeSlug}
          onChange={setTypeSlug}
        />
        <div className="w-[260px]">
          <Input
            variant="default"
            size="medium"
            placeholder="Search name or address"
            leftIcon={<icon.search className="size-4 text-neutral-500" />}
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>
      </div>

      <Card variant="primary" className="w-full overflow-hidden px-4 py-3">
        {isPending && (
          <div className="flex w-full flex-col divide-y divide-black/3">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="flex h-[74px] items-center gap-4 px-4"
              >
                <div className="size-[48px] shrink-0 animate-pulse rounded-[4px] bg-slate-100" />
                <div className="flex min-w-0 flex-1 flex-col gap-2">
                  <div className="h-[14px] w-[180px] animate-pulse rounded bg-slate-100" />
                  <div className="h-[12px] w-[260px] animate-pulse rounded bg-slate-100" />
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="flex h-[148px] flex-col items-center justify-center gap-3 px-4">
            <p className="text-paragraph-sm text-neutral-700/68">
              Could not load locations.
            </p>
            <button
              type="button"
              onClick={() => refetch()}
              className="text-paragraph-sm-medium text-slate-950 underline"
            >
              Try again
            </button>
          </div>
        )}

        {data && locations.length === 0 && (
          <div className="flex h-[148px] items-center justify-center px-4">
            <p className="text-paragraph-sm text-neutral-700/68">
              {debouncedSearch.trim()
                ? 'No locations match that search.'
                : 'No locations yet.'}
            </p>
          </div>
        )}

        {locations.length > 0 && (
          <div className="flex w-full flex-col divide-y divide-black/3">
            {locations.map((location) => (
              <LocationRow
                key={location.id}
                location={location}
                onEdit={() => setDrawer({ mode: 'edit', location })}
              />
            ))}
          </div>
        )}
      </Card>

      {drawer.mode !== 'closed' && (
        <LocationEditDrawer
          // Remounts between rows, so the form never shows the previous one.
          key={drawer.mode === 'edit' ? drawer.location.id : 'new'}
          location={drawer.mode === 'edit' ? drawer.location : null}
          defaultTypeSlug={typeSlug}
          onClose={() => setDrawer({ mode: 'closed' })}
        />
      )}

      <LocationTypesModal
        open={typesOpen}
        onClose={() => setTypesOpen(false)}
      />
    </div>
  );
}
