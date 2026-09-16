import { axiosClient } from '@/lib/api/axios-client';

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

export const formService = {
  list: async (params?: ListFormsParams): Promise<CursorPage<Form>> => {
    const response = await axiosClient.get<ApiResponse<CursorPage<Form>>>(
      'forms/',
      { params },
    );

    return response.data.data;
  },

  retrieve: async (slug: string): Promise<FormDetail> => {
    const response = await axiosClient.get<ApiResponse<FormDetail>>(
      `forms/${slug}/`,
    );

    return response.data.data;
  },

  create: async (payload: FormWritePayload): Promise<FormDetail> => {
    const response = await axiosClient.post<ApiResponse<FormDetail>>(
      'forms/',
      payload,
    );

    return response.data.data;
  },

  update: async (
    slug: string,
    payload: Partial<FormWritePayload>,
  ): Promise<FormDetail> => {
    const response = await axiosClient.patch<ApiResponse<FormDetail>>(
      `forms/${slug}/`,
      payload,
    );

    return response.data.data;
  },

  remove: async (slug: string): Promise<void> => {
    await axiosClient.delete(`forms/${slug}/`);
  },

  /** Admin and Superadmin only; Editor receives 403. */
  publish: async (slug: string): Promise<FormDetail> => {
    const response = await axiosClient.post<ApiResponse<FormDetail>>(
      `forms/${slug}/publish/`,
    );

    return response.data.data;
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
