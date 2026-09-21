import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';

import type { ApiResponse } from '@/types';
import type { PublicCardGroup } from '@/types/admin';

export const publicCardGroupService = {
  get: async (slug: string, screen?: string): Promise<PublicCardGroup> => {
    const response = await axiosClient.get<ApiResponse<PublicCardGroup>>(
      `public/card-groups/${slug}/`,
      { params: screen ? { screen } : undefined },
    );

    const group = response.data.data;

    return {
      ...group,
      cards: group.cards.map((card) => ({
        ...card,
        image_url: card.image_url ? toMediaPath(card.image_url) : null,
      })),
    };
  },
};

/**
 * A card group, falling back to bundled content when the API is unreachable.
 *
 * Same rule as the location maps: a failed request falls back so the section
 * still renders during an outage, but an empty-but-successful response does
 * not, so deliberately clearing a group in the CMS actually clears the page.
 */
export async function getCardGroup(
  slug: string,
  fallback: PublicCardGroup,
  screen?: string,
): Promise<PublicCardGroup> {
  try {
    return await publicCardGroupService.get(slug, screen);
  } catch {
    return fallback;
  }
}
