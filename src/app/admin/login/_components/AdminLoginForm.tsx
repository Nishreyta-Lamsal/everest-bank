'use client';

import { useActionState } from 'react';

import TextField from '@/components/ui/inputs/TextField';
import Button from '@/components/ui/buttons/Button';

import { login } from '../actions';

const initialState = { error: '' };

export default function AdminLoginForm() {
  const [state, formAction, isPending] = useActionState(login, initialState);

  return (
    <form action={formAction} className="flex w-full flex-col gap-6">
      <TextField
        label="Password"
        type="password"
        name="password"
        placeholder="Enter password"
        autoComplete="current-password"
        error={state.error}
        required
      />

      <Button type="submit" size="lg" className="w-full" disabled={isPending}>
        {isPending ? 'Checking...' : 'Login'}
      </Button>
    </form>
  );
}
