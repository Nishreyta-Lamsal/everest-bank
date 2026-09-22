import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

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
  successMessage = 'Saved successfully.',
) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['footer-admin'] });
      toast.success(successMessage);
    },
    onError: () => {
      toast.error('Could not save changes. Please try again.');
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
  return useFooterMutation(
    (payload: FooterColumnWrite) => footerAdminService.createColumn(payload),
    'Footer column created.',
  );
}

export function useUpdateFooterColumn() {
  return useFooterMutation(
    (variables: { slug: string; payload: Partial<FooterColumnWrite> }) =>
      footerAdminService.updateColumn(variables.slug, variables.payload),
    'Footer column updated.',
  );
}

export function useDeleteFooterColumn() {
  return useFooterMutation(
    (slug: string) => footerAdminService.removeColumn(slug),
    'Footer column deleted.',
  );
}

export function useCreateFooterLink() {
  return useFooterMutation(
    (variables: { columnSlug: string; payload: FooterLinkWrite }) =>
      footerAdminService.createLink(variables.columnSlug, variables.payload),
    'Footer link created.',
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
    'Footer link updated.',
  );
}

export function useDeleteFooterLink() {
  return useFooterMutation(
    (variables: { columnSlug: string; linkSlug: string }) =>
      footerAdminService.removeLink(variables.columnSlug, variables.linkSlug),
    'Footer link deleted.',
  );
}

export function useCreateFooterSocialLink() {
  return useFooterMutation(
    (payload: FooterSocialLinkWrite) =>
      footerAdminService.createSocialLink(payload),
    'Social link created.',
  );
}

export function useUpdateFooterSocialLink() {
  return useFooterMutation(
    (variables: { slug: string; payload: Partial<FooterSocialLinkWrite> }) =>
      footerAdminService.updateSocialLink(variables.slug, variables.payload),
    'Social link updated.',
  );
}

export function useDeleteFooterSocialLink() {
  return useFooterMutation(
    (slug: string) => footerAdminService.removeSocialLink(slug),
    'Social link deleted.',
  );
}

export function useUpdateFooterSettings() {
  return useFooterMutation(
    (payload: FooterSettingsWrite) =>
      footerAdminService.updateSettings(payload),
    'Footer settings updated.',
  );
}
