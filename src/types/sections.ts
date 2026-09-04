export type ProductListEntry = {
  index: string;
  title: string;
  description: string;
  href: string;
};

export type StatEntry = {
  value: string;
  label: string;
};

export type RecommendationRow = {
  label: string;
  value: string;
};

export type ProcessStep = {
  title: string;
  description: string;
};

export type MapLocation = {
  id: number;
  name: string;
  address: string;
  phone: string;
  mapUrl: string;
};

export type MapView = 'map' | 'grid';

export type StepEntry = {
  number: string;
  title: string;
  image: string;
  alt: string;
};
