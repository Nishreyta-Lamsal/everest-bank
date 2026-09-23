type InvestmentTextBlock = {
  type?: undefined;
  heading: string;
  paragraphs: string[];
};

type InvestmentImagesBlock = {
  type: 'images';
  layout?: 'full_width';
  images: {
    src: string;
    alt: string;
  }[];
};

export type InvestmentBodyBlock = InvestmentTextBlock | InvestmentImagesBlock;

export const investmentBodyBlocks: InvestmentBodyBlock[] = [
  {
    heading: 'Depository Participant (DP):',
    paragraphs: [
      'As a Depository Participant (DP), Everest Bank Limited  (EBL) shall open DMAT account of beneficial owner (BO), de-materialize securities, re- materialize securities, maintain record of securities in the electronic form, DMAT account can be opened at DP license holder institutions from CDS and Clearing Limited. Everest Bank Limited (EBL) is a DP License holder institution from CDS and Clearing Limited.',
    ],
  },
  {
    heading: 'C-ASBA/Mero -Share:',
    paragraphs: [
      'Application Supported by Blocked Amount (ASBA) is a process for applying to public/rights issues submitted by investors by blocking the application money in their bank account while subscribing to the issue. C-ASBA will ensure centralized posting and verification of bank account numbers and DMAT account numbers ease monitoring of double application for issue managers and share registrars, cancellation of application upon double applications and prepare a final report for securities allocation. Mero Share application is the on-line system developed by CDSC through which the shareholders can apply application for IPO/FPO/Rights issues once they are registered through C-ASBA. C-ASBA is also provided by Everest Bank Limited from all over its branches inside and outside Kathmandu. To avail the facility, just fill up the C-ASBA registration form and submit to any nearest EBL branches.',
    ],
  },
];
