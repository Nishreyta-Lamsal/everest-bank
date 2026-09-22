import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { toast } from 'sonner';

import { authService } from '@/api/services/admin/auth.service';

import type { LoginRequest } from '@/api/services/admin/auth.service';
import type { Capability } from '@/types/admin';

import { ADMIN_ROUTE } from '@/constants/admin';

export function useLogin() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const searchParams = useSearchParams();

  return useMutation({
    mutationFn: ({ email, password }: LoginRequest) =>
      authService.login({ email, password }),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['auth', 'me'] });

      const next = searchParams.get('next');
      router.replace(next?.startsWith('/') ? next : ADMIN_ROUTE.DASHBOARD);
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSuccess: () => {
      queryClient.clear();
      toast.success('Logged out successfully.');
      router.replace(ADMIN_ROUTE.LOGIN);
    },
    onError: () => {
      toast.error('Could not log out. Please try again.');
    },
  });
}

export function meQueryKey() {
  return ['auth', 'me'] as const;
}

export function useMe() {
  return useQuery({
    queryKey: meQueryKey(),
    queryFn: () => authService.me(),
    staleTime: 5 * 60 * 1000,
  });
}

/**
 * Mirrors the backend capability check so the CMS can disable a control
 * instead of letting the user click it and take a 403.
 */
export function useCapability(capability: Capability) {
  const { data } = useMe();

  return Boolean(data?.capabilities.capabilities.includes(capability));
}
