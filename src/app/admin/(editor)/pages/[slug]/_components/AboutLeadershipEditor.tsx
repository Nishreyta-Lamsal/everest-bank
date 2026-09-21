'use client';

import { useState } from 'react';

import ButtonFieldGroup from '@/components/admin/shared/ButtonFieldGroup';
import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { AboutLeadershipContent, PageSectionRead } from '@/types/admin';

type AboutLeadershipEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type LeadershipPerson = NonNullable<AboutLeadershipContent['people']>[number];

export default function AboutLeadershipEditor({
  slug,
  section,
}: AboutLeadershipEditorProps) {
  const content = localizedContent<AboutLeadershipContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [description, setDescription] = useState(content.description ?? '');
  const [people, setPeople] = useState<LeadershipPerson[]>(
    content.people ?? [],
  );
  const [ctaLabel, setCtaLabel] = useState(content.cta?.label ?? '');
  const [ctaHref, setCtaHref] = useState(content.cta?.href ?? '');

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<AboutLeadershipContent>(slug, section, () => ({
      heading,
      description,
      people,
      cta: { label: ctaLabel, href: ctaHref },
    }));

  function updatePerson(index: number, next: LeadershipPerson) {
    setPeople(people.map((person, i) => (i === index ? next : person)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, description, leadership cards and the section link"
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

      <FieldLabel label="Description">
        <Textarea
          variant="filled"
          size="medium"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">People</p>

        {people.map((person, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Person {index + 1}
              {person.name ? ` · ${person.name}` : ''}
            </p>

            <FieldLabel label="Name">
              <Input
                variant="filled"
                size="medium"
                value={person.name ?? ''}
                onChange={(event) =>
                  updatePerson(index, { ...person, name: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Role">
              <Input
                variant="filled"
                size="medium"
                value={person.role ?? ''}
                onChange={(event) =>
                  updatePerson(index, { ...person, role: event.target.value })
                }
              />
            </FieldLabel>

            <MediaField
              label="Portrait"
              media={person.image}
              onSelect={(image) => updatePerson(index, { ...person, image })}
            />
          </div>
        ))}
      </div>

      <ButtonFieldGroup
        label="Section link"
        buttonLabel={ctaLabel}
        onButtonLabelChange={setCtaLabel}
        linkTarget={ctaHref}
        onLinkTargetChange={setCtaHref}
        onRemove={() => {
          setCtaLabel('');
          setCtaHref('');
        }}
      />
    </SectionEditorShell>
  );
}
