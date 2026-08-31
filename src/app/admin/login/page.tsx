import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import AdminLoginForm from './_components/AdminLoginForm';

export default function AdminLoginPage() {
  return (
    <main className="w-full py-16 lg:py-24">
      <LayoutWrapper>
        <div className="mx-auto flex w-full max-w-[420px] flex-col items-start gap-8">
          <div className="flex flex-col gap-2">
            <h1 className="font-heading text-heading-h3-mobile-md lg:text-heading-h3-desktop-md text-grey-500">
              Admin Login
            </h1>
            <p className="text-body-3-mobile lg:text-body-3-desktop text-grey-300">
              Enter the password to continue.
            </p>
          </div>

          <AdminLoginForm />
        </div>
      </LayoutWrapper>
    </main>
  );
}
