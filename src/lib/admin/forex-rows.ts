import type { ForexRowRead, ForexRowWrite } from '@/types/admin';

export function emptyForexRow(position: number): ForexRowWrite {
  return {
    currency_code: '',
    currency_name: '',
    unit: 1,
    cash_purchase: '',
    doc_cash_purchase: '',
    document_sales: '',
    position,
  };
}

export function toForexRowsWrite(rows?: ForexRowRead[]): ForexRowWrite[] {
  return (rows ?? []).map((row) => ({
    currency_code: row.currency_code,
    currency_name: row.currency_name,
    currency_name_ne: row.currency_name_ne,
    unit: row.unit,
    cash_purchase: row.cash_purchase,
    doc_cash_purchase: row.doc_cash_purchase,
    document_sales: row.document_sales,
    position: row.position,
  }));
}
