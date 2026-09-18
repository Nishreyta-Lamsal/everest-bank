import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { footerAdminService } from '@/api/services/admin/footer.service';

import type {
  FooterColumnWrite,
  FooterLinkWrite,
  FooterSettingsWrite,
  FooterSocialLinkWrite,
} from '@/types/admin';

export const footerColumnsQueryKey = ['footer-admin', 'columns'] as const;
export const footerSocialQueryKey = ['footer-admin', 'social'] as const;
export const footerSettingsQueryKey = ['footer-admin', 'settings'] as const;

function useFooterMutation<TVariables, TData>(
  mutationFn: (variables: TVariables) => Promise<TData>,
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['footer-admin'] });
    },
  });
}

export function useFooterColumns() {
  return useQuery({
    queryKey: footerColumnsQueryKey,
    queryFn: () => footerAdminService.listColumns(),
  });
}

export function useFooterSocialLinks() {
  return useQuery({
    queryKey: footerSocialQueryKey,
    queryFn: () => footerAdminService.listSocialLinks(),
  });
}

export function useFooterSettings() {
  return useQuery({
    queryKey: footerSettingsQueryKey,
    queryFn: () => footerAdminService.getSettings(),
  });
}

export function useCreateFooterColumn() {
  return useFooterMutation((payload: FooterColumnWrite) =>
    footerAdminService.createColumn(payload),
  );
}

export function useUpdateFooterColumn() {
  return useFooterMutation(
    (variables: { slug: string; payload: Partial<FooterColumnWrite> }) =>
      footerAdminService.updateColumn(variables.slug, variables.payload),
  );
}

export function useDeleteFooterColumn() {
  return useFooterMutation((slug: string) =>
    footerAdminService.removeColumn(slug),
  );
}

export function useCreateFooterLink() {
  return useFooterMutation(
    (variables: { columnSlug: string; payload: FooterLinkWrite }) =>
      footerAdminService.createLink(variables.columnSlug, variables.payload),
  );
}

export function useUpdateFooterLink() {
  return useFooterMutation(
    (variables: {
      columnSlug: string;
      linkSlug: string;
      payload: Partial<FooterLinkWrite>;
    }) =>
      footerAdminService.updateLink(
        variables.columnSlug,
        variables.linkSlug,
        variables.payload,
      ),
  );
}

export function useDeleteFooterLink() {
  return useFooterMutation(
    (variables: { columnSlug: string; linkSlug: string }) =>
      footerAdminService.removeLink(variables.columnSlug, variables.linkSlug),
  );
}

export function useCreateFooterSocialLink() {
  return useFooterMutation((payload: FooterSocialLinkWrite) =>
    footerAdminService.createSocialLink(payload),
  );
}

export function useUpdateFooterSocialLink() {
  return useFooterMutation(
    (variables: { slug: string; payload: Partial<FooterSocialLinkWrite> }) =>
      footerAdminService.updateSocialLink(variables.slug, variables.payload),
  );
}

export function useDeleteFooterSocialLink() {
  return useFooterMutation((slug: string) =>
    footerAdminService.removeSocialLink(slug),
  );
}

export function useUpdateFooterSettings() {
  return useFooterMutation((payload: FooterSettingsWrite) =>
    footerAdminService.updateSettings(payload),
  );
}
