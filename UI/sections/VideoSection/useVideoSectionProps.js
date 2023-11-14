import { useEffect, useRef, useState } from 'react';
import { getDocumentFields, getFileUrl } from 'utils/helper';

export default function useVideoSectionProps({ section }) {
  const {
    title,
    description,
    subtitle,
    view,
    images: rawAssets,
  } = getDocumentFields(
    section,
    [
      'title',
      'description',
      'contentModules',
      'subtitle',
      'view',
      'images',
    ],
  );

  const videoUrl = getFileUrl(rawAssets[0]);

  const videoRef = useRef();

  const [isVideoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    if (!videoRef) return;

    videoRef.current.volume = 0.3;
  }, [videoRef]);

  function handlePlayPauseClick() {
    if (!videoRef.current) {
      return;
    }

    if (videoRef.current.paused) {
      videoRef.current.play();
      setVideoPaused(false);
    } else {
      videoRef.current.pause();
      setVideoPaused(true);
    }
  }

  return {
    title,
    description,
    subtitle,
    view,
    videoUrl,
    videoRef,
    isVideoPaused,
    handlePlayPauseClick,
  };
}
