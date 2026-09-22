import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { locationService } from '@/api/services/admin/location.service';

import type {
  ListLocationsParams,
  LocationTypeWritePayload,
  LocationWritePayload,
} from '@/api/services/admin/location.service';

export function locationsQueryKey(params?: ListLocationsParams) {
  return ['locations', 'list', params ?? {}] as const;
}

export function locationTypesQueryKey() {
  return ['locations', 'types'] as const;
}

export function districtsQueryKey() {
  return ['districts', 'list'] as const;
}

export function useLocations(params?: ListLocationsParams) {
  return useQuery({
    queryKey: locationsQueryKey(params),
    queryFn: () => locationService.list(params),
    // The list carries type_counts, so tabs keep their numbers while a
    // filtered page loads instead of flashing empty.
    placeholderData: (previous) => previous,
  });
}

export function useLocationTypes() {
  return useQuery({
    queryKey: locationTypesQueryKey(),
    queryFn: () => locationService.listTypes(),
  });
}

export function useDistricts() {
  return useQuery({
    queryKey: districtsQueryKey(),
    queryFn: () => locationService.listDistricts(),
    // Nepal's districts do not change; no need to refetch them per visit.
    staleTime: Infinity,
  });
}

/** Writes change the type counts too, so the whole locations tree refreshes. */
function invalidateLocations(queryClient: ReturnType<typeof useQueryClient>) {
  queryClient.invalidateQueries({ queryKey: ['locations'] });
}

export function useCreateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LocationWritePayload) =>
      locationService.create(payload),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location added.');
    },
    onError: () => {
      toast.error('Could not add the location. Please try again.');
    },
  });
}

export function useUpdateLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: number;
      payload: Partial<LocationWritePayload>;
    }) => locationService.update(id, payload),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location updated.');
    },
    onError: () => {
      toast.error('Could not update the location. Please try again.');
    },
  });
}

export function useDeleteLocation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => locationService.remove(id),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location deleted.');
    },
    onError: () => {
      toast.error('Could not delete the location. Please try again.');
    },
  });
}

export function useCreateLocationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LocationTypeWritePayload) =>
      locationService.createType(payload),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location type added.');
    },
    onError: () => {
      toast.error('Could not add the location type. Please try again.');
    },
  });
}

export function useUpdateLocationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      slug,
      payload,
    }: {
      slug: string;
      payload: Partial<LocationTypeWritePayload>;
    }) => locationService.updateType(slug, payload),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location type updated.');
    },
    onError: () => {
      toast.error('Could not update the location type. Please try again.');
    },
  });
}

export function useDeleteLocationType() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (slug: string) => locationService.removeType(slug),
    onSuccess: () => {
      invalidateLocations(queryClient);
      toast.success('Location type deleted.');
    },
    onError: () => {
      toast.error('Could not delete the location type. Please try again.');
    },
  });
}
