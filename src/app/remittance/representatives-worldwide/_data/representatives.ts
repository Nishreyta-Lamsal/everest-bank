export type Representative = {
  id: string;
  country: string;
  bankName: string;
  contactPerson: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
};

export const representatives: Representative[] = [
  {
    id: '1',
    country: 'India',
    bankName: 'Everest Bank Limited',
    contactPerson: 'Mr. Dinesh Dhawal, Bank Representative',
    address:
      'Flat No. 414, 4th Floor, Antriksh Bhawan, Kasturba Gandhi Marg, New Delhi – 110001',
    email: 'eblrepdelhi@ebl.com.np',
    phone: '0091-11-23710327',
    fax: '0091-11-23710326',
  },
  {
    id: '2',
    country: 'UAE',
    bankName: 'Everest Bank Limited',
    contactPerson: 'Mr. Dinesh Dhawal, Bank Representative',
    address:
      'Flat No. 414, 4th Floor, Antriksh Bhawan, Kasturba Gandhi Marg, New Delhi – 110001',
    email: 'eblrepdelhi@ebl.com.np',
    phone: '0091-11-23710327',
    fax: '0091-11-23710326',
  },
];
