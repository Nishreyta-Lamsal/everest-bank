'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { PauseIcon, PlayIcon, SpeedClockIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import { iconMap } from '@/constants';
import { openAccountFeatures } from '@/data';

const DEFAULT_HEADING = 'Open an account that fits your financial goals';
const DEFAULT_CTA_LABEL = 'Open Your Account in 3 Minutes';
const DEFAULT_VIDEO_SRC =
  'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4';
const DEFAULT_POSTER_SRC = '/images/remittance/open-account-banner.png';
const DEFAULT_POSTER_ALT =
  'Everest Bank Limited signage above the head office entrance';

type OpenAccountFeatureContent = {
  icon: string;
  label: string;
};

type OpenAccountSectionProps = {
  heading?: string;
  ctaHref?: string;
  ctaLabel?: string;
  videoSrc?: string;
  posterSrc?: string;
  posterAlt?: string;
  features?: OpenAccountFeatureContent[];
};

export default function OpenAccountSection({
  heading = DEFAULT_HEADING,
  ctaHref = '#',
  ctaLabel = DEFAULT_CTA_LABEL,
  videoSrc = DEFAULT_VIDEO_SRC,
  posterSrc = DEFAULT_POSTER_SRC,
  posterAlt = DEFAULT_POSTER_ALT,
  features,
}: OpenAccountSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const resolvedFeatures =
    features?.map(({ icon, label }) => ({
      icon: iconMap[icon] ?? SpeedClockIcon,
      label,
    })) || openAccountFeatures;

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  return (
    <section className="w-full bg-red-600 py-16 lg:py-30">
      <LayoutWrapper>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[558px_642px] lg:gap-x-12 lg:gap-y-12">
          <h2 className="font-heading text-heading-h3-mobile-md lg:text-heading-h2-desktop-md w-full text-white lg:col-start-1 lg:row-start-1 lg:w-[550px] lg:self-center">
            {heading}
          </h2>
          <div className="relative h-[286px] w-full overflow-hidden rounded-lg lg:col-start-2 lg:row-start-2 lg:h-[428px] lg:w-[642px] lg:shrink-0 lg:rounded-3xl">
            <video
              ref={videoRef}
              src={videoSrc}
              poster={posterSrc}
              aria-label={posterAlt}
              loop
              playsInline
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              className="size-full object-cover"
            />
            <div className="pointer-events-none absolute inset-0 bg-black/10" />
            <button
              type="button"
              onClick={togglePlayback}
              aria-label={isPlaying ? 'Pause video' : 'Play video'}
              className="absolute top-1/2 left-1/2 flex size-15 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-[1.876px]"
            >
              {isPlaying ? (
                <PauseIcon className="size-6" />
              ) : (
                <PlayIcon className="size-6" />
              )}
            </button>
          </div>
          <div className="flex w-full flex-col items-start lg:col-start-1 lg:row-start-2">
            {resolvedFeatures.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex w-full items-center gap-4 py-3 lg:gap-6 lg:py-5"
              >
                <Icon className="size-7 shrink-0 text-white lg:size-10" />
                <p className="font-heading text-title-1-mobile-md lg:text-heading-h3-desktop-md text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <Link
            href={ctaHref}
            className="w-full lg:col-start-2 lg:row-start-1 lg:w-auto lg:self-center lg:justify-self-end"
          >
            <Button
              variant="secondary-white"
              className="h-[36px] w-full lg:h-[42px] lg:w-auto"
            >
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </LayoutWrapper>
    </section>
  );
}
