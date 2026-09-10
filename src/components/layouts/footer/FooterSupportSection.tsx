import FooterOfficerCard from './FooterOfficerCard';
import FooterSupportCard from './FooterSupportCard';

import { peopleService, type Person } from '@/api/services/people.service';

import { getQueryClient } from '@/lib/get-query-client';

import { footerOfficers } from '@/data';

import type { FooterOfficer, FooterSupportContent } from '@/types';

type FooterSupportSectionProps = {
  support: FooterSupportContent;
};

export const footerOfficersQueryKey = ['footer-officers'] as const;

const DEFAULT_OFFICER_PHOTO = '/images/footer/grievance-officer-photo.png';

export default async function FooterSupportSection({
  support,
}: FooterSupportSectionProps) {
  const queryClient = getQueryClient();

  let results: Person[] = [];

  function toFooterOfficer(person: Person, index: number): FooterOfficer {
    return {
      title: person.designation,
      name: person.name,
      photo:
        person.photo_url ??
        footerOfficers[index]?.photo ??
        DEFAULT_OFFICER_PHOTO,
      phone: person.phone,
      extension: person.extension,
      email: person.email,
    };
  }

  try {
    const { data } = await queryClient.fetchQuery({
      queryKey: footerOfficersQueryKey,
      queryFn: () => peopleService.getPeopleList({ footer: true }),
    });
    results = data.results;
  } catch {
    results = [];
  }

  const officers = results.length
    ? results.map(toFooterOfficer)
    : footerOfficers;

  return (
    <div className="flex w-full flex-col gap-6 lg:flex-row xl:items-center">
      {officers.map((officer) => (
        <FooterOfficerCard key={officer.name} {...officer} />
      ))}
      <FooterSupportCard content={support} />
    </div>
  );
}
