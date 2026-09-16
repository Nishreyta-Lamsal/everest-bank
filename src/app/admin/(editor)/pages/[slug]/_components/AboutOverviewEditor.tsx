'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import LinkTargetSelect from '@/components/admin/shared/LinkTargetSelect';
import StatFieldRow from '@/components/admin/shared/StatFieldRow';
import SectionEditorShell from './SectionEditorShell';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type { AboutOverviewContent, PageSectionRead } from '@/types/admin';

type AboutOverviewEditorProps = {
  slug: string;
  section: PageSectionRead;
};

type OverviewStat = NonNullable<AboutOverviewContent['stats']>[number];
type OverviewCard = NonNullable<AboutOverviewContent['cards']>[number];

export default function AboutOverviewEditor({
  slug,
  section,
}: AboutOverviewEditorProps) {
  const content = localizedContent<AboutOverviewContent>(section.content);

  const [intro, setIntro] = useState(content.intro ?? '');
  const [stats, setStats] = useState<OverviewStat[]>(content.stats ?? []);
  const [cards, setCards] = useState<OverviewCard[]>(content.cards ?? []);
  const [centerImage, setCenterImage] = useState(content.center_image);

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<AboutOverviewContent>(slug, section, () => ({
      intro,
      stats,
      cards,
      center_image: centerImage,
    }));

  function updateStat(index: number, next: OverviewStat) {
    setStats(stats.map((stat, i) => (i === index ? next : stat)));
  }

  function removeStat(index: number) {
    setStats(stats.filter((_, i) => i !== index));
  }

  function updateCard(index: number, next: OverviewCard) {
    setCards(cards.map((card, i) => (i === index ? next : card)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Intro text, headline stats, cards and the center image"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Intro">
        <Textarea
          variant="filled"
          size="medium"
          value={intro}
          onChange={(event) => setIntro(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Center image"
        media={centerImage}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setCenterImage)}
        onRemove={() => setCenterImage(undefined)}
      />

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Stats</p>

        {stats.map((stat, index) => (
          <StatFieldRow
            key={index}
            stat={{ value: stat.value ?? '', title: stat.label ?? '' }}
            onChange={(next) =>
              updateStat(index, { value: next.value, label: next.title })
            }
            onRemove={() => removeStat(index)}
            titlePlaceholder="Label for the stat"
          />
        ))}
      </div>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">Cards</p>

        {cards.map((card, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
              Card {index + 1}
              {card.title ? ` · ${card.title}` : ''}
            </p>

            <FieldLabel label="Title">
              <Input
                variant="filled"
                size="medium"
                value={card.title ?? ''}
                onChange={(event) =>
                  updateCard(index, { ...card, title: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Link label">
              <Input
                variant="filled"
                size="medium"
                value={card.link_label ?? ''}
                onChange={(event) =>
                  updateCard(index, { ...card, link_label: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={card.href ?? ''}
                onChange={(href) => updateCard(index, { ...card, href })}
              />
            </FieldLabel>
          </div>
        ))}
      </div>
    </SectionEditorShell>
  );
}
