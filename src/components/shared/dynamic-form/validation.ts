import type { PublicFormField } from '@/api/services/form.service';
import type { RegisterOptions } from 'react-hook-form';

/**
 * react-hook-form rules built from the field schema.
 *
 * This mirrors apps/forms/validation.py so a visitor sees the problem before
 * submitting. The server validates again regardless - this is convenience,
 * never the security boundary.
 */
export function buildRules(field: PublicFormField): RegisterOptions {
  const rules: RegisterOptions = {};

  if (field.is_required) {
    rules.required =
      field.field_type === 'checkbox'
        ? `Please confirm ${field.label.toLowerCase()}.`
        : `${field.label} is required.`;
  }

  if (field.validation.min_length !== undefined) {
    rules.minLength = {
      value: field.validation.min_length,
      message: `Must be at least ${field.validation.min_length} characters.`,
    };
  }

  if (field.validation.max_length !== undefined) {
    rules.maxLength = {
      value: field.validation.max_length,
      message: `Must be at most ${field.validation.max_length} characters.`,
    };
  }

  if (field.field_type === 'email') {
    rules.pattern = {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: 'Enter a valid email address.',
    };
  }

  if (field.field_type === 'tel') {
    rules.pattern = {
      value: /^\+?[0-9 ()-]{5,20}$/,
      message: 'Enter a valid phone number.',
    };
  }

  // An admin-configured pattern wins over the type default, and a broken one
  // is ignored rather than blocking the visitor - same rule as the backend.
  if (field.validation.pattern) {
    try {
      rules.pattern = {
        value: new RegExp(field.validation.pattern),
        message: 'Please check the format of this answer.',
      };
    } catch {
      delete rules.pattern;
    }
  }

  return rules;
}

/**
 * Options for a field, narrowed by an already-answered parent field.
 *
 * District and branch options carry `province` and `district` keys, so picking
 * a province shortens the branch list instead of showing every branch in Nepal.
 */
export function filterOptions(
  field: PublicFormField,
  values: Record<string, unknown>,
) {
  return field.options.filter((option) => {
    if (option.province && !matches(values, 'province', option.province)) {
      return false;
    }
    if (option.district && !matches(values, 'district', option.district)) {
      return false;
    }
    return true;
  });
}

/** An unanswered parent narrows nothing, so every option stays available. */
function matches(
  values: Record<string, unknown>,
  key: string,
  expected: string,
) {
  const answer = values[key];
  if (answer === undefined || answer === null || answer === '') return true;
  return String(answer) === expected;
}
