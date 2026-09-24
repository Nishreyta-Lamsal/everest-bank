'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import ImageDropzone from '@/components/admin/shared/ImageDropzone';
import ImagePreview from '@/components/admin/shared/ImagePreview';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import { toSectionMedia } from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  PageSectionRead,
  SavingAccountFinderContent,
} from '@/types/admin';

type SavingAccountFinderEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type FinderCategory = NonNullable<
  SavingAccountFinderContent['categories']
>[number];
type FinderAccount = NonNullable<FinderCategory['accounts']>[number];

export default function SavingAccountFinderEditor({
  slug,
  section,
}: SavingAccountFinderEditorProps) {
  const content = localizedContent<SavingAccountFinderContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [categories, setCategories] = useState<FinderCategory[]>(
    content.categories ?? [],
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<SavingAccountFinderContent>(slug, section, () => ({
      heading,
      categories,
    }));

  function updateCategory(index: number, next: FinderCategory) {
    setCategories(
      categories.map((category, i) => (i === index ? next : category)),
    );
  }

  function updateAccount(
    categoryIndex: number,
    accountIndex: number,
    next: FinderAccount,
  ) {
    const category = categories[categoryIndex];

    updateCategory(categoryIndex, {
      ...category,
      accounts: (category.accounts ?? []).map((account, i) =>
        i === accountIndex ? next : account,
      ),
    });
  }

  function addAccount(categoryIndex: number) {
    const category = categories[categoryIndex];

    updateCategory(categoryIndex, {
      ...category,
      accounts: [
        ...(category.accounts ?? []),
        { title: '', href: '', image: { src: '', alt: '' } },
      ],
    });
  }

  function removeAccount(categoryIndex: number, accountIndex: number) {
    const category = categories[categoryIndex];

    updateCategory(categoryIndex, {
      ...category,
      accounts: (category.accounts ?? []).filter((_, i) => i !== accountIndex),
    });
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading and the savings accounts listed under each category"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <FieldLabel label="Heading">
        <Input
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      {categories.map((category, categoryIndex) => (
        <div
          key={categoryIndex}
          className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
        >
          <FieldLabel label={`Category ${categoryIndex + 1}`}>
            <Input
              variant="filled"
              size="medium"
              value={category.label ?? ''}
              onChange={(event) =>
                updateCategory(categoryIndex, {
                  ...category,
                  label: event.target.value,
                })
              }
            />
          </FieldLabel>

          {category.accounts?.length ? (
            category.accounts.map((account, accountIndex) => (
              <div
                key={accountIndex}
                className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
              >
                <div className="flex w-full items-center justify-between gap-2">
                  <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                    Account {accountIndex + 1}
                    {account.title ? ` · ${account.title}` : ''}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeAccount(categoryIndex, accountIndex)}
                    aria-label={`Remove ${account.title || `account ${accountIndex + 1}`}`}
                    className="shrink-0 cursor-pointer text-slate-600"
                  >
                    <icon.trash className="size-4" />
                  </button>
                </div>

                <FieldLabel label="Title">
                  <Input
                    variant="filled"
                    size="medium"
                    value={account.title ?? ''}
                    onChange={(event) =>
                      updateAccount(categoryIndex, accountIndex, {
                        ...account,
                        title: event.target.value,
                      })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Image">
                  {account.image?.src ? (
                    <ImagePreview
                      src={account.image.src}
                      alt={account.image.alt}
                      onReplace={(picked) =>
                        updateAccount(categoryIndex, accountIndex, {
                          ...account,
                          image: toSectionMedia(picked),
                        })
                      }
                    />
                  ) : (
                    <ImageDropzone
                      onMediaSelected={(picked) =>
                        updateAccount(categoryIndex, accountIndex, {
                          ...account,
                          image: toSectionMedia(picked),
                        })
                      }
                    />
                  )}
                </FieldLabel>

                <FieldLabel label="Links to">
                  <LinkTargetSelect
                    value={account.href ?? ''}
                    onChange={(href) =>
                      updateAccount(categoryIndex, accountIndex, {
                        ...account,
                        href,
                      })
                    }
                  />
                </FieldLabel>
              </div>
            ))
          ) : (
            <p className="text-[13px] text-slate-500">
              No accounts in this category yet.
            </p>
          )}

          <Button
            type="button"
            variant="secondary"
            size="large"
            className="w-full"
            onClick={() => addAccount(categoryIndex)}
          >
            <icon.plus />
            Add account
          </Button>
        </div>
      ))}
    </SectionEditorShell>
  );
}
