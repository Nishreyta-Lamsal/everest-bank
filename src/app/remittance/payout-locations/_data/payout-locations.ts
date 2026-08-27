export type PayoutLocation = {
  id: number;
  name: string;
  address: string;
  phone: string;
};

export const payoutLocations: PayoutLocation[] = [
  {
    id: 1,
    name: 'New Baneshwor Branch',
    address: 'New Baneshwor, Kathmandu',
    phone: '01-4783100',
  },
  {
    id: 2,
    name: 'Lazimpat Branch',
    address: 'Lazimpat, Kathmandu',
    phone: '01-4443377',
  },
  {
    id: 3,
    name: 'Pulchowk Branch',
    address: 'Pulchowk, Lalitpur',
    phone: '01-5010146',
  },
  {
    id: 4,
    name: 'Biratnagar Branch',
    address: 'Goswara Road, Biratnagar',
    phone: '021-530900',
  },
  {
    id: 5,
    name: 'Pokhara Branch',
    address: 'New Road, Pokhara',
    phone: '061-540845',
  },
  {
    id: 6,
    name: 'Butwal Branch',
    address: 'Traffic Chowk, Butwal',
    phone: '071-543900',
  },
];
