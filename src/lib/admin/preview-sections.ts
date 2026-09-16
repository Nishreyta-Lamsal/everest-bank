import { localizedContent } from './section-content';

import type { PageSectionRead } from '@/types/admin';
import type { SectionData } from '@/types';

/**
 * Admin sections carry locale-wrapped content (`{ en: {...}, ne: {...} }`),
 * while the public page components read the content directly. This unwraps
 * the active locale and overlays any unsaved draft so the live preview can
 * render the real page components against in-progress edits.
 */
export function toPreviewSections(
  sections: PageSectionRead[] | undefined,
  drafts: Record<number, Record<string, unknown>>,
  draftVisibility: Record<number, boolean> = {},
): SectionData[] | undefined {
  if (!sections) return undefined;

  return sections
    .filter((section) => draftVisibility[section.id] ?? section.is_visible)
    .sort((a, b) => a.position - b.position)
    .map((section) => ({
      ...section,
      content: localizedContent<Record<string, unknown>>(
        drafts[section.id] ?? section.content,
      ),
    }));
}
