import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { formService } from '@/api/services/admin/form.service';

import type {
  FormFieldWritePayload,
  FormWritePayload,
  ListFormsParams,
  ListSubmissionsParams,
} from '@/api/services/admin/form.service';
import type { SubmissionStatus } from '@/types/admin';

export function formsQueryKey(params?: ListFormsParams) {
  return ['forms', 'list', params ?? {}] as const;
}

export function formQueryKey(slug: string) {
  return ['forms', 'detail', slug] as const;
}

export function formFieldsQueryKey(slug: string) {
  return ['forms', 'fields', slug] as const;
}

export function formSubmissionsQueryKey(
  slug: string,
  params?: ListSubmissionsParams,
) {
  return ['forms', 'submissions', slug, params ?? {}] as const;
}

export function useForms(params?: ListFormsParams) {
  return useQuery({
    queryKey: formsQueryKey(params),
    queryFn: () => formService.list(params),
  });
}

export function useForm(slug: string) {
  return useQuery({
    queryKey: formQueryKey(slug),
    queryFn: () => formService.retrieve(slug),
    enabled: Boolean(slug),
  });
}

export function useCreateForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormWritePayload) => formService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms', 'list'] });
      toast.success('Form created.');
    },
    onError: () => {
      toast.error('Could not create the form. Please try again.');
    },
  });
}

export function useUpdateForm(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: Partial<FormWritePayload>) =>
      formService.update(slug, payload),
    onSuccess: (form) => {
      queryClient.setQueryData(formQueryKey(slug), form);
      queryClient.invalidateQueries({ queryKey: ['forms', 'list'] });
      toast.success('Form updated.');
    },
    onError: () => {
      toast.error('Could not update the form. Please try again.');
    },
  });
}

export function useDeleteForm() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => formService.remove(slug),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forms', 'list'] });
      toast.success('Form deleted.');
    },
    onError: () => {
      toast.error('Could not delete the form. Please try again.');
    },
  });
}

export function usePublishForm(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => formService.publish(slug),
    onSuccess: (form) => {
      queryClient.setQueryData(formQueryKey(slug), form);
      queryClient.invalidateQueries({ queryKey: ['forms', 'list'] });
      toast.success('Form published.');
    },
    onError: () => {
      toast.error('Could not publish the form. Please try again.');
    },
  });
}

export function useFormFields(slug: string) {
  return useQuery({
    queryKey: formFieldsQueryKey(slug),
    queryFn: () => formService.listFields(slug),
    enabled: Boolean(slug),
  });
}

/** Field writes change the form's fields_count, so both caches are refreshed. */
function invalidateFields(
  queryClient: ReturnType<typeof useQueryClient>,
  slug: string,
) {
  queryClient.invalidateQueries({ queryKey: formFieldsQueryKey(slug) });
  queryClient.invalidateQueries({ queryKey: formQueryKey(slug) });
}

export function useCreateFormField(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: FormFieldWritePayload) =>
      formService.createField(slug, payload),
    onSuccess: () => {
      invalidateFields(queryClient, slug);
      toast.success('Field added.');
    },
    onError: () => {
      toast.error('Could not add the field. Please try again.');
    },
  });
}

export function useUpdateFormField(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      fieldId,
      payload,
    }: {
      fieldId: number;
      payload: Partial<FormFieldWritePayload>;
    }) => formService.updateField(slug, fieldId, payload),
    onSuccess: () => {
      invalidateFields(queryClient, slug);
      toast.success('Field updated.');
    },
    onError: () => {
      toast.error('Could not update the field. Please try again.');
    },
  });
}

export function useDeleteFormField(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fieldId: number) => formService.removeField(slug, fieldId),
    onSuccess: () => {
      invalidateFields(queryClient, slug);
      toast.success('Field removed.');
    },
    onError: () => {
      toast.error('Could not remove the field. Please try again.');
    },
  });
}

export function useReorderFormFields(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (fieldIds: number[]) =>
      formService.reorderFields(slug, fieldIds),
    onSuccess: (fields) => {
      queryClient.setQueryData(formFieldsQueryKey(slug), fields);
    },
    onError: () => {
      toast.error('Could not reorder fields. Please try again.');
    },
  });
}

export function useFormSubmissions(
  slug: string,
  params?: ListSubmissionsParams,
) {
  return useQuery({
    queryKey: formSubmissionsQueryKey(slug, params),
    queryFn: () => formService.listSubmissions(slug, params),
    enabled: Boolean(slug),
  });
}

export function submissionSummaryQueryKey(
  slug: string,
  params?: ListSubmissionsParams,
) {
  return ['forms', 'summary', slug, params ?? {}] as const;
}

export function useSubmissionSummary(
  slug: string,
  params?: ListSubmissionsParams,
  enabled = true,
) {
  return useQuery({
    queryKey: submissionSummaryQueryKey(slug, params),
    queryFn: () => formService.submissionSummary(slug, params),
    enabled: enabled && Boolean(slug),
  });
}

export function useExportSubmissions(slug: string) {
  return useMutation({
    mutationFn: (params?: ListSubmissionsParams) =>
      formService.exportSubmissions(slug, params),
    onSuccess: ({ blob, filename }) => {
      // Object URL rather than a data URI: a CSV of thousands of rows would
      // otherwise be base64 encoded into the document.
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');

      link.href = url;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      link.remove();
      URL.revokeObjectURL(url);
      toast.success('Submissions exported.');
    },
    onError: () => {
      toast.error('Could not export submissions. Please try again.');
    },
  });
}

export function useUpdateSubmissionStatus(slug: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      submissionId,
      status,
    }: {
      submissionId: number;
      status: SubmissionStatus;
    }) => formService.updateSubmissionStatus(submissionId, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['forms', 'submissions', slug],
      });
      toast.success('Submission status updated.');
    },
    onError: () => {
      toast.error('Could not update the submission status. Please try again.');
    },
  });
}
