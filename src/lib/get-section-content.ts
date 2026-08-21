import type { SectionContentOf } from '@/types';

export function getSectionContent<
  TSection extends { section_type: string; content: unknown },
  TType extends TSection['section_type'],
>(
  sections: TSection[],
  sectionType: TType,
): SectionContentOf<TSection, TType> | undefined {
  const section = sections.find(
    (current) => current.section_type === sectionType,
  );

  return section?.content as unknown as
    SectionContentOf<TSection, TType> | undefined;
}
