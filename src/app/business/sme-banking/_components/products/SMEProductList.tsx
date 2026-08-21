import SMEProductItem from './SMEProductItem';

import type { SMEProduct } from '../../_data/products';

type SMEProductListProps = {
  products: SMEProduct[];
};

export default function SMEProductList({ products }: SMEProductListProps) {
  return (
    <div className="flex w-full flex-col items-start">
      {products.map((product, index) => (
        <SMEProductItem
          key={product.title}
          product={product}
          isLast={index === products.length - 1}
        />
      ))}
    </div>
  );
}
