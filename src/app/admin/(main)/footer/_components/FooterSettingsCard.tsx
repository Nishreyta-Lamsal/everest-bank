'use client';

import { useState } from 'react';

import FieldLabel from '@/components/admin/shared/FieldLabel';
import MediaField from '@/components/admin/shared/MediaField';
import { Card } from '@/components/admin/ui/card';
import { Input } from '@/components/admin/ui/input';
import { Textarea } from '@/components/admin/ui/textarea';

import { useFooterDraft } from './FooterDraftContext';
import { useFooterSettings } from '@/hooks/api/admin/use-footer';
import { useUploadMedia } from '@/hooks/api/admin/use-media';

import type { FooterSettingsWrite, SectionMedia } from '@/types/admin';

type ImageField = 'logo_media' | 'app_qr_media' | 'mountain_banner_media';

export default function FooterSettingsCard() {
  const { data: settings, isPending, isError } = useFooterSettings();
  const uploadMedia = useUploadMedia();

  const { draft: footerDraft, update } = useFooterDraft();
  const draft = footerDraft.settings;

  // Uploads return an id for saving plus a url the field can preview.
  const [previews, setPreviews] = useState<Record<string, SectionMedia>>({});

  function setField(field: keyof FooterSettingsWrite, value: string | number) {
    update((current) => ({
      ...current,
      settings: { ...current.settings, [field]: value },
    }));
  }

  function uploadImage(field: ImageField, file: File) {
    uploadMedia.mutate(
      { file },
      {
        onSuccess(media) {
          if (!media.file_url) return;

          setField(field, media.id);
          setPreviews((current) => ({
            ...current,
            [field]: {
              src: media.file_url,
              alt: media.alt_text || media.title || '',
              media_id: media.id,
            },
          }));
        },
      },
    );
  }

  function imageFor(field: ImageField, url: string | null | undefined) {
    return previews[field] ?? (url ? { src: url, alt: '' } : undefined);
  }

  if (isPending) {
    return (
      <Card className="w-full">
        <div className="flex w-full flex-col gap-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="h-[48px] w-full animate-pulse rounded-[6px] bg-slate-100"
            />
          ))}
        </div>
      </Card>
    );
  }

  if (isError || !settings) {
    return (
      <Card className="w-full">
        <p className="text-[14px] text-neutral-700 opacity-[0.72]">
          Could not load the footer settings.
        </p>
      </Card>
    );
  }

  const value = { ...settings, ...draft };

  return (
    <Card className="w-full">
      <div className="flex w-full flex-col gap-4">
        <div className="flex flex-col gap-1">
          <p className="text-[16px] font-semibold text-neutral-900">
            Brand and support
          </p>
          <p className="text-paragraph-sm text-neutral-700">
            The logo, app promo, banner and customer support details.
          </p>
        </div>

        <div className="grid w-full gap-4 md:grid-cols-3">
          <MediaField
            label="Logo"
            media={imageFor('logo_media', settings.logo_url)}
            isUploading={uploadMedia.isPending}
            onUpload={(file) => uploadImage('logo_media', file)}
          />
          <MediaField
            label="App QR code"
            media={imageFor('app_qr_media', settings.app_qr_url)}
            isUploading={uploadMedia.isPending}
            onUpload={(file) => uploadImage('app_qr_media', file)}
          />
          <MediaField
            label="Mountain banner"
            media={imageFor(
              'mountain_banner_media',
              settings.mountain_banner_url,
            )}
            isUploading={uploadMedia.isPending}
            onUpload={(file) => uploadImage('mountain_banner_media', file)}
          />
        </div>

        <FieldLabel label="App promo label">
          <Input
            variant="filled"
            size="medium"
            value={value.app_promo_label ?? ''}
            onChange={(event) =>
              setField('app_promo_label', event.target.value)
            }
          />
        </FieldLabel>

        <FieldLabel label="Support title">
          <Input
            variant="filled"
            size="medium"
            value={value.support_title ?? ''}
            onChange={(event) => setField('support_title', event.target.value)}
          />
        </FieldLabel>

        <FieldLabel label="Support description">
          <Textarea
            variant="filled"
            size="medium"
            value={value.support_description ?? ''}
            onChange={(event) =>
              setField('support_description', event.target.value)
            }
          />
        </FieldLabel>

        <div className="grid w-full gap-4 md:grid-cols-2">
          <FieldLabel label="SWIFT code">
            <Input
              variant="filled"
              size="medium"
              value={value.swift_code ?? ''}
              onChange={(event) => setField('swift_code', event.target.value)}
            />
          </FieldLabel>

          <FieldLabel label="Toll free number">
            <Input
              variant="filled"
              size="medium"
              value={value.toll_free_number ?? ''}
              onChange={(event) =>
                setField('toll_free_number', event.target.value)
              }
            />
          </FieldLabel>

          <FieldLabel label="Call button link">
            <Input
              variant="filled"
              size="medium"
              placeholder="tel:…"
              value={value.call_button_href ?? ''}
              onChange={(event) =>
                setField('call_button_href', event.target.value)
              }
            />
          </FieldLabel>

          <FieldLabel label="Enquire button link">
            <Input
              variant="filled"
              size="medium"
              value={value.enquire_button_href ?? ''}
              onChange={(event) =>
                setField('enquire_button_href', event.target.value)
              }
            />
          </FieldLabel>
        </div>
      </div>
    </Card>
  );
}
