import { Suspense } from 'react';

import { icon } from '@/components/admin/icons';
import { Card } from '@/components/admin/ui/card';
import LoginForm from './_components/LoginForm';

export default function LoginPage() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-blue-50 px-4 py-12">
      <main className="flex w-full max-w-[400px] flex-col items-center gap-8">
        <icon.mainLogo className="h-[28px] w-[200px] text-blue-900" />
        <Card variant="primary" className="flex w-full flex-col gap-6 p-6">
          <div className="flex w-full flex-col gap-1">
            <p className="text-heading-4 text-slate-900">Welcome back</p>
            <p className="text-paragraph-sm text-slate-600">
              Sign in to your account to continue.
            </p>
          </div>
          <Suspense fallback={<div className="h-[260px] w-full" />}>
            <LoginForm />
          </Suspense>
        </Card>
      </main>
    </div>
  );
}
