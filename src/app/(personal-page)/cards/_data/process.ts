export type CardProcessStep = {
  number: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

export const cardProcessSteps: CardProcessStep[] = [
  {
    number: '01',
    title: 'Pick your card',
    description:
      'Compare the three families and choose the network that fits how you spend.',
    image: '/images/cards/process.jpg',
    alt: 'A hand holding a wallet fanned open with several bank cards',
  },
  {
    number: '02',
    title: 'Apply in minutes',
    description:
      'Fill the form online or visit any branch with your citizenship and income documents.',
    image: '/images/cards/process.jpg',
    alt: 'A hand holding a wallet fanned open with several bank cards',
  },
  {
    number: '03',
    title: 'Activate & tap',
    description:
      "Receive your card, activate it in the app, and you're ready to pay.",
    image: '/images/cards/process.jpg',
    alt: 'A hand holding a wallet fanned open with several bank cards',
  },
];
