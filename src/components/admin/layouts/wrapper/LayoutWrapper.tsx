import { type ReactNode } from 'react';

type LayoutWrapperProps = {
  children: ReactNode;
};

export default function LayoutWrapper({ children }: LayoutWrapperProps) {
  return <div className="max-w-[1440px] p-4 md:p-8 xl:mx-auto">{children}</div>;
}
