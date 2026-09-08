import type { ProfileBodyBlock } from '../_components/ProfileContentSection';

export const profileBodyBlocks: ProfileBodyBlock[] = [
  {
    heading: 'Brief Profile',
    paragraphs: [
      'Catering to more than 15 lacs customers, Everest Bank Limited (EBL) is a name you can depend on for professionalized & efficient banking services. Founded in 1994, the Bank has been one of the leading banks of the country and has been catering its services to various segments of the society. With clients from all walks of life, the Bank has helped the nation to develop corporately, agriculturally & industrially.',
    ],
  },
  {
    type: 'images',
    images: [
      {
        src: '/images/about/profile/brief-profile-1.png',
        alt: 'Staff outside an Everest Bank ATM counter during a branch opening',
      },
      {
        src: '/images/about/profile/brief-profile-2.png',
        alt: 'Everest Bank staff cutting a ribbon at a branch opening ceremony',
      },
    ],
  },
  {
    heading: 'Network',
    paragraphs: [
      'Everest Bank Limited (EBL) provides customer-friendly services through its wide Network connected through ABBS system, which enables customers for operational transactions from any branches. The bank has 133 Branches, 161 ATM Counters, 33 Revenue Collection Counters and 4 Extension Counters across the country making it a very efficient and accessible bank for its customers, anytime, anywhere.',
    ],
  },
  {
    heading: 'Joint Venture Partner *',
    paragraphs: [
      'Punjab National Bank (PNB), India’s first Swadeshi Bank, commenced its operations on April 12, 1895 from Lahore, with an authorized capital of Rs. 2 lac and working capital of Rs. 20,000. The Bank was established by the spirit of nationalism and was the first bank purely managed by Indians with Indian Capital. During the long history of the Bank, 9 banks have been merged/ amalgamated with PNB.',
      'The bank has now total 54,179 domestic delivery channels with a network of 10,261 domestic branches, 2 International branches, 11,109 ATM’s and 32,809 Business Correspondents.',
      'The Bank is having 2 International branches in Gift city, Ahmedabad and Dubai. The Bank has two overseas subsidiaries viz. PNB International Ltd. London, UK and Druk PNB Bank Ltd. Bhutan. Bank has its representative offices in Myanmar and Bangladesh.',
      'As a joint-venture partner (holding 20% equity), PNB has been providing top management support to Everest Bank Limited under Technical Service Agreement.',
      '* Data based as of December 2025.',
    ],
  },
  {
    type: 'images',
    layout: 'full_width',
    images: [
      {
        src: '/images/about/profile/network.png',
        alt: 'Everest Bank staff and partners cutting a ribbon at a branch opening',
      },
    ],
  },
];
