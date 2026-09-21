export type Representative = {
  id: string;
  bankName: string;
  contactPerson: string;
  address: string;
  email: string;
  phone: string;
  fax: string;
};

export type RepresentativeGroup = {
  id: string;
  heading: string;
  representatives: Representative[];
};
