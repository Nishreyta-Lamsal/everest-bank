import type { FaqEntry } from '@/types';

export type LoanCta = {
  label: string;
  href: string;
};

export type LoanHero = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  primaryCta: LoanCta;
  secondaryCta: LoanCta;
};

export type LoanStat = {
  value: string;
  label: string;
};

export type LoanEligibility = {
  heading: string;
  applicantTypes: string[];
  requirementsHref: string;
};

export type LoanApplyChecklistItem = {
  title: string;
  description: string;
};

export type LoanApplyChecklist = {
  heading: string;
  applyHref: string;
  image: string;
  imageAlt: string;
  items: LoanApplyChecklistItem[];
};

export type LoanFinancingCard = {
  title: string;
  image: string;
  alt: string;
  href: string;
};

export type LoanFinancing = {
  heading: string;
  ctaLabel: string;
  ctaHref: string;
  cards: LoanFinancingCard[];
};

export type LoanProcessStep = {
  number: string;
  title: string;
  image: string;
  alt: string;
};

export type LoanProcess = {
  heading: string;
  applyHref: string;
  steps: LoanProcessStep[];
};

export type LoanImpactStat = {
  value: string;
  label: string;
};

export type LoanImpact = {
  heading: string;
  description: string;
  applyHref: string;
  stats: LoanImpactStat[];
};

export type LoanGlanceItem = {
  label: string;
  value: string;
};

export type LoanGlance = {
  heading: string;
  image: string;
  imageAlt: string;
  items: LoanGlanceItem[];
  downloadHref: string;
  contactHref: string;
};

export type LoanFaqs = {
  heading: string;
  items: FaqEntry[];
};

export type Loan = {
  slug: string;
  name: string;
  hero: LoanHero;
  stats: LoanStat[];
  eligibility: LoanEligibility;
  applyChecklist: LoanApplyChecklist;
  financing: LoanFinancing;
  process: LoanProcess;
  impact: LoanImpact;
  glance: LoanGlance;
  faqs: LoanFaqs;
};

export const loans: Loan[] = [
  {
    slug: 'agricultural-loans',
    name: 'Agriculture Loan',
    hero: {
      title: 'Everest Agriculture Loan',
      description:
        'Financing designed for the people who cultivate Nepal’s future. From crop farming and livestock to irrigation and agricultural equipment, our Agriculture Loan helps turn ambition into long-term growth.',
      image: '/images/loans/agriculture/hero.jpg',
      imageAlt: 'A farmer smiling among green crops in a lush field',
      primaryCta: { label: 'Check Eligibility', href: '#' },
      secondaryCta: { label: 'Apply for loan', href: '#' },
    },
    stats: [
      { value: 'NPR 50 Lakh +', label: 'Maximum Loan Amount' },
      { value: 'From 8%', label: 'Competitive Interest Rate' },
      { value: 'Upto 75%', label: 'Project Financing' },
      { value: '12 Months+', label: 'Flexible Tenure' },
    ],
    eligibility: {
      heading: 'Check Your Eligibility & Financing Potential',
      applicantTypes: [
        'Individual Farmers',
        'Livestock & Dairy Farmers',
        'Agricultural Cooperatives',
        'Agribusiness Entrepreneurs',
        'Commercial Farming Operations',
      ],
      requirementsHref: '#',
    },
    applyChecklist: {
      heading: 'Everything You Need to Apply',
      applyHref: '#',
      image: '/images/loans/agriculture/apply.jpg',
      imageAlt:
        'A farmer in a red turban sitting on a tractor in a green field',
      items: [
        {
          title: 'Personal Identification',
          description:
            'Valid citizenship certificate, passport, or national ID card along with recent passport-sized photographs to confirm your identity.',
        },
        {
          title: 'Address Verification',
          description:
            'Proof of residential address through utility bills, ward recommendation letters, or other accepted address verification documents.',
        },
        {
          title: 'Financial & Business Proof',
          description:
            'Bank statements, income tax returns, and farm income records that demonstrate your repayment capacity and business standing.',
        },
        {
          title: 'Agricultural Documents',
          description:
            'Land ownership or lease papers, crop or livestock details, and any relevant agricultural registration certificates for your farm.',
        },
      ],
    },
    financing: {
      heading: 'Financing built around every stage of agriculture.',
      ctaLabel: 'Start Your Growth Journey',
      ctaHref: '#',
      cards: [
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
      ],
    },
    process: {
      heading: 'From application to cultivation, a simple path forward.',
      applyHref: '#',
      steps: [
        {
          number: '01',
          title: 'Discuss your project',
          image: '/images/loans/agriculture/glance.jpg',
          alt: 'A woman smiling with a group of children in a wheat field',
        },
        {
          number: '02',
          title: 'Submit documents',
          image: '/images/loans/agriculture/glance.jpg',
          alt: 'A woman smiling with a group of children in a wheat field',
        },
        {
          number: '03',
          title: 'Loan evaluation',
          image: '/images/loans/agriculture/glance.jpg',
          alt: 'A woman smiling with a group of children in a wheat field',
        },
        {
          number: '04',
          title: 'Receive financing',
          image: '/images/loans/agriculture/glance.jpg',
          alt: 'A woman smiling with a group of children in a wheat field',
        },
      ],
    },
    impact: {
      heading: 'Helping Nepal’s Agriculture Grow Stronger.',
      description:
        'Behind every successful harvest is a vision for growth. We’re proud to support the people and businesses driving Nepal’s agricultural progress with financing designed for long-term success.',
      applyHref: '#',
      stats: [
        { value: '7 Days', label: 'Processing Time' },
        { value: '94%', label: 'Satisfaction Rate' },
        { value: '87%', label: 'Repeat Borrowers' },
      ],
    },
    glance: {
      heading:
        'Everything you need to know about our Agriculture Loan at a glance.',
      image: '/images/loans/agriculture/glance.jpg',
      imageAlt: 'A woman smiling with a group of children in a wheat field',
      items: [
        { label: 'Maximum Loan Amount', value: 'Up to NPR 50 Lakh+' },
        { label: 'Interest Rate', value: 'Starting from 8% p.a.' },
        { label: 'Project Financing', value: 'Up to 75% of project cost' },
        {
          label: 'Loan Tenure',
          value: 'Flexible terms based on financing requirements',
        },
        {
          label: 'Processing Time',
          value: 'Fast and efficient application review',
        },
        {
          label: 'Security Requirement',
          value: 'Collateral as per bank policy',
        },
        {
          label: 'Repayment Options',
          value: 'Structured to suit your cash flow cycle',
        },
      ],
      downloadHref: '#',
      contactHref: '#',
    },
    faqs: {
      heading: 'Quick FAQs for Agriculture Loan',
      items: [
        {
          question:
            'What types of agricultural activities can be financed under the Agriculture Loan?',
          answer:
            'Immovable property may be provided as security via registered mortgage, the most common collateral option for term loan facilities.',
        },
        {
          question: 'Who is eligible to apply for an Agriculture Loan?',
          answer:
            'Farmers, cooperatives, and agribusinesses with an active operation and a viable repayment plan are eligible to apply.',
        },
        {
          question:
            'How much financing can I receive through the Agriculture Loan?',
          answer:
            'Loan amounts are assessed based on the scale of your operation and the purpose of financing, up to NPR 50 Lakh and above.',
        },
        {
          question: 'What documents are required when applying for the loan?',
          answer:
            'You will need citizenship documents, land ownership or lease papers, and proof of your agricultural activity or business plan.',
        },
        {
          question: 'How long does the loan approval process take?',
          answer:
            'Most applications are reviewed and approved within a few business days once all required documents are submitted.',
        },
        {
          question:
            'Can I use the loan to purchase agricultural machinery and improve farm infrastructure?',
          answer:
            'Yes, financing can be used toward machinery, irrigation systems, and other infrastructure improvements for your farm.',
        },
      ],
    },
  },
];
