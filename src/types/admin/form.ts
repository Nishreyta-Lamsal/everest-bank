export type FormStatus = 'draft' | 'published' | 'archived';

export type FormFieldType =
  | 'text'
  | 'email'
  | 'tel'
  | 'number'
  | 'textarea'
  | 'select'
  | 'radio'
  | 'checkbox'
  | 'date';

/** Fields whose value must be one of the configured options. */
export const CHOICE_FIELD_TYPES: FormFieldType[] = ['select', 'radio'];

/** Where a choice field gets its options. Non-static resolves from live data. */
export type OptionsSource = 'static' | 'provinces' | 'districts' | 'branches';

/** Half-width fields sit side by side; full spans the row. */
export type FieldWidth = 'full' | 'half';

export type FormFieldOption = {
  label: string;
  value: string;
  /** Present on district/branch options so dropdowns can cascade. */
  province?: string | null;
  district?: string | null;
};

export type FormFieldValidation = {
  min_length?: number;
  max_length?: number;
  pattern?: string;
};

export type FormField = {
  id: number;
  name: string;
  label: string;
  label_ne?: string;
  field_type: FormFieldType;
  is_required: boolean;
  placeholder: string;
  placeholder_ne?: string;
  help_text: string;
  help_text_ne?: string;
  options: FormFieldOption[];
  options_source: OptionsSource;
  /** Read-only preview of the live options for a dynamic source. */
  resolved_options: FormFieldOption[];
  validation: FormFieldValidation;
  width: FieldWidth;
  position: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type FormSidebarCard = {
  title: string;
  image_id?: number | null;
  href?: string;
};

export type Form = {
  id: number;
  slug: string;
  title: string;
  title_ne?: string;
  description: string;
  submit_label: string;
  success_message: string;
  status: FormStatus;
  status_label: string;
  banner: number | null;
  sidebar_cards: FormSidebarCard[];
  is_active: boolean;
  fields_count: number;
  submissions_count: number;
  published_at: string | null;
  created_at: string;
  updated_at: string;
};

export type FormDetail = Form & {
  fields: FormField[];
};

export type SubmissionStatus = 'new' | 'reviewed' | 'archived';

export type FormSubmission = {
  id: number;
  form: string;
  /** Decrypted server-side. Null when the payload cannot be decrypted. */
  data: Record<string, unknown> | null;
  status: SubmissionStatus;
  status_label: string;
  ip_address: string | null;
  user_agent: string;
  created_at: string;
  updated_at: string;
};

export type CursorPage<T> = {
  count?: number;
  next: string | null;
  previous: string | null;
  results: T[];
};

/** Capability names registered in the backend's common.rbac.CAPABILITIES. */
export type Capability =
  | 'content.view'
  | 'content.edit'
  | 'content.publish'
  | 'content.delete'
  | 'forms.view'
  | 'forms.edit'
  | 'forms.publish'
  | 'forms.delete'
  | 'submissions.view'
  | 'submissions.manage'
  | 'submissions.delete'
  | 'users.manage'
  | 'audit.view';

export type UserRole = 'superadmin' | 'admin' | 'editor' | 'viewer';

export type CurrentUser = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  capabilities: {
    role: UserRole;
    capabilities: Capability[];
  };
};
