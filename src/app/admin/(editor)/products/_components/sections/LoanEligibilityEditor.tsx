'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import Pill from '@/components/admin/shared/Pill';
import SectionEditorShell from '../../../pages/[slug]/_components/SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';

import { localizedContent } from '@/lib/admin/section-content';

import type { LoanEligibilityContent, PageSectionRead } from '@/types/admin';

type LoanEligibilityEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function LoanEligibilityEditor({
  slug,
  section,
}: LoanEligibilityEditorProps) {
  const content = localizedContent<LoanEligibilityContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [applicantTypes, setApplicantTypes] = useState<string[]>(
    // Replicated sections arrive with blank placeholder entries; drop them so
    // the pill list starts clean.
    (content.applicant_types ?? []).filter(Boolean),
  );
  const [newType, setNewType] = useState('');
  const [requirementsHref, setRequirementsHref] = useState(
    content.requirements_href ?? '',
  );

  const { shownOnPage, setShownOnPage, isError, error } =
    useSectionEditor<LoanEligibilityContent>(slug, section, () => ({
      heading,
      applicant_types: applicantTypes,
      requirements_href: requirementsHref,
    }));

  function addType() {
    const value = newType.trim();

    if (!value) return;

    setApplicantTypes((current) => [...current, value]);
    setNewType('');
  }

  return (
    <SectionEditorShell
      title={section.label}
      sectionType={section.section_type}
      description="Heading, who can apply and the requirements link"
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

      <FieldLabel label="Applicant types">
        <div className="flex w-full flex-col gap-3">
          {applicantTypes.length > 0 && (
            <div className="flex w-full flex-wrap items-center gap-2">
              {applicantTypes.map((type, index) => (
                <Pill
                  key={`${type}-${index}`}
                  onRemove={() =>
                    setApplicantTypes(
                      applicantTypes.filter((_, i) => i !== index),
                    )
                  }
                  removeLabel={`Remove ${type}`}
                >
                  {type}
                </Pill>
              ))}
            </div>
          )}

          <div className="flex w-full items-center gap-4">
            <Input
              variant="default"
              size="medium"
              placeholder="Individual Farmers"
              value={newType}
              onChange={(event) => setNewType(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  event.preventDefault();
                  addType();
                }
              }}
            />
            <Button
              type="button"
              variant="secondary"
              size="large"
              className="shrink-0"
              onClick={addType}
            >
              Add
            </Button>
          </div>
        </div>
      </FieldLabel>

      <FieldLabel label="Requirements link">
        <LinkTargetSelect
          value={requirementsHref}
          onChange={setRequirementsHref}
        />
      </FieldLabel>
    </SectionEditorShell>
  );
}
