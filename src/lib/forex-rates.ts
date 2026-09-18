import type { ForexRowRead } from '@/types/admin';
import type { ForexRate } from '@/app/(personal-page)/forex-rates/_types/forex';

/** Only these currencies ship with a flag asset; the rest render a placeholder. */
const CURRENCY_FLAGS: Record<string, string> = {
  AUD: '/images/flags/aud.svg',
  JPY: '/images/flags/japan.png',
};

function toNumber(value: string | undefined) {
  const parsed = Number(value);

  return Number.isFinite(parsed) ? parsed : 0;
}

export function toForexRates(rows: ForexRowRead[]): ForexRate[] {
  return rows.map((row) => ({
    code: row.currency_code,
    // The table shows "Name (CODE)", which the API splits across two fields.
    name: `${row.currency_name} (${row.currency_code})`,
    flag: CURRENCY_FLAGS[row.currency_code] ?? null,
    unit: row.unit ?? 1,
    cashPurchase: toNumber(row.cash_purchase),
    docAndCashPurchase: toNumber(row.doc_cash_purchase),
    documentSales: toNumber(row.document_sales),
  }));
}

/**
 * Today as `YYYY-MM-DD`, built from local parts — `toISOString()` would shift
 * to UTC and land on the wrong day for part of the day in Nepal.
 */
export function todayIsoDate() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');

  return `${now.getFullYear()}-${month}-${day}`;
}

/** The table header shows the rate date as DD/MM/YYYY. */
export function formatForexDate(date: string | undefined) {
  if (!date) return '';

  const [year, month, day] = date.split('-');

  return year && month && day ? `${day}/${month}/${year}` : date;
}
