import { useRouter, useSearchParams } from 'next/navigation';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { authService } from '@/api/services/admin/auth.service';

import type { LoginRequest } from '@/api/services/admin/auth.service';

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
