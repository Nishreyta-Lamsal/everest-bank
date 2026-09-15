export type AccountFinderCategory = {
  slug: string;
  label: string;
};

export type AccountFinderCard = {
  title: string;
  href: string;
  categories: string[];
  image: string;
  imageAlt: string;
  overlayImage?: string;
  overlayImageAlt?: string;
};
