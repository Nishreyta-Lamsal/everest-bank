export type AccountFinderAccount = {
  title: string;
  href: string;
  image: string | null;
  imageAlt: string;
  overlayImage?: string;
  overlayImageAlt?: string;
};

export type AccountFinderCategory = {
  label: string;
  accounts: AccountFinderAccount[];
};
