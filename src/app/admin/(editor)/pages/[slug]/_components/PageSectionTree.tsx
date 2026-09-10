import PageSectionItem from './PageSectionItem';

import type { PageSectionRead } from '@/types/admin';

type PageSectionTreeProps = {
  slug: string;
  sections: PageSectionRead[];
  activeSectionId?: number;
};

export default function PageSectionTree({
  slug,
  sections,
  activeSectionId,
}: PageSectionTreeProps) {
  if (sections.length === 0) {
    return null;
  }

  const ordered = [...sections].sort((a, b) => a.position - b.position);

  return (
    <div className="ml-3 flex w-full flex-col items-start gap-0.5 border-l border-slate-200 py-1 pl-3">
      {ordered.map((section) => (
        <PageSectionItem
          key={section.id}
          slug={slug}
          section={section}
          isActive={section.id === activeSectionId}
        />
      ))}
    </div>
  );
}
