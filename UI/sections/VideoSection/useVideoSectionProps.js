import {
  useEffect,
  useRef,
  useState,
} from 'react';
import {
  getDocumentFields,
  getFileUrl,
  getImage,
} from 'utils/helper';

export default function useVideoSectionProps({
  section,
  type,
  handleOnCTAClick,
}) {
  const {
    title,
    description,
    subtitle,
    view,
    images: rawAssets,
    contentModules,
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

  const { imagesBundles: rawImages } = getDocumentFields(contentModules?.[0], ['imagesBundles']);
  const { contentModules: ctaLinks } = getDocumentFields(contentModules?.[1], ['contentModules']);
  const imagesBundles = (rawImages || []).map(getImage);

  const videoUrl = getFileUrl(rawAssets[0]);
  const previewUrl = getFileUrl(rawAssets?.[1]);

  const videoRef = useRef();

  const [isVideoPaused, setVideoPaused] = useState(true);

  useEffect(() => {
    if (!videoRef) return;

    videoRef.current.volume = 0.3;

    videoRef.current.addEventListener('ended', () => {
      videoRef.current.load();
    });
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

  function handleVideoEnd() {
    if (!videoRef.current) {
      return;
    }

    videoRef.current.currentTime = 0;
    videoRef.current.pause();
    setVideoPaused(true);
  }

  return {
    slug: type,
    title,
    description,
    subtitle,
    view,
    videoUrl,
    videoRef,
    isVideoPaused,
    imagesBundles,
    previewUrl,
    handlePlayPauseClick,
    handleVideoEnd,
    ctaLinks,
    handleOnCTAClick,
  };
}
