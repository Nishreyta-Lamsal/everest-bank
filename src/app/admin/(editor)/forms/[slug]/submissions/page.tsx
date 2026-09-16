import SubmissionsShell from './_components/SubmissionsShell';

type SubmissionsPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function SubmissionsPage({
  params,
}: SubmissionsPageProps) {
  const { slug } = await params;

  return <SubmissionsShell slug={slug} />;
}
