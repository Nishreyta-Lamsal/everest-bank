'use client';

import { useSearchParams } from 'next/navigation';

import { usePage } from '@/hooks/api/admin/use-pages';

export function useActiveSectionType(slug: string) {
  const searchParams = useSearchParams();
  const sectionParam = searchParams.get('section');

  const { data: page } = usePage(slug);

  const sections = page?.sections;

  if (!sections?.length) return '';

  if (!sectionParam) {
    return [...sections].sort((a, b) => a.position - b.position)[0]
      .section_type;
  }

  const requestedId = Number(sectionParam);

  return (
    sections.find((section) => section.id === requestedId)?.section_type ?? ''
  );
}
