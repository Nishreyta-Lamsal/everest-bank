import type { CorporateMissionAndVisionBodyBlock } from '../_components/CorporateMissionAndVisionContentSection';

export const corporateMissionAndVisionBodyBlocks: CorporateMissionAndVisionBodyBlock[] =
  [
    {
      heading: 'A bank built on trust, growing with Nepal.',
      paragraphs: [
        'Everest Bank Limited (EBL) began operations in 1994 with a simple commitment to provide reliable, accessible, and customer-friendly banking to people and businesses across Nepal.',
        'In 1997, EBL entered a joint venture with Punjab National Bank, India one of the largest banks in South Asia bringing global expertise and stronger governance to our service.',
        "Today, with a nationwide network of branches and ATMs and a growing suite of digital services, Everest Bank stands as one of Nepal's most trusted financial institutions.",
      ],
    },
    {
      type: 'images',
      layout: 'full_width',
      images: [
        {
          src: '/images/about/corporate-mission-and-vision/hero-history.png',
          alt: 'Everest Bank staff and partners cutting a ribbon at a branch opening',
        },
      ],
    },
    {
      type: 'card',
      icon: 'eye',
      heading: 'Our Vision',
      paragraphs: [
        'To evolve and position the bank as a progressive, cost-effective, and customer-friendly institution providing comprehensive financial and related services to people across Nepal.',
      ],
    },
    {
      type: 'card',
      icon: 'target',
      heading: 'Our Mission',
      paragraphs: [
        'To deliver excellent professional service, build lasting relationships, and empower a motivated team strengthening our position as a leader in financial services.',
      ],
    },
    {
      type: 'quote',
      title: '“Consistent, strong and dependable: दिगो, दरिलो, विश्वासिलो.”',
    },
    {
      type: 'images',
      images: [
        {
          src: '/images/about/corporate-mission-and-vision/gallery-1.png',
          alt: 'Staff outside an Everest Bank ATM counter during a branch opening',
        },
        {
          src: '/images/about/corporate-mission-and-vision/gallery-2.png',
          alt: 'Everest Bank staff cutting a ribbon at a branch opening ceremony',
        },
      ],
    },
  ];
