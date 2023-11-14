import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import useVideoSectionProps from './useVideoSectionProps';
import styles from './styles.module.scss';

export default function VideoSection(props) {
  const {
    view,
    title,
    subtitle,
    description,
    videoUrl,
    videoRef,
    isVideoPaused,
    handlePlayPauseClick,
  } = useVideoSectionProps(props);

  return (
    <section className={cn(styles.videoSection, styles[view])}>
      <SectionTitle
        title={title}
        description={description}
        subtitle={subtitle}
      />

      <div className={styles.videoContainer}>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <video
          className={styles.video}
          ref={videoRef}
        >
          <source
            src={videoUrl}
            type="video/mp4"
          />
        </video>

        <div className={styles.controls}>
          <button
            onClick={handlePlayPauseClick}
            type="button"
          >
            {isVideoPaused ? 'play' : 'pause'}
          </button>
        </div>
      </div>
    </section>
  );
}
