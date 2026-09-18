import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { forexService } from '@/api/services/admin/forex.service';

import type { ForexRowsPayload } from '@/api/services/admin/forex.service';

export function forexQueryKey(date: string) {
  return ['forex', 'tables', date] as const;
}

/** Every table on a date, one per publish time. */
export function useForexTables(date: string) {
  return useQuery({
    queryKey: forexQueryKey(date),
    queryFn: () => forexService.listTables(date),
    enabled: Boolean(date),
  });
}

export function useUpdateForexRates(date: string, time?: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: ForexRowsPayload) =>
      forexService.update(date, payload, time),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forex'] });
    },
  });
}

export function useImportForexRates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { date?: string; time?: string }) =>
      forexService.import(variables.date, variables.time),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forex'] });
    },
  });
}

export function usePublishForexRates() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (variables: { date?: string; time?: string }) =>
      forexService.publish(variables.date, variables.time),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['forex'] });
    },
  });
}
