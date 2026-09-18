export type ForexRowRead = {
  id: number;
  currency_code: string;
  currency_name: string;
  currency_name_ne?: string;
  unit?: number;
  cash_purchase: string;
  doc_cash_purchase?: string;
  document_sales: string;
  position?: number;
};

export type ForexRowWrite = {
  currency_code: string;
  currency_name: string;
  currency_name_ne?: string;
  unit?: number;
  cash_purchase: string;
  doc_cash_purchase?: string;
  document_sales: string;
  position?: number;
};

export type ForexDay = {
  date: string;
  time?: string;
  is_published: boolean;
  published_at: string | null;
  source?: string;
  rows_count?: number;
  rows?: ForexRowRead[];
  created_at?: string;
  updated_at: string;
};

export type ForexDayTables = {
  date: string;
  tables_count: number;
  tables: ForexDay[];
};
