import ProductSections from './_components/ProductSections';

type EditProductPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { slug } = await params;

  return (
    <div className="mx-auto flex w-full flex-col gap-6">
      <ProductSections slug={slug} />
    </div>
  );
}
