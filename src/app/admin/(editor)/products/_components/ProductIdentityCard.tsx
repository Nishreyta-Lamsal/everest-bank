'use client';

import { useState } from 'react';

import { isAxiosError } from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';

import ProductSectionCard from './ProductSectionCard';
import ProductSectionEditor from './sections/ProductSectionEditor';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Select } from '@/components/admin/ui/select';
import { usePageEditor } from '@/store/PageEditorContext';

import { cn } from '@/lib/utils';

import { usePages } from '@/hooks/api/admin/use-pages';
import { useReplicatePage } from '@/hooks/api/admin/use-replicate';

import type { PageReplicateResult } from '@/types/admin';

import {
  productIdentitySchema,
  type ProductIdentityFormValues,
} from '@/schemas/admin/product-identity-schema';

/** Prefers the API's own validation message over a generic failure notice. */
function readApiError(error: unknown) {
  const fallback = 'Could not replicate this design.';

  if (!isAxiosError(error)) return fallback;

  const data = error.response?.data as
    { message?: string; errors?: Record<string, string[]> } | undefined;

  const fieldError = Object.entries(data?.errors ?? {})
    .map(([field, messages]) => `${field}: ${messages.join(' ')}`)
    .join(' · ');

  return fieldError || data?.message || fallback;
}

export default function ProductIdentityCard() {
  const replicatePage = useReplicatePage();
  const { setPreviewSlug } = usePageEditor();

  // The replicated page is edited in place rather than on a separate route, so
  // its sections are kept here and rendered below the details.
  const [replicated, setReplicated] = useState<PageReplicateResult>();

  const {
    control,
    register,
    watch,
    resetField,
    handleSubmit,
    formState: { errors },
  } = useForm<ProductIdentityFormValues>({
    resolver: zodResolver(productIdentitySchema),
    defaultValues: {
      name: '',
      type: '',
      slug: '',
      replicateFromId: undefined,
    },
  });

  const type = watch('type');

  const { data } = usePages({ kind: 'product_type' });

  const productTypeId = type ? Number(type) : undefined;

  const { data: productsData } = usePages(
    { kind: 'product', parent: productTypeId },
    { enabled: Boolean(type) },
  );

  const productTypeOptions = (data?.pages ?? []).map((page) => ({
    label: page.title,
    value: String(page.id),
  }));

  const products = productsData?.pages ?? [];

  const onSubmit = handleSubmit((values) => {
    replicatePage.mutate(
      {
        source_id: values.replicateFromId,
        // The new product keeps the chosen type as its parent; the API copies
        // the source page's sections onto it.
        product_type: { id: Number(values.type) },
        // The API's slug pattern is `^[-a-zA-Z0-9_]+$`, so the leading slash
        // the field displays has to come off before sending.
        product: {
          slug: values.slug.replace(/^\/+/, ''),
          title: values.name,
        },
      },
      {
        onSuccess: (result) => {
          setReplicated(result);
          // The layout renders the preview, so it learns the new slug here
          // rather than from the route, which stays on `new`.
          setPreviewSlug(result.slug);
        },
      },
    );
  });

  return (
    <>
      <ProductSectionCard title="Product Details">
        <form
          onSubmit={onSubmit}
          noValidate
          className="flex w-full flex-col gap-3"
        >
          <div className="flex w-full items-center gap-3">
            <FieldLabel label="Product name">
              <Input
                variant="default"
                size="medium"
                placeholder="Enter product name"
                aria-invalid={Boolean(errors.name)}
                {...register('name')}
              />
              {errors.name && (
                <p className="text-paragraph-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </FieldLabel>

            <FieldLabel label="Slug">
              <Input
                variant="default"
                size="medium"
                placeholder="Enter slug"
                aria-invalid={Boolean(errors.slug)}
                {...register('slug')}
              />
              {errors.slug && (
                <p className="text-paragraph-sm text-red-600">
                  {errors.slug.message}
                </p>
              )}
            </FieldLabel>
          </div>

          <FieldLabel label="Type">
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <Select
                  variant="default"
                  size="medium"
                  options={productTypeOptions}
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    resetField('replicateFromId');
                  }}
                  className={cn(errors.type && 'border-red-600')}
                />
              )}
            />
            {errors.type && (
              <p className="text-paragraph-sm text-red-600">
                {errors.type.message}
              </p>
            )}
          </FieldLabel>

          <FieldLabel label="Replicate design from">
            {products.length === 0 && (
              <p className="text-paragraph-mini text-neutral-700/68">
                No products found for this type.
              </p>
            )}

            {products.length > 0 && (
              <Controller
                control={control}
                name="replicateFromId"
                render={({ field }) => (
                  <div role="radiogroup" className="flex flex-wrap gap-2">
                    {products.map((product) => {
                      const selected = product.id === field.value;

                      return (
                        <button
                          key={product.id}
                          type="button"
                          role="radio"
                          aria-checked={selected}
                          onClick={() => field.onChange(product.id)}
                          className={cn(
                            'text-paragraph-sm-medium cursor-pointer rounded-full border px-4 py-2 transition-colors',
                            selected
                              ? 'border-transparent bg-slate-950 text-white'
                              : 'border-black-alpha-10 bg-white-alpha-50 text-neutral-700',
                          )}
                        >
                          {product.title}
                        </button>
                      );
                    })}
                  </div>
                )}
              />
            )}
            {errors.replicateFromId && (
              <p className="text-paragraph-sm text-red-600">
                {errors.replicateFromId.message}
              </p>
            )}
          </FieldLabel>

          {replicatePage.isError && (
            <p className="text-paragraph-sm text-red-600">
              {readApiError(replicatePage.error)}
            </p>
          )}

          {!type && (
            <p className="text-paragraph-sm text-neutral-700/68">
              Choose a type to replicate a design.
            </p>
          )}

          {type && (
            <Button
              type="submit"
              variant="outline"
              size="default"
              disabled={replicatePage.isPending}
            >
              {replicatePage.isPending ? 'Replicating…' : 'Replicate design'}
            </Button>
          )}
        </form>
      </ProductSectionCard>

      {replicated?.sections.map((section) => (
        <ProductSectionEditor
          key={section.id}
          slug={replicated.slug}
          section={section}
        />
      ))}
    </>
  );
}
