import PageSectionEditor from './_components/PageSectionEditor';

type PagesEditPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PagesEditPage({ params }: PagesEditPageProps) {
  const { slug } = await params;

  return <PageSectionEditor slug={slug} />;
}
