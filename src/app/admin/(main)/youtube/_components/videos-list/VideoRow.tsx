'use client';

import Image from 'next/image';
import { useState } from 'react';

import { icon } from '@/components/admin/icons';
import ActionMenu from '@/components/admin/shared/ActionMenu';
import { ConfirmDialog } from '@/components/admin/ui/confirm-dialog';
import VideoEditDrawer from './VideoEditDrawer';

import {
  useDeleteYouTubeVideo,
  useToggleYouTubeVideoHomepage,
} from '@/hooks/api/admin/use-youtube';

import { cn } from '@/lib/utils';
import { readApiError } from '@/lib/admin/read-api-error';

import type { YouTubePlaylist, YouTubeVideo } from '@/types/admin';

type VideoRowProps = {
  video: YouTubeVideo;
  playlists: YouTubePlaylist[];
  playlistName?: string;
};

const viewsFormatter = new Intl.NumberFormat('en', { notation: 'compact' });

function formatPublishedAt(isoDate: string | null) {
  if (!isoDate) return null;

  const timestamp = Date.parse(isoDate);

  if (Number.isNaN(timestamp)) return null;

  return new Date(timestamp).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

export default function VideoRow({
  video,
  playlists,
  playlistName,
}: VideoRowProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const deleteVideo = useDeleteYouTubeVideo();
  const toggleHomepage = useToggleYouTubeVideoHomepage();

  const title = video.display_title || video.title;
  const publishedAt = formatPublishedAt(video.published_at);

  const meta = [
    playlistName,
    video.views != null && `${viewsFormatter.format(video.views)} views`,
    publishedAt && `published ${publishedAt}`,
    video.custom_title && 'custom title',
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <>
      <div className="flex w-full items-center">
        <div className="flex h-[74px] min-w-0 flex-1 items-center gap-4 px-4">
          <div className="flex min-w-0 items-center gap-3">
            {video.thumbnail ? (
              <Image
                src={video.thumbnail}
                alt=""
                width={80}
                height={45}
                unoptimized
                className="h-[45px] w-[80px] shrink-0 rounded-[4px] object-cover"
              />
            ) : (
              <div className="flex h-[45px] w-[80px] shrink-0 items-center justify-center rounded-[4px] bg-slate-100">
                <icon.video className="size-6 text-slate-950" />
              </div>
            )}
            <div className="flex min-w-0 flex-col gap-0.5">
              <p
                title={title}
                className="truncate text-[16px] leading-[1.6] text-neutral-700"
              >
                {title}
              </p>
              <p className="truncate text-[12px] leading-[1.6] text-neutral-700/68">
                {meta || video.youtube_video_id}
              </p>
            </div>
          </div>
        </div>

        <div className="flex h-[74px] shrink-0 items-center gap-4 px-4">
          <span
            className={cn(
              'text-paragraph-sm-medium flex items-center justify-center gap-1.5 rounded-full px-3 py-2',
              video.show_on_homepage
                ? 'bg-[#ebfef6] text-[#059669]'
                : 'bg-[#edf2f7] text-[#65738a]',
            )}
          >
            {video.show_on_homepage ? 'On homepage' : 'Hidden'}
          </span>

          <div className="flex items-center gap-1">
            {video.video_url && (
              <a
                href={video.video_url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Watch ${title} on YouTube`}
                className="flex size-7 items-center justify-center rounded-full text-[#7d7c7d] transition-colors hover:bg-slate-100 hover:text-slate-950"
              >
                <icon.openLink className="size-4" />
              </a>
            )}

            <ActionMenu
              label={`Actions for ${title}`}
              items={[
                {
                  label: 'Edit',
                  iconKey: 'edit',
                  onSelect: () => setIsEditOpen(true),
                },
                {
                  label: video.show_on_homepage
                    ? 'Remove from homepage'
                    : 'Show on homepage',
                  iconKey: 'eye',
                  onSelect: () => {
                    if (!toggleHomepage.isPending) {
                      toggleHomepage.mutate(video.id);
                    }
                  },
                },
                {
                  label: 'Delete',
                  iconKey: 'trash',
                  isDestructive: true,
                  onSelect: () => setIsDeleteOpen(true),
                },
              ]}
            />
          </div>
        </div>
      </div>

      {isEditOpen && (
        <VideoEditDrawer
          entry={video}
          playlists={playlists}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
        />
      )}

      <ConfirmDialog
        isOpen={isDeleteOpen}
        onClose={() => {
          setIsDeleteOpen(false);
          deleteVideo.reset();
        }}
        onConfirm={() =>
          deleteVideo.mutate(video.id, {
            onSuccess: () => setIsDeleteOpen(false),
          })
        }
        title="Delete video?"
        description={
          <>
            <span className="font-medium text-neutral-900">{title}</span>
            {' will be permanently removed. This cannot be undone.'}
          </>
        }
        isPending={deleteVideo.isPending}
        error={
          deleteVideo.isError
            ? readApiError(deleteVideo.error, 'Could not delete this item.')
            : undefined
        }
      />
    </>
  );
}
