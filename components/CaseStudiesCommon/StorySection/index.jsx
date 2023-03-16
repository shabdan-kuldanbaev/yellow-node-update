import React from 'react';
import PropTypes from 'prop-types';
import dynamic from 'next/dynamic';
import Illustration from 'UI/components/Illustration';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { CustomYoutubePlayer } from 'components/Common/CustomYoutubePlayer';
import { getYoutubeVideoIdFromUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import { getStorySectionProps } from './utils/sectionHelper';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

export const StorySection = ({ type, data }) => {
  const {
    text,
    title,
    description,
    photoCaption,
    imageUrl,
    videoUrl,
  } = getStorySectionProps(data);

  return (
    <section className={styles[type]}>
      <Animated
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles.sectionContent}>
          <div className={styles.sectionImage}>
            {imageUrl && (
              <div className={styles.imageContainer}>
                <Illustration
                  layout="responsive"
                  className={styles.image}
                  src={imageUrl}
                  alt={imageUrl}
                />
              </div>
            )}
            {photoCaption && (
              <p className={styles.photoCaption}>
                {photoCaption}
              </p>
            )}
            {description && (
              <p className={styles.photoSecription}>
                {description}
              </p>
            )}
          </div>
          <div className={styles.sectionInfo}>
            {title && (
              <h3 className={styles.sectionTitle}>
                {title}
              </h3>
            )}
            <ContentfulParser document={text} />
          </div>
        </div>
      </Animated>
      {videoUrl && (
        <Animated
          delay={100}
          {...ANIMATION_CASE_STUDY_PROPS}
        >
          <div className={styles.video}>
            <CustomYoutubePlayer src={getYoutubeVideoIdFromUrl(videoUrl)} />
          </div>
        </Animated>
      )}
    </section>
  );
};

StorySection.defaultProps = {
  type: '',
};

StorySection.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};
