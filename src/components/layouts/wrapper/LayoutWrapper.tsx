import type { ReactNode } from 'react';

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return (
    <div className="max-w-[1440px] px-4 md:px-8 xl:mx-auto xl:px-22">
      {children}
    </div>
  );
}
