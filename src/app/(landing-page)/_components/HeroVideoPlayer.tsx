'use client';

import { useEffect, useRef, useState } from 'react';

import { PauseIcon, PlayIcon } from '@/components/icons';

import { cn } from '@/lib/utils';

export default function HeroVideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const hideTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showControls, setShowControls] = useState(true);

  function revealControls() {
    setShowControls(true);

    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }

    if (videoRef.current && !videoRef.current.paused) {
      hideTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 1000);
    }
  }

  useEffect(() => {
    return () => {
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, []);

  function togglePlayback() {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }

    revealControls();
  }

  return (
    <div
      className="relative size-20 shrink-0 lg:size-41.5"
      onMouseEnter={revealControls}
      onMouseMove={revealControls}
    >
      <video
        ref={videoRef}
        src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
        poster="/images/hero/savings-video-thumbnail.png"
        muted
        loop
        playsInline
        onPlay={() => {
          setIsPlaying(true);
          revealControls();
        }}
        onPause={() => {
          setIsPlaying(false);
          setShowControls(true);
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        }}
        className="size-full rounded-full object-cover"
      />
      <button
        type="button"
        onClick={togglePlayback}
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
        className={cn(
          'absolute inset-0 m-auto flex size-4 cursor-pointer items-center justify-center text-white backdrop-blur-xs transition-opacity duration-300 lg:size-8',
          showControls ? 'opacity-100' : 'opacity-0',
        )}
      >
        {isPlaying ? (
          <PauseIcon className="size-4 lg:size-8" />
        ) : (
          <PlayIcon className="size-4 lg:size-8" />
        )}
      </button>
    </div>
  );
}
