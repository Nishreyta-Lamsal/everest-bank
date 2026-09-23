import { ROUTE } from '@/constants';

export type CardTile = {
  title: string;
  href: string;
  image: string;
  roundedCorner: 'left' | 'right';
};

export const cardTiles: CardTile[] = [
  {
    title: 'Flexible Credit for Your Everyday Needs',
    href: ROUTE.CARDS,
    image: '/images/cards/card-showcase-bg.png',
    roundedCorner: 'right',
  },
  {
    title: 'Find the Card That Fits Your Lifestyle',
    href: ROUTE.CARDS,
    image: '/images/cards/card-showcase-bg.png',
    roundedCorner: 'left',
  },
];
