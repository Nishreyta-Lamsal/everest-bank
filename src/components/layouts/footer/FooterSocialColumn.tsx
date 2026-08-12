import Link from 'next/link';

import { footerSocialLinks } from '@/data';

import { cn } from '@/lib/utils';

type FooterSocialColumnProps = {
  className?: string;
};

export default function FooterSocialColumn({
  className,
}: FooterSocialColumnProps) {
  return (
    <div className={cn('flex shrink-0 flex-col gap-6', className)}>
      <p className="font-heading text-title-2-desktop-md text-grey-500">
        Socials:
      </p>
      <div className="flex flex-col items-start gap-6">
        {footerSocialLinks.map(({ label, href, icon: Icon }) => (
          <Link
            key={label}
            href={href}
            className="text-grey-400 hover:text-red-500 flex items-center gap-2 text-body-4-desktop transition-colors"
          >
            <Icon className="size-4 shrink-0" />
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
