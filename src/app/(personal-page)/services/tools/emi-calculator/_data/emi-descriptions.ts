import { ROUTE } from '@/constants';

export type DescriptionTextPart = string | { label: string; href: string };

export type DescriptionBlock =
  | { type: 'paragraph'; content: DescriptionTextPart[] }
  | { type: 'list'; items: string[] };

export type DescriptionSection = {
  title: string;
  blocks: DescriptionBlock[];
};

export const emiDescriptions: DescriptionSection[] = [
  {
    title: 'What is an EMI?',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'An EMI (Equated Monthly Installment) is a certain amount of money that a borrower pays to repay a debt to the lender each month. EMI includes the loan amount and interest that needs to be paid until the whole loan is fully repaid.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'When we take out a loan, the bank calculates the Equated Monthly Installment based on the loan amount, the interest rate, and the loan tenure (the period over which the loan will be repaid). EMI helps us by dividing a loan in small installments so that it will be easier to manage finance.',
        ],
      },
    ],
  },
  {
    title: 'How Does an EMI Calculator Work?',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'Our EMI calculator is easy to use. We need to provide the following details:',
        ],
      },
      {
        type: 'list',
        items: [
          'Loan Amount: We need to enter the total amount we borrow from the bank.',
          'Interest Rate: The rate at which the bank charges interest on the loan amount.',
          'Loan Tenure: The period over which we plan to repay the loan (months or years).',
        ],
      },
    ],
  },
  {
    title: 'How do you calculate EMI?',
    blocks: [
      {
        type: 'paragraph',
        content: ['To calculate the EMI, the bank uses a formula:'],
      },
      {
        type: 'paragraph',
        content: ['EMI = [P x R x (1+R) ^N]/ [(1+R) ^ (N-1)]\nwhere –'],
      },
      {
        type: 'list',
        items: [
          'P is the principal amount',
          'R is the rate of interest',
          'N is the loan tenure',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'After entering all the details, our calculator computes the EMI showing Monthly EMI, Interest Payable, Total Amount Payable instantly.',
        ],
      },
      {
        type: 'paragraph',
        content: [
          'In case of fixed-rate loans, EMI remains constant throughout the period. However, if we choose a floating-rate loan, the EMI might change with changing interest rates.',
        ],
      },
    ],
  },
  {
    title: 'Benefits of Using Loan EMI Calculator',
    blocks: [
      {
        type: 'list',
        items: [
          'Instant and Accurate Results',
          'Helps in Financial Planning',
          'Compare Multiple Loan Offers',
          'Save Time and Effort',
          'Free and Accessible Anytime',
        ],
      },
    ],
  },
  {
    title: 'Factors Affecting EMI Calculation',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'EMI depends on various factors that influence our monthly payment amount. Some factors that affect the EMI of a loan are:',
        ],
      },
      {
        type: 'list',
        items: [
          'Loan Amount: If our loan amount is large then there will be higher EMI and vice versa.',
          'Interest Rate: Higher interest rates result in higher EMIs. Even a small change in the interest rate can significantly impact our monthly EMI.',
          'Loan Tenure: A longer loan tenure reduces our monthly EMI but increases the total interest we need to repay the loan completely. A shorter tenure means higher EMIs, but lower total interest paid.',
          'Type of Interest: Fixed and floating interest rates affect EMI differently.',
        ],
      },
    ],
  },
  {
    title: 'How much loan can I take ?',
    blocks: [
      {
        type: 'paragraph',
        content: [
          'You can use our ',
          {
            label: 'loan eligibility checker',
            href: ROUTE.ELIGIBILITY_CHECKER,
          },
          ' to know how much loan you can take based on your current income and liabilities.',
        ],
      },
    ],
  },
];
