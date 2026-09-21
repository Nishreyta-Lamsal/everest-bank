import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { moreServiceService } from '@/api/services/admin/more-service.service';

import type {
  CardWritePayload,
  MoreServiceWritePayload,
} from '@/api/services/admin/more-service.service';

export function moreServicesQueryKey() {
  return ['card-groups', 'list'] as const;
}

export function moreServiceQueryKey(slug: string) {
  return ['card-groups', 'detail', slug] as const;
}

export function useMoreServices() {
  return useQuery({
    queryKey: moreServicesQueryKey(),
    queryFn: () => moreServiceService.list(),
  });
}

export function useMoreService(slug: string) {
  return useQuery({
    queryKey: moreServiceQueryKey(slug),
    queryFn: () => moreServiceService.retrieve(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateMoreService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: MoreServiceWritePayload) =>
      moreServiceService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moreServicesQueryKey() });
    },
  });
}

export function useUpdateMoreService(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<MoreServiceWritePayload>) =>
      moreServiceService.update(slug, payload),
    onSuccess: (group) => {
      queryClient.setQueryData(moreServiceQueryKey(slug), group);
      queryClient.invalidateQueries({ queryKey: moreServicesQueryKey() });
    },
  });
}

export function useDeleteMoreService() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => moreServiceService.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: moreServicesQueryKey() });
    },
  });
}

/** Card writes change the group's cards_count, so both caches refresh. */
function invalidateMoreService(
  queryClient: ReturnType<typeof useQueryClient>,
  slug: string,
) {
  queryClient.invalidateQueries({ queryKey: moreServiceQueryKey(slug) });
  queryClient.invalidateQueries({ queryKey: moreServicesQueryKey() });
}

export function useCreateCard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CardWritePayload) =>
      moreServiceService.createCard(slug, payload),
    onSuccess: () => invalidateMoreService(queryClient, slug),
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
    }) => moreServiceService.updateCard(slug, cardId, payload),
    onSuccess: () => invalidateMoreService(queryClient, slug),
  });
}

export function useDeleteCard(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardId: number) => moreServiceService.removeCard(slug, cardId),
    onSuccess: () => invalidateMoreService(queryClient, slug),
  });
}

export function useReorderCards(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (cardIds: number[]) =>
      moreServiceService.reorderCards(slug, cardIds),
    onSuccess: () => invalidateMoreService(queryClient, slug),
  });
}
