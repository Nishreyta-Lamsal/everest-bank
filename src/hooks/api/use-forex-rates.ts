import { useQuery } from '@tanstack/react-query';

import { forexPublicService } from '@/api/services/forex.service';

export function forexTablesQueryKey(date: string) {
  return ['public-forex', 'tables', date] as const;
}

/** Every published table on a date, which is what fills the time options. */
export function useForexDayTables(date: string) {
  return useQuery({
    queryKey: forexTablesQueryKey(date),
    queryFn: () => forexPublicService.listTables(date),
    enabled: Boolean(date),
  });
}
