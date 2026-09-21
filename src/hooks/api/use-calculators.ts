import { useQuery } from '@tanstack/react-query';

import { calculatorPublicService } from '@/api/services/calculator.service';

import type { CalculatorSlug } from '@/types/admin';

export function publicCalculatorQueryKey(slug: CalculatorSlug) {
  return ['public-calculators', slug] as const;
}

/** The live config behind a public calculator page. */
export function usePublicCalculator<S extends CalculatorSlug>(slug: S) {
  return useQuery({
    queryKey: publicCalculatorQueryKey(slug),
    queryFn: () => calculatorPublicService.retrieve(slug),
    enabled: Boolean(slug),
  });
}
