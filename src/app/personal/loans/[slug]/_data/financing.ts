export type FinancingCard = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

export const financingCards: FinancingCard[] = [
  {
    title: 'Crop Farming',
    image: '/images/loans/agriculture/crop-farming.png',
    alt: 'A farmer holding freshly harvested grain',
    href: '#',
  },
  {
    title: 'Livestock & Dairy',
    image: '/images/loans/agriculture/livestock-dairy.png',
    alt: 'A cow on a dairy farm',
    href: '#',
  },
  {
    title: 'Machinery & Irrigation',
    image: '/images/loans/agriculture/machinery-irrigation.png',
    alt: 'A farmer spraying crops in a field',
    href: '#',
  },
];
