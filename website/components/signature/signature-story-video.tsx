'use client';

import { useRef, useState } from 'react';

type SignatureStoryVideoProps = {
  src: string;
  poster: string;
  label: string;
};

export function SignatureStoryVideo({ src, poster, label }: SignatureStoryVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = async () => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      await video.play();
      setPlaying(true);
    } else {
      video.pause();
      setPlaying(false);
    }
  };

  return (
    <button className="signature-story-video" type="button" onClick={toggle} aria-label={`${label} ${playing ? 'pausieren' : 'abspielen'}`}>
      <video ref={videoRef} muted loop playsInline preload="metadata" poster={poster} aria-hidden="true">
        <source src={src} type="video/mp4" />
      </video>
      <span aria-hidden="true">{playing ? 'Ⅱ' : '▶'}</span>
    </button>
  );
}
