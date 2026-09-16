import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import DynamicForm from '@/components/shared/dynamic-form/DynamicForm';

import { formService } from '@/api/services/form.service';

type FormPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: FormPageProps) {
  const { slug } = await params;

  try {
    const form = await formService.getForm(slug);

    return { title: form.title, description: form.description };
  } catch {
    return { title: 'Form' };
  }
}

export default async function FormPage({ params }: FormPageProps) {
  const { slug } = await params;

  // Only published forms are served here, so an unpublished or unknown slug
  // is a 404 rather than an error page.
  let form;
  try {
    form = await formService.getForm(slug);
  } catch {
    notFound();
  }

  return (
    <main className="bg-[#f4f2f0]">
      {form.banner?.file_url && (
        <div className="relative h-[180px] w-full md:h-[300px]">
          <Image
            src={form.banner.file_url}
            alt={form.banner.alt_text || form.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
      )}

      <div className="border-y border-black/5 bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-2 px-4 py-5 md:flex-row md:items-center md:justify-between">
          <h1 className="text-xl font-bold tracking-wide text-[#a4262c] uppercase">
            {form.title}
          </h1>
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-xs text-neutral-600">
              <li>
                <Link href="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li aria-hidden>›</li>
              <li aria-current="page">{form.title}</li>
            </ol>
          </nav>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 px-4 py-8 lg:flex-row lg:items-start">
        <DynamicForm form={form} className="flex-1" />

        {form.sidebar_cards.length > 0 && (
          <aside className="flex w-full flex-col gap-4 lg:w-[280px] lg:shrink-0">
            {form.sidebar_cards.map((card, index) => {
              const body = (
                <>
                  <p className="px-4 py-3 text-sm font-semibold text-neutral-800">
                    {card.title}
                  </p>
                  {card.image_url && (
                    <div className="relative mx-4 mb-4 aspect-square">
                      <Image
                        src={card.image_url}
                        alt={card.title}
                        fill
                        sizes="280px"
                        className="object-cover"
                      />
                    </div>
                  )}
                </>
              );

              return card.href ? (
                <Link
                  key={index}
                  href={card.href}
                  className="flex flex-col border border-black/5 bg-white transition-shadow hover:shadow-md"
                >
                  {body}
                </Link>
              ) : (
                <div
                  key={index}
                  className="flex flex-col border border-black/5 bg-white"
                >
                  {body}
                </div>
              );
            })}
          </aside>
        )}
      </div>
    </main>
  );
}
