import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { pageSectionService } from '@/api/services/admin/page-section.service';
import { pageQueryKey } from './use-pages';

import type { UpdatePageSectionPayload } from '@/api/services/admin/page-section.service';

export const pageSectionQueryKey = (slug: string, sectionId: number) =>
  ['pages', 'detail', slug, 'sections', sectionId] as const;

export function usePageSection(slug: string, sectionId?: number) {
  return useQuery({
    queryKey: pageSectionQueryKey(slug, sectionId ?? 0),
    queryFn: () => pageSectionService.retrieve(slug, sectionId as number),
    enabled: Boolean(slug) && typeof sectionId === 'number',
  });
}

export function useUpdatePageSection(slug: string, sectionId: number) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdatePageSectionPayload) =>
      pageSectionService.update(slug, sectionId, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: pageQueryKey(slug) }),
        queryClient.invalidateQueries({
          queryKey: pageSectionQueryKey(slug, sectionId),
        }),
      ]);
    },
  });
}
