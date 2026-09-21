import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';

import type { ApiResponse } from '@/types';
import type { PublicMoreService } from '@/types/admin';

export const publicMoreServiceService = {
  get: async (slug: string, screen?: string): Promise<PublicMoreService> => {
    const response = await axiosClient.get<ApiResponse<PublicMoreService>>(
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

export async function getMoreService(
  slug: string,
  fallback: PublicMoreService,
  screen?: string,
): Promise<PublicMoreService> {
  try {
    return await publicMoreServiceService.get(slug, screen);
  } catch {
    return fallback;
  }
}
