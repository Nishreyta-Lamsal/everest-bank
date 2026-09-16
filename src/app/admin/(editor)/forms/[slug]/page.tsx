import FormEditorShell from './_components/FormEditorShell';

type FormEditorPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function FormEditorPage({ params }: FormEditorPageProps) {
  const { slug } = await params;

  return <FormEditorShell slug={slug} />;
}
