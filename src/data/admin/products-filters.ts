export type ProductsFilter = {
  label: string;
  count: number;
  active?: boolean;
};

export const productsFilters: ProductsFilter[] = [
  { label: 'All', count: 9, active: true },
  { label: 'Loans', count: 4 },
  { label: 'Cards', count: 2 },
  { label: 'Accounts', count: 2 },
  { label: 'Remittance', count: 1 },
];
