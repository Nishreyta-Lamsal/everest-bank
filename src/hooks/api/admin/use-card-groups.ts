import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { cardGroupService } from '@/api/services/admin/card-group.service';

import type {
  CardGroupWritePayload,
  CardWritePayload,
} from '@/api/services/admin/card-group.service';

export function cardGroupsQueryKey() {
  return ['card-groups', 'list'] as const;
}

export function cardGroupQueryKey(slug: string) {
  return ['card-groups', 'detail', slug] as const;
}

export function useCardGroups() {
  return useQuery({
    queryKey: cardGroupsQueryKey(),
    queryFn: () => cardGroupService.list(),
  });
}

export function useCardGroup(slug: string) {
  return useQuery({
    queryKey: cardGroupQueryKey(slug),
    queryFn: () => cardGroupService.retrieve(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateCardGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CardGroupWritePayload) =>
      cardGroupService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardGroupsQueryKey() });
    },
  });
}

export function useUpdateCardGroup(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<CardGroupWritePayload>) =>
      cardGroupService.update(slug, payload),
    onSuccess: (group) => {
      queryClient.setQueryData(cardGroupQueryKey(slug), group);
      queryClient.invalidateQueries({ queryKey: cardGroupsQueryKey() });
    },
  });
}

export function useDeleteCardGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => cardGroupService.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: cardGroupsQueryKey() });
    },
  });
}

/** Card writes change the group's cards_count, so both caches refresh. */
function invalidateGroup(
  queryClient: ReturnType<typeof useQueryClient>,
  slug: string,
) {
  queryClient.invalidateQueries({ queryKey: cardGroupQueryKey(slug) });
  queryClient.invalidateQueries({ queryKey: cardGroupsQueryKey() });
}

export function useCreateCard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CardWritePayload) =>
      cardGroupService.createCard(slug, payload),
    onSuccess: () => invalidateGroup(queryClient, slug),
  });
}

export function useUpdateCard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      cardId,
      payload,
    }: {
      cardId: number;
      payload: Partial<CardWritePayload>;
    }) => cardGroupService.updateCard(slug, cardId, payload),
    onSuccess: () => invalidateGroup(queryClient, slug),
  });
}

export function useDeleteCard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => cardGroupService.removeCard(slug, cardId),
    onSuccess: () => invalidateGroup(queryClient, slug),
  });
}

export function useReorderCards(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardIds: number[]) =>
      cardGroupService.reorderCards(slug, cardIds),
    onSuccess: () => invalidateGroup(queryClient, slug),
  });
}
