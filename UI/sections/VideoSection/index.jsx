import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Svg from 'UI/components/Svg';
import Illustration from 'UI/components/Illustration';
import useVideoSectionProps from './useVideoSectionProps';
import styles from './styles.module.scss';

export default function VideoSection(props) {
  const {
    slug,
    view,
    title,
    subtitle,
    videoUrl,
    videoRef,
    isVideoPaused,
    imagesBundles,
    previewUrl,
    handlePlayPauseClick,
    handleVideoEnd,
  } = useVideoSectionProps(props);

  return (
    <section className={cn(styles.videoSection, styles[view], styles[slug])}>
      {imagesBundles.map((image, i) => (
        <Illustration
          key={i}
          src={image.url}
          alt={image.alt}
          className={styles.imagesBundles}
        />
      ))}

      <SectionTitle
        title={title}
        subtitle={subtitle}
        className={styles.title}
      />

      <div className={styles.videoContainer}>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            ref={videoRef}
            onEnded={handleVideoEnd}
            poster={previewUrl}
          >
            <source
              src={videoUrl}
              type="video/mp4"
            />
          </video>
        </div>

        <div className={styles.controls}>
          <button
            onClick={handlePlayPauseClick}
            type="button"
          >
            {isVideoPaused ? <Svg type="play" /> : <Svg type="pause" />}
          </button>
        </div>
      </div>
    </section>
  );
}
