'use client';

import { useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import FilterButton from '@/components/ui/buttons/FilterButton';
import GlobalSearchInput from '@/components/ui/inputs/GlobalSearchInput';
import AccountFinderList from './AccountFinderList';

import { getSectionContent } from '@/lib/get-section-content';

import { accountFinderCategories } from '../../_data/account-finder';

import type { DepositDetailsPageSection } from '@/api/services/personal/deposit-accounts/deposit-details-page.service';
import type { AccountFinderCategory } from '../../_types';

type AccountFinderSectionProps = {
  sections?: DepositDetailsPageSection[];
};

export default function AccountFinderSection({
  sections,
}: AccountFinderSectionProps) {
  const content = getSectionContent(sections, 'saving_account_finder');

  const apiCategories: AccountFinderCategory[] =
    content?.categories?.map((category) => ({
      label: category.label,
      accounts: category.accounts.map((account) => ({
        title: account.title,
        href: account.href,
        image: account.image?.src ?? null,
        imageAlt: account.image?.alt ?? '',
      })),
    })) ?? [];

  const categories = apiCategories.length
    ? apiCategories
    : accountFinderCategories;
  const heading = content?.heading || 'Find Your Perfect Savings Account';

  const [search, setSearch] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);

  const activeCategory = categories[activeIndex] ?? categories[0];

  const query = search.trim().toLowerCase();
  const filteredAccounts = (activeCategory?.accounts ?? []).filter(
    (account) => query === '' || account.title.toLowerCase().includes(query),
  );

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
            {categories.map((category, index) => {
              const isActive = index === activeIndex;

              return (
                <FilterButton
                  key={category.label}
                  variant="filled"
                  active={isActive}
                  aria-pressed={isActive}
                  onClick={() => setActiveIndex(index)}
                >
                  {category.label}
                </FilterButton>
              );
            })}
          </div>

          <AccountFinderList accounts={filteredAccounts} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
