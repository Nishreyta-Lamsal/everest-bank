'use client';

import { useEffect, useState } from 'react';

import { usePageEditor } from '@/store/PageEditorContext';

import { useUploadMedia } from '@/hooks/api/admin/use-media';
import { mergeLocalizedContent } from '@/lib/admin/section-content';

import type { PageSectionRead, SectionMedia } from '@/types/admin';

export function useSectionEditor<T extends object>(
  slug: string,
  section: PageSectionRead,
  buildContent: () => Partial<T>,
) {
  const uploadMedia = useUploadMedia();
  const {
    registerSectionDraft,
    setDraftContent,
    setDraftVisibility,
    publishError,
  } = usePageEditor();

  const [shownOnPage, setShownOnPage] = useState(section.is_visible);

  function uploadImage(file: File, onUploaded: (media: SectionMedia) => void) {
    uploadMedia.mutate(
      { file },
      {
        onSuccess(media) {
          if (!media.file_url) return;

          onUploaded({
            src: media.file_url,
            alt: media.alt_text || media.title || '',
            media_id: media.id,
          });
        },
      },
    );
  }

  // `buildContent` is a new closure every render, so the serialized content is
  // what decides whether anything actually moved.
  const draftContent = mergeLocalizedContent<T>(
    section.content,
    buildContent(),
  );
  const serializedDraft = JSON.stringify(draftContent);

  // Re-registers each render so the payload reflects the latest field values;
  // the context ignores no-op registrations.
  useEffect(function () {
    registerSectionDraft(section.id, {
      slug,
      item: {
        id: section.id,
        section_type: section.section_type,
        is_visible: shownOnPage,
        content: draftContent,
      },
    });

    return function () {
      registerSectionDraft(section.id, null);
    };
  });

  // Mirror the in-progress fields into the shared draft so the live preview
  // re-renders as they change.
  useEffect(
    function () {
      setDraftContent(section.id, draftContent);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [section.id, serializedDraft],
  );

  useEffect(
    function () {
      setDraftVisibility(section.id, shownOnPage);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [section.id, shownOnPage],
  );

  return {
    shownOnPage,
    setShownOnPage,
    uploadImage,
    isUploading: uploadMedia.isPending,
    isError: Boolean(publishError),
    error: publishError,
  };
}
