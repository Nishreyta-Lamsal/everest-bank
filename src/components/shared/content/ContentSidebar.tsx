'use client';

import Link from 'next/link';

import { useQuery } from '@tanstack/react-query';

import { icon } from '@/components/icons';

import { socialLinksService } from '@/api/services/social-links.service';

import { socialIconMap } from '@/constants/social-icon-map';

export type ContentSidebarLink = {
  title: string;
  href: string;
};

export const footerSocialLinksQueryKey = ['footer-social-links'] as const;

type ContentSidebarProps = {
  heading?: string;
  links: ContentSidebarLink[];
};

export default function ContentSidebar({
  heading = 'Related Pages',
  links,
}: ContentSidebarProps) {
  const { data } = useQuery({
    queryKey: footerSocialLinksQueryKey,
    queryFn: () => socialLinksService.getSocialLinks(),
  });

  const socialLinks = data?.data.map((link) => ({
    label: link.label,
    href: link.href,
    icon: socialIconMap[link.slug] ?? icon.x,
  }));

  return (
    <aside className="sticky top-30 w-full max-lg:hidden lg:max-w-[405px]">
      <div className="flex flex-col items-start gap-4">
        <div className="bg-grey-bluish-grey flex w-full flex-col items-start gap-4 rounded-3xl p-6">
          <h3 className="font-heading text-heading-h5-desktop-md text-grey-500">
            {heading}
          </h3>
          <ul className="flex w-full flex-col items-start gap-2.5 pl-3">
            {links.map((link) => (
              <li key={link.title} className="w-full">
                <Link
                  href={link.href}
                  className="text-body-2-desktop text-grey-500 flex w-full items-center py-2 transition-colors hover:text-red-600"
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {socialLinks && socialLinks.length > 0 && (
          <div className="flex items-center gap-4 py-4">
            <p className="text-body-3-desktop-md text-grey-600">
              Follow us on:
            </p>
            <div className="flex items-center gap-4.5">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  aria-label={label}
                  className="text-grey-400 transition-colors hover:text-red-500"
                >
                  <Icon className="size-[18px]" />
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
