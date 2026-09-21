import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';

import type {
  ApiResponse,
  Card,
  MoreService,
  MoreServiceDetail,
} from '@/types/admin';

export type MoreServiceWritePayload = {
  title: string;
  is_active?: boolean;
};

export type CardWritePayload = {
  title: string;
  /** Media id, or null to clear. */
  image?: number | null;
  /** Page slug. Preferred over href and survives page renames. */
  page?: string | null;
  href?: string;
  cta_label?: string;
  /** Screen keys. Empty or omitted means the card shows on every screen. */
  screens?: string[];
  position?: number;
  is_active?: boolean;
};

/** Media is served same-origin through the /media/* rewrite. */
function withMediaPath(card: Card): Card {
  return card.image?.file_url
    ? {
        ...card,
        image: { ...card.image, file_url: toMediaPath(card.image.file_url) },
      }
    : card;
}

function withMediaPaths(group: MoreServiceDetail): MoreServiceDetail {
  return { ...group, cards: group.cards.map(withMediaPath) };
}

export const moreServiceService = {
  list: async (): Promise<MoreService[]> => {
    const response =
      await axiosClient.get<ApiResponse<MoreService[]>>('card-groups/');

    return response.data.data;
  },

  retrieve: async (slug: string): Promise<MoreServiceDetail> => {
    const response = await axiosClient.get<ApiResponse<MoreServiceDetail>>(
      `card-groups/${slug}/`,
    );

    return withMediaPaths(response.data.data);
  },

  create: async (
    payload: MoreServiceWritePayload,
  ): Promise<MoreServiceDetail> => {
    const response = await axiosClient.post<ApiResponse<MoreServiceDetail>>(
      'card-groups/',
      payload,
    );

    return withMediaPaths(response.data.data);
  },

  update: async (
    slug: string,
    payload: Partial<MoreServiceWritePayload>,
  ): Promise<MoreServiceDetail> => {
    const response = await axiosClient.patch<ApiResponse<MoreServiceDetail>>(
      `card-groups/${slug}/`,
      payload,
    );

    return withMediaPaths(response.data.data);
  },

  remove: async (slug: string): Promise<void> => {
    await axiosClient.delete(`card-groups/${slug}/`);
  },

  createCard: async (
    slug: string,
    payload: CardWritePayload,
  ): Promise<Card> => {
    const response = await axiosClient.post<ApiResponse<Card>>(
      `card-groups/${slug}/cards/`,
      payload,
    );

    return withMediaPath(response.data.data);
  },

  updateCard: async (
    slug: string,
    cardId: number,
    payload: Partial<CardWritePayload>,
  ): Promise<Card> => {
    const response = await axiosClient.patch<ApiResponse<Card>>(
      `card-groups/${slug}/cards/${cardId}/`,
      payload,
    );

    return withMediaPath(response.data.data);
  },

  removeCard: async (slug: string, cardId: number): Promise<void> => {
    await axiosClient.delete(`card-groups/${slug}/cards/${cardId}/`);
  },

  reorderCards: async (slug: string, cardIds: number[]): Promise<Card[]> => {
    const response = await axiosClient.post<ApiResponse<Card[]>>(
      `card-groups/${slug}/cards/reorder/`,
      { card_ids: cardIds },
    );

    return response.data.data.map(withMediaPath);
  },
};
