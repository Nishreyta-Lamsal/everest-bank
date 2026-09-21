'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { usePageEditor } from '@/store/PageEditorContext';
import { Input } from '@/components/admin/ui/input';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';
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

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentPeopleContent>(slug, section, () => ({
      category: content.category ?? 'board',
      people,
    }));

  function updatePerson(index: number, next: Person) {
    setPeople(people.map((person, i) => (i === index ? next : person)));
  }

  function removePerson(index: number) {
    setPeople(people.filter((_, i) => i !== index));
    setFocusedItemId('');
  }

  function addPerson() {
    const nextPosition = people.reduce(
      (highest, person) => Math.max(highest, person.position ?? 0),
      0,
    );

    setPeople([
      ...people,
      {
        id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
        name: '',
        title: '',
        position: nextPosition + 1,
      },
    ]);
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
            // The trash sits outside the card, in the gutter to its right.
            <div key={itemId} className="flex w-full items-start gap-2">
              <AccordionItem
                className="flex-1"
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
                    onSelect={(image) =>
                      updatePerson(index, { ...person, image })
                    }
                  />
                </AccordionPanel>
              </AccordionItem>

              <button
                type="button"
                onClick={() => removePerson(index)}
                aria-label={`Remove ${person.name || `member ${index + 1}`}`}
                className="shrink-0 cursor-pointer py-2.5 text-slate-600"
              >
                <icon.trash className="size-4" />
              </button>
            </div>
          );
        })}
      </Accordion>

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={addPerson}
      >
        <icon.plus />
        Add member
      </Button>
    </SectionEditorShell>
  );
}
