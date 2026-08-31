'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ROUTE,
  SITE_ACCESS_COOKIE,
  SITE_ACCESS_MAX_AGE,
  SITE_ACCESS_VALUE,
} from '@/constants';

const ADMIN_PASSWORD = 'everest@2026';

export async function login(_state: { error: string }, formData: FormData) {
  if (formData.get('password') !== ADMIN_PASSWORD) {
    return { error: 'Incorrect password. Please try again.' };
  }

  const cookieStore = await cookies();

  cookieStore.set(SITE_ACCESS_COOKIE, SITE_ACCESS_VALUE, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: SITE_ACCESS_MAX_AGE,
  });

  redirect(ROUTE.PERSONAL);
}
