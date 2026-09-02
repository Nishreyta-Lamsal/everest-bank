import ProductListItem from './ProductListItem';

import type { ProductListEntry } from '@/types';

type ProductListProps = {
  products: ProductListEntry[];
};

export default function ProductList({ products }: ProductListProps) {
  return (
    <div className="flex w-full flex-col items-start">
      {products.map((product, index) => (
        <ProductListItem
          key={product.title}
          product={product}
          isLast={index === products.length - 1}
        />
      ))}
    </div>
  );
}
