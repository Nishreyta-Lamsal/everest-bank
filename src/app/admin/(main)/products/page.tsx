import LayoutWrapper from '@/components/admin/layouts/wrapper/LayoutWrapper';
import ProductsHeader from './_components/ProductsHeader';
import ProductsFilterTabs from './_components/products-filters/ProductsFilterTabs';
import ProductsListCard from './_components/products-list/ProductsListCard';

export default function ProductsPage() {
  return (
    <LayoutWrapper>
      <div className="flex w-full flex-col gap-6">
        <ProductsHeader />
        <ProductsFilterTabs />
        <ProductsListCard />
      </div>
    </LayoutWrapper>
  );
}
