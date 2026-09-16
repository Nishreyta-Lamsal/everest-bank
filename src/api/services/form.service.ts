import { axiosClient } from '@/lib/api/axios-client';
import { toMediaPath } from '@/lib/api/media-url';

import type { ApiResponse } from '@/types';
import type { FieldWidth, FormFieldOption, FormFieldType } from '@/types/admin';

/** Public form schema. Options are already resolved server-side. */
export type PublicFormField = {
  name: string;
  label: string;
  field_type: FormFieldType;
  is_required: boolean;
  placeholder: string;
  help_text: string;
  options: FormFieldOption[];
  validation: {
    min_length?: number;
    max_length?: number;
    pattern?: string;
  };
  width: FieldWidth;
  position: number;
};

/** Media ids are resolved to URLs server-side so the site can render them. */
export type PublicFormBanner = {
  id: number;
  title: string;
  file_url: string | null;
  alt_text: string;
};

export type PublicFormSidebarCard = {
  title: string;
  href: string;
  image_url: string | null;
};

export type PublicForm = {
  slug: string;
  title: string;
  description: string;
  submit_label: string;
  success_message: string;
  banner: PublicFormBanner | null;
  sidebar_cards: PublicFormSidebarCard[];
  fields: PublicFormField[];
};

export type SubmitFormResponse = {
  id: number;
  message: string;
};

/** Field errors come back keyed by field name, matching the schema. */
export type SubmitFormErrors = Record<string, string | string[]>;

export type FormLang = 'en' | 'ne';

/**
 * Media is served same-origin through the `/media/*` rewrite, so absolute
 * backend URLs are folded down to `/media/...`. Without this next/image
 * rejects the backend host unless it is listed in remotePatterns.
 */
function withMediaPaths(form: PublicForm): PublicForm {
  return {
    ...form,
    banner: form.banner?.file_url
      ? { ...form.banner, file_url: toMediaPath(form.banner.file_url) }
      : form.banner,
    sidebar_cards: form.sidebar_cards.map((card) => ({
      ...card,
      image_url: card.image_url ? toMediaPath(card.image_url) : card.image_url,
    })),
  };
}

export const formService = {
  getForm: async (slug: string, lang?: FormLang): Promise<PublicForm> => {
    const response = await axiosClient.get<ApiResponse<PublicForm>>(
      `public/forms/${slug}/`,
      { params: lang ? { lang } : undefined },
    );

    return withMediaPaths(response.data.data);
  },

  submit: async (
    slug: string,
    values: Record<string, unknown>,
  ): Promise<SubmitFormResponse> => {
    const response = await axiosClient.post<ApiResponse<SubmitFormResponse>>(
      `public/forms/${slug}/submit/`,
      values,
    );

    return response.data.data;
  },
};
