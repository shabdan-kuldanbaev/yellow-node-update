import cn from 'classnames';
import SectionTitle from 'UI/components/SectionTitle';
import Svg from 'UI/components/Svg';
import useVideoSectionProps from './useVideoSectionProps';
import styles from './styles.module.scss';

export default function VideoSection(props) {
  const {
    slug,
    view,
    title,
    videoUrl,
    videoRef,
    isVideoPaused,
    handlePlayPauseClick,
    handleVideoEnd,
  } = useVideoSectionProps(props);

  return (
    <section className={cn(styles.videoSection, styles[view], styles[slug])}>
      <SectionTitle
        title={title}
        className={styles.title}
      />

      <div className={styles.videoContainer}>
        {/* eslint-disable jsx-a11y/media-has-caption */}
        <div className={styles.videoWrapper}>
          <video
            className={styles.video}
            ref={videoRef}
            onEnded={handleVideoEnd}
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
