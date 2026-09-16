import ProductIdentityCard from '../_components/ProductIdentityCard';
import { Card } from '@/components/admin/ui/card';

export default function NewProductPage() {
  return (
    <div className="mx-auto w-full">
      <Card className="flex w-full flex-col gap-6">
        <ProductIdentityCard />
      </Card>
    </div>
  );
}
