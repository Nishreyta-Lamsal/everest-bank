import Link from 'next/link';

export default function FooterBottomBar() {
  const date = new Date();

  const currentYear = date.getFullYear();

  return (
    <div className="flex w-full items-end justify-between">
      <div className="flex flex-col gap-3">
        <div className="flex gap-20">
          <Link
            href="#"
            className="font-heading text-grey-400 text-title-4-desktop transition-colors hover:text-red-500"
          >
            Site Map
          </Link>
          <Link
            href="#"
            className="font-heading text-grey-400 text-title-4-desktop transition-colors hover:text-red-500"
          >
            Privacy Policy
          </Link>
        </div>
        <p className="text-grey-400 text-body-4-desktop opacity-80">
          Copyright © {currentYear} Everest Bank Limited. All Rights Reserved.
        </p>
      </div>
      <div className="text-grey-400 text-body-4-desktop flex items-center gap-3 opacity-80">
        <a
          href="https://bigbracketshq.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Designed by: Bigbrackets
        </a>
        <span aria-hidden="true">|</span>
        <a href="https://prixa.org" target="_blank" rel="noopener noreferrer">
          Powered by: Snowberry
        </a>
      </div>
    </div>
  );
}
