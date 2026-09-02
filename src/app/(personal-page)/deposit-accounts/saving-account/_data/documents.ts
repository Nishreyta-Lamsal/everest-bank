import type { ProcessStep } from '@/types';

export const accountDocuments: ProcessStep[] = [
  {
    title: 'Citizenship',
    description:
      'A valid Nepali citizenship certificate, or a passport for non-resident applicants, to confirm your identity.',
  },
  {
    title: 'Address Verification',
    description:
      'Proof of residential address through utility bills, ward recommendation letters, or other accepted address verification documents.',
  },
  {
    title: 'Photograph',
    description:
      'Two recent passport-sized photographs taken against a plain background.',
  },
  {
    title: 'Additional Documents',
    description:
      'Depending on the account type, we may ask for a PAN card, minor birth certificate, or proof of income.',
  },
];

export const accountDocumentsImage = {
  src: '/images/loans/agriculture/apply.jpg',
  alt: 'A farmer in a red turban sitting on a tractor in a green field',
};
