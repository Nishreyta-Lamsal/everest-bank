'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { usePageEditor } from '@/store/PageEditorContext';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';
import { Button } from '@/components/admin/ui/button';
import { icon } from '@/components/admin/icons';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
} from '@/components/admin/ui/accordion';

import { localizedContent } from '@/lib/admin/section-content';

import type { ContentJobsContent, PageSectionRead } from '@/types/admin';

type ContentJobsEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type JobGroup = NonNullable<ContentJobsContent['groups']>[number];
type Job = JobGroup['jobs'][number];

// The id is the list key on the public page; new rows need one the API
// hasn't assigned yet.
function emptyJob(): Job {
  return {
    id: `new-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    title: '',
    location: '',
    apply_href: '',
    apply_label: '',
    description: '',
    employment_type: '',
  };
}

export default function ContentJobsEditor({
  slug,
  section,
}: ContentJobsEditorProps) {
  const { setFocusedItemId } = usePageEditor();

  const content = localizedContent<ContentJobsContent>(section.content);

  const [groups, setGroups] = useState<JobGroup[]>(content.groups ?? []);

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<ContentJobsContent>(slug, section, () => ({
      groups,
    }));

  function updateGroup(groupIndex: number, next: JobGroup) {
    setGroups(groups.map((group, i) => (i === groupIndex ? next : group)));
  }

  function updateJob(groupIndex: number, jobIndex: number, next: Job) {
    const group = groups[groupIndex];

    updateGroup(groupIndex, {
      ...group,
      jobs: group.jobs.map((job, i) => (i === jobIndex ? next : job)),
    });
  }

  function addJob(groupIndex: number) {
    const group = groups[groupIndex];

    updateGroup(groupIndex, { ...group, jobs: [...group.jobs, emptyJob()] });
  }

  function addGroup() {
    setGroups([...groups, { heading: '', jobs: [emptyJob()] }]);
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Job categories and the openings listed under each one"
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
          <FieldLabel label="Category heading">
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
            {group.jobs.map((job, jobIndex) => {
              const itemId = job.id ?? `${groupIndex}-${jobIndex}`;

              return (
                <AccordionItem
                  key={itemId}
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
                      {job.title || `Opening ${jobIndex + 1}`}
                    </span>
                  </AccordionTrigger>
                  <AccordionPanel>
                    <FieldLabel label="Job title">
                      <Input
                        variant="filled"
                        size="medium"
                        value={job.title ?? ''}
                        onChange={(event) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            title: event.target.value,
                          })
                        }
                      />
                    </FieldLabel>

                    <FieldLabel label="Description">
                      <Textarea
                        variant="filled"
                        size="medium"
                        value={job.description ?? ''}
                        onChange={(event) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            description: event.target.value,
                          })
                        }
                      />
                    </FieldLabel>

                    <FieldLabel label="Location">
                      <Input
                        variant="filled"
                        size="medium"
                        value={job.location ?? ''}
                        onChange={(event) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            location: event.target.value,
                          })
                        }
                      />
                    </FieldLabel>

                    <FieldLabel label="Employment type">
                      <Input
                        variant="filled"
                        size="medium"
                        value={job.employment_type ?? ''}
                        onChange={(event) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            employment_type: event.target.value,
                          })
                        }
                      />
                    </FieldLabel>

                    <FieldLabel label="Apply button label">
                      <Input
                        variant="filled"
                        size="medium"
                        value={job.apply_label ?? ''}
                        onChange={(event) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            apply_label: event.target.value,
                          })
                        }
                      />
                    </FieldLabel>

                    <FieldLabel label="Apply links to">
                      <LinkTargetSelect
                        value={job.apply_href ?? ''}
                        onChange={(apply_href) =>
                          updateJob(groupIndex, jobIndex, {
                            ...job,
                            apply_href,
                          })
                        }
                      />
                    </FieldLabel>
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>

          <Button
            type="button"
            variant="secondary"
            size="large"
            className="w-full"
            onClick={() => addJob(groupIndex)}
          >
            <icon.plus />
            Add opening
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
        Add category
      </Button>
    </SectionEditorShell>
  );
}
