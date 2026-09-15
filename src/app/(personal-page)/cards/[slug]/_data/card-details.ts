export type CardHero = {
  heading: string;
  image: string;
  imageAlt: string;
  buttonLabel: string;
  buttonHref: string;
};

export type CardFace = {
  image: string;
  imageAlt: string;
};

export type CardOverview = {
  heading: string;
  description: string;
  cardFaces: CardFace[];
  brandsHeading: string;
  brands: string[];
};

export type CardFeatureListData = {
  heading: string;
  items: string[];
};

export type CardLimitsTableRow = {
  label: string;
  nepal?: string;
  india?: string;
  isGroupHeader?: boolean;
};

export type CardLimitsTableData = {
  heading: string;
  columnHeaders: [string, string, string];
  rows: CardLimitsTableRow[];
};

export type CardTextSection = {
  heading: string;
  description: string;
};

export type CardContentBlock =
  | { type: 'text'; lead?: string; body: string }
  | { type: 'list'; items: string[] };

export type CardHowToUseSection = {
  heading: string;
  blocks: CardContentBlock[];
};

export type CardSafetyTipsSection = {
  heading: string;
  items: string[];
  termsLead: string;
  termsBody: string;
  termsLinkLabel: string;
  contactLead: string;
  contactBody: string;
  huntingLineLabel: string;
  huntingLineValue: string;
  mailLabel: string;
  mailValue: string;
};

export type CardDetail = {
  slug: string;
  breadcrumbLabel: string;
  hero: CardHero;
  overview: CardOverview;
  features: CardFeatureListData[];
  limitsTables: CardLimitsTableData[];
  eligibility: CardTextSection;
  procedure: CardFeatureListData;
  howToUse: CardHowToUseSection;
  safetyTips: CardSafetyTipsSection;
};

const placeholderFeatureItems: string[] = [
  'Can be used to draw cash from SCT Network & UPI affiliated ATMs in Nepal and NPCI (National Payment Corporation of India) affiliated ATMs in India.',
  'Accepted as the mode of payment at merchant locations (POS outlets) within the territory of Nepal and India.',
  'Instant Issuance and economical charges.',
  'Round the clock service.',
  'No charges are levied for using EBL Debit card at EBL ATM terminals.',
  'No charges are levied for the purchase of goods and services from merchant (POS) outlets.',
  'SCT Debit cards are issued free of cost to all Saving Premium account holders.',
];

const placeholderLimitsRows: CardLimitsTableRow[] = [
  { label: 'a) Transaction Limits in ATM', isGroupHeader: true },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  { label: 'b) Transaction Limits in POS', isGroupHeader: true },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
  {
    label: 'Maximum cash drawing limit',
    nepal: 'NPR 20,000',
    india: 'NPR 20,000',
  },
];

const placeholderLimitsColumnHeaders: [string, string, string] = [
  'Transaction Limits',
  'Nepal',
  'India',
];

export const cardDetails: CardDetail[] = [
  {
    slug: 'debit-card',
    breadcrumbLabel: 'Debit Card',
    hero: {
      heading: 'Debit Card',
      image: '/images/cards/debit-card/hero.png',
      imageAlt:
        'A hand holding an Everest Bank Visa debit card in front of Kathmandu Durbar Square at sunset',
      buttonLabel: 'Apply for your card',
      buttonHref: '#',
    },
    overview: {
      heading: 'EBL (Everest Bank) Debit Card',
      description:
        'It acts as an electronic Cheque, which enables you to have direct access to your bank account, for fulfilling your daily payment and cash requirements. It is an alternative payment method to cash and cheques, which enable you to pay directly during purchases of goods and services from merchants (POS Outlets) or draw cash from ATM terminals.',
      cardFaces: [
        {
          image: '/images/cards/debit-card/nepalpay-card-face.png',
          imageAlt: 'Everest Bank NepalPay Debit Card, Mount Everest design',
        },
        {
          image: '/images/cards/debit-card/visa-card-face.png',
          imageAlt: 'Everest Bank Visa Debit Card, Mount Everest design',
        },
      ],
      brandsHeading: 'Everest Bank is serving two brands of card product :',
      brands: [
        'SCT – UPI co-brand Debit Card: EBL Card product, affiliated with SmartChoice Technologies (SCT) with co-branding of Union Pay International (UPI)',
        'Visa Debit Card: EBL Card product, affiliated with Visa Worldwide (VISA)',
      ],
    },
    features: [
      {
        heading: 'Features Of Sct – Upi Co-Brand Debit Card',
        items: placeholderFeatureItems,
      },
      {
        heading: 'Features of Visa brand Debit Card',
        items: placeholderFeatureItems,
      },
    ],
    limitsTables: [
      {
        heading: 'Transaction Limits',
        columnHeaders: placeholderLimitsColumnHeaders,
        rows: placeholderLimitsRows,
      },
      {
        heading: 'Transaction Limits',
        columnHeaders: placeholderLimitsColumnHeaders,
        rows: placeholderLimitsRows,
      },
      {
        heading: 'Card Service Fees',
        columnHeaders: placeholderLimitsColumnHeaders,
        rows: placeholderLimitsRows,
      },
      {
        heading: 'Transaction Fees',
        columnHeaders: placeholderLimitsColumnHeaders,
        rows: placeholderLimitsRows,
      },
    ],
    eligibility: {
      heading: 'Eligibility for EBL Debit card',
      description:
        'It acts as an electronic Cheque, which enables you to have direct access to your bank account, for fulfilling your daily payment and cash requirements. It is an alternative payment method to cash and cheques, which enable you to pay directly during purchases of goods and services from merchants (POS Outlets) or draw cash from ATM terminals.',
    },
    procedure: {
      heading: 'Procedure to Apply for EBL Debit Card',
      items: placeholderFeatureItems,
    },
    howToUse: {
      heading: 'How To Use EBL Debit Card?',
      blocks: [
        {
          type: 'text',
          lead: 'Memorize your PIN:',
          body: 'Once you receive Debit card, tear up PIN mailer and notice four-digit PIN number inside folded PIN mailer.',
        },
        {
          type: 'text',
          lead: 'First time Forceful PIN Change:',
          body: 'Once you receive SCT Debit card, activate it first by changing PIN provided by the bank with your own, from any Everest Bank ATM or any other SCT Switch integrated ATMs. Upon activation, use your SCT Debit Card for your desired purposes. For Visa Debit Card, forceful first time PIN change is not required compulsorily but we recommend to change PIN for the first time as far as possible.',
        },
        {
          type: 'text',
          lead: 'Use of Card at POS:',
          body: 'For making payment from Debit card to merchant outlets, instead of paying cash, you may follow as under:',
        },
        {
          type: 'list',
          items: [
            'Give your card to merchant officials, who swipe your card at POS devices and press desired payment amounts. The merchant officials may guide you. Enter PIN if require.',
            'Two receipts will then be printed for you to sign. The merchant will keep one copy and hand over the second copy to you.',
          ],
        },
        {
          type: 'text',
          lead: 'Use of Card at ATM:',
          body: 'For drawing cash from ATM terminals, follow as under :',
        },
        {
          type: 'list',
          items: [
            'Give your card to merchant officials, who swipe your card at POS devices and press desired payment amounts. The merchant officials may guide you. Enter PIN if require.',
            'Give your card to merchant officials, who swipe your card at POS devices and press desired payment amounts. The merchant officials may guide you. Enter PIN if require.',
          ],
        },
      ],
    },
    safetyTips: {
      heading: 'Safety Tips & Security Measures',
      items: placeholderFeatureItems,
      termsLead: 'Terms and Conditions:',
      termsBody:
        'The usage of Debit Card by the Cardholder has adhered with specific terms and conditions, which are mentioned at “Debit Card Application Form”. For viewing click to',
      termsLinkLabel: 'Terms & Conditions',
      contactLead: 'Contact Details:',
      contactBody:
        'For further information, any difficulties and quires relating to EBL Debit Card, you can contact or mail directly to :',
      huntingLineLabel: 'Hunting line:',
      huntingLineValue: '00977-1-5970118',
      mailLabel: 'Mail address:',
      mailValue: 'customercare@ebl.com.np',
    },
  },
];
