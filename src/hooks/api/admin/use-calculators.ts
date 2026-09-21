import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { calculatorService } from '@/api/services/admin/calculator.service';

import type { CalculatorConfigWrite, CalculatorSlug } from '@/types/admin';

export function calculatorsQueryKey() {
  return ['calculators'] as const;
}

export function calculatorQueryKey(slug: CalculatorSlug) {
  return [...calculatorsQueryKey(), slug] as const;
}

export function useCalculators() {
  return useQuery({
    queryKey: calculatorsQueryKey(),
    queryFn: () => calculatorService.list(),
  });
}

export function useCalculator<S extends CalculatorSlug>(slug: S) {
  return useQuery({
    queryKey: calculatorQueryKey(slug),
    queryFn: () => calculatorService.retrieve(slug),
    enabled: Boolean(slug),
  });
}

export function useUpdateCalculator<S extends CalculatorSlug>(slug: S) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CalculatorConfigWrite<S>) =>
      calculatorService.update(slug, payload),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: calculatorsQueryKey() });
    },
  });
}
