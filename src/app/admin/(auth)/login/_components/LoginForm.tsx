'use client';

import { useState } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { icon } from '@/components/admin/icons';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

import { useLogin } from '@/hooks/api/admin/use-auth';

import {
  loginSchema,
  type LoginFormValues,
} from '@/schemas/admin/login-schema';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const login = useLogin();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = handleSubmit((values) => {
    login.mutate(values);
  });

  return (
    <form onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-5">
      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-paragraph-sm-medium text-slate-900"
        >
          Email
        </label>
        <Input
          id="email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          aria-invalid={Boolean(errors.email)}
          {...register('email')}
        />
        {errors.email && (
          <p className="text-paragraph-sm text-red-600">
            {errors.email.message}
          </p>
        )}
      </div>

      <div className="flex w-full flex-col gap-1.5">
        <label
          htmlFor="password"
          className="text-paragraph-sm-medium text-slate-900"
        >
          Password
        </label>
        <Input
          id="password"
          type={showPassword ? 'text' : 'password'}
          autoComplete="current-password"
          placeholder="••••••••"
          aria-invalid={Boolean(errors.password)}
          rightIcon={
            <button
              type="button"
              onClick={() => setShowPassword((value) => !value)}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
              className="text-slate-500"
            >
              <icon.eye className="size-4" />
            </button>
          }
          {...register('password')}
        />
        {errors.password && (
          <p className="text-paragraph-sm text-red-600">
            {errors.password.message}
          </p>
        )}
      </div>

      {login.isError && (
        <p className="text-paragraph-sm text-red-600">
          Invalid email or password. Please try again.
        </p>
      )}

      <Button type="submit" size="large" disabled={login.isPending}>
        {login.isPending ? 'Signing in…' : 'Sign in'}
      </Button>
    </form>
  );
}
