import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import ContentSidebar from '@/components/shared/content/ContentSidebar';
import ContentQuote from '@/components/shared/content/ContentQuote';
import DirectorCardList from './directors/DirectorCardList';

import { peopleService, type Person } from '@/api/services/people.service';

import { getQueryClient } from '@/lib/get-query-client';

import { directors as fallbackDirectors } from '../_data/directors';
import { relatedPages } from '../_data/related-pages';

import { socialLinks } from '@/data';

import type { Director } from '../_data/directors';

export const boardOfDirectorsQueryKey = ['people', 'board'] as const;

export default async function BoardOfDirectorsContentSection() {
  const queryClient = getQueryClient();

  let results: Person[] = [];

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: boardOfDirectorsQueryKey,
      queryFn: () => peopleService.getPeopleList({ category: 'board' }),
    });
    results = data.results;
  } catch {
    results = [];
  }

  const directors = results.length
    ? results.map((person): Director => {
        return {
          id: person.slug,
          name: person.name,
          title: person.designation,
          image: person.photo_url,
          position: person.position,
        };
      })
    : fallbackDirectors;

  return (
    <section className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="flex flex-col gap-12 lg:flex-row lg:items-start lg:justify-between">
          <article className="flex w-full max-w-[750px] flex-col items-start gap-10 lg:gap-13.5">
            <DirectorCardList directors={directors} />

            <ContentQuote title="“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”" />
          </article>

          <ContentSidebar links={relatedPages} socialLinks={socialLinks} />
        </div>
      </LayoutWrapper>
    </section>
  );
}
