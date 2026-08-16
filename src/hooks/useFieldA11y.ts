import { useId } from 'react';

export function useFieldA11y(
  id: string | undefined,
  hint: string | undefined,
  error: string | undefined,
) {
  const generatedId = useId();
  const fieldId = id ?? generatedId;
  const hintId = `${fieldId}-hint`;
  const errorId = `${fieldId}-error`;
  const isError = Boolean(error);
  const describedBy = isError ? errorId : hint ? hintId : undefined;

  return { fieldId, hintId, errorId, isError, describedBy };
}
