'use client';

import { useState } from 'react';

import FieldLabel from './FieldLabel';
import MediaField from './MediaField';
import LinkTargetSelect from './LinkTargetSelect';
import SectionEditorShell from './SectionEditorShell';
import ImagePreview from './ImagePreview';
import ImageDropzone from './ImageDropzone';
import { useSectionEditor } from '@/hooks/admin/use-section-editor';
// import { icon } from '@/components/admin/icons';
// import { Button } from '@/components/admin/ui/button';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { localizedContent } from '@/lib/admin/section-content';

import type {
  AppPromoBadge,
  AppPromoContent,
  PageSectionRead,
  SectionMedia,
} from '@/types/admin';

type AppPromoEditorProps = {
  slug: string;
  section: PageSectionRead;
};

export default function AppPromoEditor({ slug, section }: AppPromoEditorProps) {
  const content = localizedContent<AppPromoContent>(section.content);

  const [heading, setHeading] = useState(content.heading ?? '');
  const [badges, setBadges] = useState<AppPromoBadge[]>(content.badges ?? []);
  const [qrCaption, setQrCaption] = useState(
    (content.qr_code?.caption_lines ?? []).join('\n'),
  );
  const [qrCode, setQrCode] = useState(content.qr_code);
  const [heroImage, setHeroImage] = useState(content.hero_image);
  const [phoneMockup, setPhoneMockup] = useState(content.phone_mockup);
  const [storeBadges, setStoreBadges] = useState<SectionMedia[]>(
    content.app_store_badges ?? [],
  );

  const { shownOnPage, setShownOnPage, uploadImage, isUploading, isError } =
    useSectionEditor<AppPromoContent>(slug, section, () => ({
      heading,
      badges,
      qr_code: qrCode && {
        ...qrCode,
        caption_lines: qrCaption
          .split('\n')
          .map((line) => line.trim())
          .filter(Boolean),
      },
      hero_image: heroImage,
      phone_mockup: phoneMockup,
      app_store_badges: storeBadges,
    }));

  function updateBadge(index: number, next: AppPromoBadge) {
    setBadges(badges.map((badge, i) => (i === index ? next : badge)));
  }

  return (
    <SectionEditorShell
      title={section.label}
      description="Heading, quick links, QR code and app imagery"
      shownOnPage={shownOnPage}
      onShownOnPageChange={setShownOnPage}
      isError={isError}
    >
      <FieldLabel label="Heading">
        <Textarea
          variant="filled"
          size="medium"
          value={heading}
          onChange={(event) => setHeading(event.target.value)}
        />
      </FieldLabel>

      <div className="flex w-full flex-col gap-3">
        <p className="text-[16px] font-semibold text-neutral-900">
          Quick links
        </p>

        {badges.map((badge, index) => (
          <div
            key={index}
            className="flex w-full flex-col gap-3 rounded-[6px] border border-[#e6ecf4] p-3"
          >
            <div className="flex w-full items-center justify-between">
              <p className="min-w-0 truncate text-[13px] font-semibold text-neutral-900">
                Link {index + 1}
                {badge.label ? ` · ${badge.label}` : ''}
              </p>
              {/* <button
                type="button"
                onClick={() => setBadges(badges.filter((_, i) => i !== index))}
                aria-label={`Remove link ${index + 1}`}
                className="text-slate-600"
              >
                <icon.trash className="size-4" />
              </button> */}
            </div>

            <FieldLabel label="Label">
              <Input
                variant="filled"
                size="medium"
                value={badge.label ?? ''}
                onChange={(event) =>
                  updateBadge(index, { ...badge, label: event.target.value })
                }
              />
            </FieldLabel>

            <FieldLabel label="Links to">
              <LinkTargetSelect
                value={badge.href ?? ''}
                onChange={(href) => updateBadge(index, { ...badge, href })}
              />
            </FieldLabel>
          </div>
        ))}

        {/* <Button
          variant="secondary"
          size="small"
          className="self-start"
          onClick={() => setBadges([...badges, { label: '' }])}
        >
          Add link
        </Button> */}
      </div>

      <MediaField
        label="QR code image"
        media={qrCode}
        isUploading={isUploading}
        onUpload={(file) =>
          uploadImage(file, (media) =>
            setQrCode({ ...media, caption_lines: qrCode?.caption_lines }),
          )
        }
        onRemove={() => setQrCode(undefined)}
      />

      <FieldLabel label="QR caption (one line per row)">
        <Textarea
          variant="filled"
          size="medium"
          value={qrCaption}
          onChange={(event) => setQrCaption(event.target.value)}
        />
      </FieldLabel>

      <MediaField
        label="Hero image"
        media={heroImage}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setHeroImage)}
        onRemove={() => setHeroImage(undefined)}
      />

      <MediaField
        label="Phone mockup"
        media={phoneMockup}
        isUploading={isUploading}
        onUpload={(file) => uploadImage(file, setPhoneMockup)}
        onRemove={() => setPhoneMockup(undefined)}
      />

      <div className="flex w-full flex-col gap-2">
        <p className="text-[12px] font-medium text-slate-950 opacity-[0.68]">
          App store badges
        </p>
        {storeBadges.length > 0 && (
          <div className="flex w-full flex-wrap items-center gap-2">
            {storeBadges.map((badge, index) => (
              <ImagePreview
                key={index}
                src={badge.src}
                alt={badge.alt}
                onRemove={() =>
                  setStoreBadges(storeBadges.filter((_, i) => i !== index))
                }
              />
            ))}
          </div>
        )}
        <ImageDropzone
          isUploading={isUploading}
          onFileSelected={(file) =>
            uploadImage(file, (media) =>
              setStoreBadges((current) => [...current, media]),
            )
          }
        />
      </div>
    </SectionEditorShell>
  );
}
