import type {
  AccountFinderCard,
  AccountFinderCategory,
} from '@/app/(personal-page)/deposit-accounts/saving-account/_types';
import type { SavingAccountFinderContent } from '@/types/admin';

export function toAccountFinderView(
  content: SavingAccountFinderContent | undefined,
) {
  const categories: AccountFinderCategory[] = (content?.categories ?? []).map(
    (category, index) => ({
      slug: String(index),
      label: category.label ?? '',
    }),
  );

  const cards: AccountFinderCard[] = (content?.categories ?? []).flatMap(
    (category, index) =>
      (category.accounts ?? []).map((account) => ({
        title: account.title ?? '',
        href: account.href || '#',
        categories: [String(index)],
        image: account.image?.src ?? '',
        imageAlt: account.image?.alt ?? '',
      })),
  );

  return { categories, cards };
}
