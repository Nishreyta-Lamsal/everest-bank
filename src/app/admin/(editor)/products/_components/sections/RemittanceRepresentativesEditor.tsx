'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
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

import type {
  PageSectionRead,
  RemittanceRepresentativesContent,
} from '@/types/admin';

type RemittanceRepresentativesEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type RepresentativeGroup = NonNullable<
  RemittanceRepresentativesContent['groups']
>[number];
type Representative = RepresentativeGroup['representatives'][number];

// The id is the list key on the public page; new rows need one the API
// hasn't assigned yet.
function emptyRepresentative(): Representative {
  return {
    id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    fax: '',
    name: '',
    email: '',
    phone: '',
    address: '',
    contact_name: '',
  };
}

export default function RemittanceRepresentativesEditor({
  slug,
  section,
}: RemittanceRepresentativesEditorProps) {
  const { setFocusedItemId } = usePageEditor();

  const content = localizedContent<RemittanceRepresentativesContent>(
    section.content,
  );

  const [groups, setGroups] = useState<RepresentativeGroup[]>(
    content.groups ?? [],
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<RemittanceRepresentativesContent>(slug, section, () => ({
      groups,
    }));

  function updateGroup(groupIndex: number, next: RepresentativeGroup) {
    setGroups(groups.map((group, i) => (i === groupIndex ? next : group)));
  }

  function updateRepresentative(
    groupIndex: number,
    representativeIndex: number,
    next: Representative,
  ) {
    const group = groups[groupIndex];

    updateGroup(groupIndex, {
      ...group,
      representatives: group.representatives.map((representative, i) =>
        i === representativeIndex ? next : representative,
      ),
    });
  }

  // There is no delete endpoint; publishing the shorter array is the delete.
  function removeRepresentative(
    groupIndex: number,
    representativeIndex: number,
  ) {
    const group = groups[groupIndex];

    updateGroup(groupIndex, {
      ...group,
      representatives: group.representatives.filter(
        (_, i) => i !== representativeIndex,
      ),
    });
    // The removed row may have been the one highlighted in the preview.
    setFocusedItemId('');
  }

  function addRepresentative(groupIndex: number) {
    const group = groups[groupIndex];

    updateGroup(groupIndex, {
      ...group,
      representatives: [...group.representatives, emptyRepresentative()],
    });
  }

  function addGroup() {
    setGroups([
      ...groups,
      { heading: '', representatives: [emptyRepresentative()] },
    ]);
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Regions and the representative banks listed under each one"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
      error={error}
    >
      {groups.map((group, groupIndex) => (
        <div
          key={groupIndex}
          className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
        >
          <FieldLabel label="Region heading">
            <Input
              variant="filled"
              size="medium"
              value={group.heading ?? ''}
              onChange={(event) =>
                updateGroup(groupIndex, {
                  ...group,
                  heading: event.target.value,
                })
              }
            />
          </FieldLabel>

          <Accordion>
            {group.representatives.map(
              (representative, representativeIndex) => {
                const itemId =
                  representative.id ?? `${groupIndex}-${representativeIndex}`;

                return (
                  // The trash sits outside the card, in the gutter to its right.
                  <div key={itemId} className="flex w-full items-start gap-2">
                    <AccordionItem
                      className="flex-1"
                      value={itemId}
                      onFocusCapture={() => setFocusedItemId(itemId)}
                      onBlurCapture={(event) => {
                        if (event.currentTarget.contains(event.relatedTarget))
                          return;

                        setFocusedItemId('');
                      }}
                    >
                      <AccordionTrigger>
                        <span className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                          {representative.name ||
                            `Representative ${representativeIndex + 1}`}
                        </span>
                      </AccordionTrigger>
                      <AccordionPanel>
                        <FieldLabel label="Bank name">
                          <Input
                            variant="filled"
                            size="medium"
                            value={representative.name ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                { ...representative, name: event.target.value },
                              )
                            }
                          />
                        </FieldLabel>

                        <FieldLabel label="Contact person">
                          <Input
                            variant="filled"
                            size="medium"
                            value={representative.contact_name ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                {
                                  ...representative,
                                  contact_name: event.target.value,
                                },
                              )
                            }
                          />
                        </FieldLabel>

                        <FieldLabel label="Address">
                          <Input
                            variant="filled"
                            size="medium"
                            value={representative.address ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                {
                                  ...representative,
                                  address: event.target.value,
                                },
                              )
                            }
                          />
                        </FieldLabel>

                        <FieldLabel label="Email">
                          <Input
                            variant="filled"
                            size="medium"
                            type="email"
                            value={representative.email ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                {
                                  ...representative,
                                  email: event.target.value,
                                },
                              )
                            }
                          />
                        </FieldLabel>

                        <FieldLabel label="Phone">
                          <Input
                            variant="filled"
                            size="medium"
                            value={representative.phone ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                {
                                  ...representative,
                                  phone: event.target.value,
                                },
                              )
                            }
                          />
                        </FieldLabel>

                        <FieldLabel label="Fax">
                          <Input
                            variant="filled"
                            size="medium"
                            value={representative.fax ?? ''}
                            onChange={(event) =>
                              updateRepresentative(
                                groupIndex,
                                representativeIndex,
                                { ...representative, fax: event.target.value },
                              )
                            }
                          />
                        </FieldLabel>
                      </AccordionPanel>
                    </AccordionItem>

                    <button
                      type="button"
                      onClick={() =>
                        removeRepresentative(groupIndex, representativeIndex)
                      }
                      aria-label={`Remove ${
                        representative.name ||
                        `representative ${representativeIndex + 1}`
                      }`}
                      className="shrink-0 cursor-pointer py-2.5 text-slate-600"
                    >
                      <icon.trash className="size-4" />
                    </button>
                  </div>
                );
              },
            )}
          </Accordion>

          <Button
            type="button"
            variant="secondary"
            size="large"
            className="w-full"
            onClick={() => addRepresentative(groupIndex)}
          >
            <icon.plus />
            Add representative
          </Button>
        </div>
      ))}

      <Button
        type="button"
        variant="secondary"
        size="large"
        className="w-full"
        onClick={addGroup}
      >
        <icon.plus />
        Add region
      </Button>
    </SectionEditorShell>
  );
}
