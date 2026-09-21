'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { usePageEditor } from '@/store/PageEditorContext';
import { Input } from '@/components/admin/ui/input';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/admin/ui/accordion';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentPeopleContent, PageSectionRead } from '@/types/admin';

type ContentPeopleEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type Person = NonNullable<ContentPeopleContent['people']>[number];

export default function ContentPeopleEditor({
  slug,
  section,
}: ContentPeopleEditorProps) {
  const { setFocusedItemId } = usePageEditor();

  const content = localizedContent<ContentPeopleContent>(section.content);

  const [people, setPeople] = useState<Person[]>(content.people ?? []);

  const {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading,
    isError,
    error,
  } = useSectionEditor<ContentPeopleContent>(slug, section, () => ({
    category: content.category ?? 'board',
    people,
  }));

  function updatePerson(index: number, next: Person) {
    setPeople(people.map((person, i) => (i === index ? next : person)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Board of directors members"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      <Accordion>
        {people.map((person, index) => {
          const itemId = person.id ?? String(index);

          return (
            <AccordionItem
              key={itemId}
              value={itemId}
              onFocusCapture={() => setFocusedItemId(itemId)}
              onBlurCapture={(event) => {
                if (event.currentTarget.contains(event.relatedTarget)) return;

                setFocusedItemId('');
              }}
            >
              <AccordionTrigger>
                <span className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                  {person.name || ''}
                </span>
              </AccordionTrigger>
              <AccordionPanel>
                <FieldLabel label="Name">
                  <Input
                    variant="filled"
                    size="medium"
                    value={person.name ?? ''}
                    onChange={(event) =>
                      updatePerson(index, {
                        ...person,
                        name: event.target.value,
                      })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Title">
                  <Input
                    variant="filled"
                    size="medium"
                    value={person.title ?? ''}
                    onChange={(event) =>
                      updatePerson(index, {
                        ...person,
                        title: event.target.value,
                      })
                    }
                  />
                </FieldLabel>

                <FieldLabel label="Position">
                  <Input
                    variant="filled"
                    size="medium"
                    type="number"
                    value={person.position ?? 0}
                    onChange={(event) =>
                      updatePerson(index, {
                        ...person,
                        position: Number(event.target.value) || 0,
                      })
                    }
                  />
                </FieldLabel>

                <MediaField
                  label="Photo"
                  media={person.image}
                  isUploading={isUploading}
                  onUpload={(file) =>
                    uploadImage(file, (image) =>
                      updatePerson(index, { ...person, image }),
                    )
                  }
                />
              </AccordionPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </SectionEditorShell>
  );
}
