'use client';

import { useMemo, useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FilterButton from '@/components/ui/buttons/FilterButton';
import GlobalSearchInput from '@/components/ui/inputs/GlobalSearchInput';
import AccountFinderList from './AccountFinderList';

import {
  accountFinderCards,
  accountFinderCategories,
} from '../../_data/account-finder';

import type { AccountFinderCard, AccountFinderCategory } from '../../_types';

type AccountFinderSectionProps = {
  heading?: string;
  categories?: AccountFinderCategory[];
  cards?: AccountFinderCard[];
};

export default function AccountFinderSection({
  heading = 'Find Your Perfect Savings Account',
  categories = accountFinderCategories,
  cards = accountFinderCards,
}: AccountFinderSectionProps = {}) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(
    categories[0]?.slug ?? '',
  );

  const filteredCards = useMemo(() => {
    const query = search.trim().toLowerCase();

    return cards.filter((card) => {
      const matchesCategory = card.categories.includes(activeCategory);
      const matchesSearch =
        query === '' || card.title.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [search, activeCategory, cards]);

  return (
    <section className="w-full bg-white py-15 lg:py-22">
      <LayoutWrapper>
        <div className="flex w-full flex-col items-start gap-8 lg:gap-12">
          <div className="flex w-full flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h2-desktop-md text-grey-500">
              {heading}
            </h2>
            <GlobalSearchInput
              label="Search account type"
              placeholder="Search account type"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="w-full lg:w-[405px]"
            />
          </div>

          <div
            role="group"
            aria-label="Filter savings accounts by audience"
            className="scrollbar-hidden flex w-full items-start gap-4 overflow-x-auto"
          >
            {categories.map((category) => {
              const isActive = category.slug === activeCategory;

              return (
                <FilterButton
                  key={category.slug}
                  variant="filled"
                  active={isActive}
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category.slug)}
                >
                  {category.label}
                </FilterButton>
              );
            })}
          </div>

          <AccountFinderList cards={filteredCards} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
