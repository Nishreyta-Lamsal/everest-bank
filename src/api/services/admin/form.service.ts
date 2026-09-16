import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';

import type {
  ApiResponse,
  CursorPage,
  FieldWidth,
  Form,
  FormDetail,
  FormField,
  FormFieldOption,
  FormFieldType,
  FormFieldValidation,
  FormSidebarCard,
  FormStatus,
  FormSubmission,
  OptionsSource,
  SubmissionStatus,
  SubmissionSummary,
} from '@/types/admin';

export type ListFormsParams = {
  status?: FormStatus;
  cursor?: string;
};

export type FormWritePayload = {
  title: string;
  /** Accepted on create only; the backend freezes the slug afterwards. */
  slug?: string;
  description?: string;
  submit_label?: string;
  success_message?: string;
  status?: FormStatus;
  /** Write takes a plain media id; reads return the nested media. */
  banner?: number | null;
  sidebar_cards?: FormSidebarCard[];
  is_active?: boolean;
};

export type FormFieldWritePayload = {
  label: string;
  /** Derived from the label when omitted. */
  name?: string;
  field_type: FormFieldType;
  is_required?: boolean;
  placeholder?: string;
  help_text?: string;
  options?: FormFieldOption[];
  options_source?: OptionsSource;
  validation?: FormFieldValidation;
  width?: FieldWidth;
  position?: number;
  is_active?: boolean;
};

export type ListSubmissionsParams = {
  status?: SubmissionStatus;
  cursor?: string;
};

/**
 * Same same-origin folding the public service does: the CMS previews these
 * images, so they must resolve through the `/media/*` rewrite too.
 */
function withMediaPaths<T extends FormDetail | Form>(form: T): T {
  return {
    ...form,
    banner:
      form.banner && form.banner.file_url
        ? { ...form.banner, file_url: toMediaPath(form.banner.file_url) }
        : form.banner,
    sidebar_cards: (form.sidebar_cards ?? []).map((card) => ({
      ...card,
      image_url: card.image_url ? toMediaPath(card.image_url) : card.image_url,
    })),
  };
}

export const formService = {
  list: async (params?: ListFormsParams): Promise<CursorPage<Form>> => {
    const response = await axiosClient.get<ApiResponse<CursorPage<Form>>>(
      'forms/',
      { params },
    );

    return {
      ...response.data.data,
      results: response.data.data.results.map(withMediaPaths),
    };
  },

  retrieve: async (slug: string): Promise<FormDetail> => {
    const response = await axiosClient.get<ApiResponse<FormDetail>>(
      `forms/${slug}/`,
    );

    return withMediaPaths(response.data.data);
  },

  create: async (payload: FormWritePayload): Promise<FormDetail> => {
    const response = await axiosClient.post<ApiResponse<FormDetail>>(
      'forms/',
      payload,
    );

    return withMediaPaths(response.data.data);
  },

  update: async (
    slug: string,
    payload: Partial<FormWritePayload>,
  ): Promise<FormDetail> => {
    const response = await axiosClient.patch<ApiResponse<FormDetail>>(
      `forms/${slug}/`,
      payload,
    );

    return withMediaPaths(response.data.data);
  },

  remove: async (slug: string): Promise<void> => {
    await axiosClient.delete(`forms/${slug}/`);
  },

  /** Admin and Superadmin only; Editor receives 403. */
  publish: async (slug: string): Promise<FormDetail> => {
    const response = await axiosClient.post<ApiResponse<FormDetail>>(
      `forms/${slug}/publish/`,
    );

    return withMediaPaths(response.data.data);
  },

  listFields: async (slug: string): Promise<FormField[]> => {
    const response = await axiosClient.get<ApiResponse<FormField[]>>(
      `forms/${slug}/fields/`,
    );

    return response.data.data;
  },

  createField: async (
    slug: string,
    payload: FormFieldWritePayload,
  ): Promise<FormField> => {
    const response = await axiosClient.post<ApiResponse<FormField>>(
      `forms/${slug}/fields/`,
      payload,
    );

    return response.data.data;
  },

  updateField: async (
    slug: string,
    fieldId: number,
    payload: Partial<FormFieldWritePayload>,
  ): Promise<FormField> => {
    const response = await axiosClient.patch<ApiResponse<FormField>>(
      `forms/${slug}/fields/${fieldId}/`,
      payload,
    );

    return response.data.data;
  },

  removeField: async (slug: string, fieldId: number): Promise<void> => {
    await axiosClient.delete(`forms/${slug}/fields/${fieldId}/`);
  },

  reorderFields: async (
    slug: string,
    fieldIds: number[],
  ): Promise<FormField[]> => {
    const response = await axiosClient.post<ApiResponse<FormField[]>>(
      `forms/${slug}/fields/reorder/`,
      { field_ids: fieldIds },
    );

    return response.data.data;
  },

  /** Applicant PII. Restricted to Admin and Superadmin. */
  listSubmissions: async (
    slug: string,
    params?: ListSubmissionsParams,
  ): Promise<CursorPage<FormSubmission>> => {
    const response = await axiosClient.get<
      ApiResponse<CursorPage<FormSubmission>>
    >(`forms/${slug}/submissions/`, { params });

    return response.data.data;
  },

  /** Aggregated counts for the responses dashboard. No applicant answers. */
  submissionSummary: async (
    slug: string,
    params?: ListSubmissionsParams,
  ): Promise<SubmissionSummary> => {
    const response = await axiosClient.get<ApiResponse<SubmissionSummary>>(
      `forms/${slug}/submissions/summary/`,
      { params },
    );

    return response.data.data;
  },

  /**
   * CSV of every submission, as a Blob. Fetched through axios rather than a
   * plain link so the auth cookie and CSRF handling apply, and so a 403 is a
   * real error instead of a downloaded error page.
   */
  exportSubmissions: async (
    slug: string,
    params?: ListSubmissionsParams,
  ): Promise<{ blob: Blob; filename: string }> => {
    const response = await axiosClient.get(
      `forms/${slug}/submissions/export/`,
      {
        params,
        responseType: 'blob',
      },
    );

    const disposition = String(response.headers['content-disposition'] ?? '');
    const match = disposition.match(/filename="?([^"]+)"?/);

    return {
      blob: response.data as Blob,
      filename: match?.[1] ?? `${slug}-submissions.csv`,
    };
  },

  updateSubmissionStatus: async (
    submissionId: number,
    status: SubmissionStatus,
  ): Promise<FormSubmission> => {
    const response = await axiosClient.patch<ApiResponse<FormSubmission>>(
      `forms/submissions/${submissionId}/`,
      { status },
    );

    return response.data.data;
  },
};
