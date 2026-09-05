import { ROUTE } from '@/constants';

export type CardTile = {
  title: string;
  href: string;
  roundedCorner: 'left' | 'right';
};

export const cardTiles: CardTile[] = [
  {
    title: 'Flexible Credit for Your Everyday Needs',
    href: ROUTE.CARDS,
    roundedCorner: 'right',
  },
  {
    title: 'Find the Card That Fits Your Lifestyle',
    href: ROUTE.CARDS,
    roundedCorner: 'left',
  },
];
