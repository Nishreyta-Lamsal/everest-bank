'use client';

import { useRef, useState } from 'react';

import LayoutWrapper from '@/components/layouts/wrapper/LayoutWrapper';
import { PauseIcon, PlayIcon } from '@/components/icons';
import Button from '@/components/ui/buttons/Button';

import {
  remittanceOpenAccountFeatures,
  remittanceOpenAccountImage,
} from '../_data/remittance-open-account';

export default function RemittanceOpenAccountSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

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
          <h2 className="font-heading text-heading-h2-mobile-md lg:text-heading-h3-desktop-md w-full text-white lg:col-start-1 lg:row-start-1 lg:w-[546px] lg:self-center">
            Open an account that fits your financial goals
          </h2>
          <div className="relative h-[286px] w-full overflow-hidden rounded-lg lg:col-start-2 lg:row-start-2 lg:h-[428px] lg:w-[642px] lg:shrink-0 lg:rounded-3xl">
            <video
              ref={videoRef}
              src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
              poster={remittanceOpenAccountImage.src}
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
              className="absolute top-1/2 left-1/2 flex size-[60px] -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-white/20 text-white backdrop-blur-sm"
            >
              {isPlaying ? (
                <PauseIcon className="size-[24px]" />
              ) : (
                <PlayIcon className="size-[24px]" />
              )}
            </button>
          </div>
          <div className="flex w-full flex-col items-start lg:col-start-1 lg:row-start-2">
            {remittanceOpenAccountFeatures.map(({ icon: Icon, label }) => (
              <div
                key={label}
                className="flex w-full items-center gap-4 py-3 lg:gap-6 lg:py-5"
              >
                <Icon className="size-[28px] shrink-0 text-white lg:size-[40px]" />
                <p className="font-heading text-heading-h3-mobile-md lg:text-heading-h6-desktop-md text-white">
                  {label}
                </p>
              </div>
            ))}
          </div>
          <Button
            variant="secondary-white"
            className="h-[36px] w-full lg:col-start-2 lg:row-start-1 lg:h-[42px] lg:w-auto lg:self-center lg:justify-self-end"
          >
            Open Your Account in 3 Minutes
          </Button>
        </div>
      </LayoutWrapper>
    </section>
  );
}
