'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import MapLocationGrid from './MapLocationGrid';
import Pagination from '@/components/ui/navigation/Pagination';

import type { MapLocation } from '@/types';

type MapGridSectionProps = {
  locations: MapLocation[];
  resultsLabel?: string;
  isLoading?: boolean;
};

const DEFAULT_PAGE_SIZE = 20;

export default function MapGridSection({
  locations,
  resultsLabel = 'locations found',
  isLoading,
}: MapGridSectionProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(DEFAULT_PAGE_SIZE);

  const totalPages = Math.max(Math.ceil(locations.length / pageSize), 1);
  const page = Math.min(currentPage, totalPages);
  const visibleLocations = locations.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function changePageSize(nextPageSize: number) {
    setPageSize(nextPageSize);
    setCurrentPage(1);
  }

  return (
    <section className="w-full pt-6 pb-8 lg:py-8">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-4">
          <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-400 w-full">
            Total Search: {locations.length} {resultsLabel}
          </p>
          {locations.length === 0 ? (
            <p className="text-grey-400 w-full py-12 text-center">
              {isLoading ? 'Loading…' : 'No locations match these filters.'}
            </p>
          ) : (
            <MapLocationGrid locations={visibleLocations} />
          )}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
            pageSize={pageSize}
            onPageSizeChange={changePageSize}
            className="w-full pt-4"
          />
        </div>
      </LayoutWrapper>
    </section>
  );
}
