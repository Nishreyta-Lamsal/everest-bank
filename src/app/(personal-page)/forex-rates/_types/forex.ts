export type ForexColumn = {
  key: string;
  label: string;
  subLabel?: string;
  width: string;
};

export type ForexRate = {
  code: string;
  name: string;
  flag: string | null;
  unit: number;
  cashPurchase: number;
  docAndCashPurchase: number;
  documentSales: number;
};
