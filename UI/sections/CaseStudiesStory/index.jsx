import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import Animated from 'UI/containers/Animated';
import Typography from 'UI/components/Typography';
import Illustration from 'UI/components/Illustration';
import { CustomYoutubePlayer } from 'components/Common/CustomYoutubePlayer';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getYoutubeVideoIdFromUrl } from 'utils/helper';
import useCaseStory from './utils/useCaseStory';
import styles from './styles.module.scss';

const CaseStudiesStory = (props) => {
  const {
    type,
    text,
    title,
    description,
    imageTitle,
    imageUrl,
    videoUrl,
  } = useCaseStory(props);

  return (
    <section className={cn(styles.section, styles[type])}>
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <div className={styles.contentWrapper}>
          <div className={styles.imagesContainer}>
            {imageUrl && (
              <div className={styles.imageContainer}>
                <Illustration
                  className={styles.image}
                  src={imageUrl}
                  alt={imageUrl}
                />
              </div>
            )}
            {imageTitle && (
              <Typography
                variant="p"
                className={styles.imageTitle}
              >
                {imageTitle}
              </Typography>
            )}
            {description && (
              <Typography
                variant="p"
                className={styles.imageDescription}
              >
                {description}
              </Typography>
            )}
          </div>
          <div className={styles.infoContainer}>
            {title && (
              <Typography
                variant="h3"
                className={styles.infoTitle}
              >
                {title}
              </Typography>
            )}
            <ContentfulParser document={text} />
          </div>
        </div>
      </Animated>
      {videoUrl && (
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <div className={styles.videoContainer}>
            <CustomYoutubePlayer src={getYoutubeVideoIdFromUrl(videoUrl)} />
          </div>
        </Animated>
      )}
    </section>
  );
};

CaseStudiesStory.propTypes = {
  type: PropTypes.string,
  data: PropTypes.instanceOf(Object).isRequired,
};

export default CaseStudiesStory;
