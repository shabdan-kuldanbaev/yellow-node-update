import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({
  data,
  type,
  isSpecial,
}) => {
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 500,
  };

  if (!get(data, 'contentModules')) {
    return null;
  }

  return (
    <div className={styles[type]}>
      {data.contentModules.map((document) => {
        const {
          title,
          images,
          text,
        } = getDocumentFields(document);
        const imageUrl = getFileUrl(get(images, '[0]'));
        const subImageUrl = getFileUrl(get(images, '[1]', ''));

        return (
          <div
            key={title}
            className={cn(styles.contentContainer, { [styles.special]: isSpecial })}
          >
            {!imageUrl && (
              <Animated {...delayedAnimation}>
                <div className={cn(styles.infoContainer, styles.separatedTitle)}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
                </div>
              </Animated>
            )}
            <div className={cn(styles.infoContainer, { [styles.centrefy]: imageUrl })}>
              {subImageUrl && (
                <img
                  className={styles.subImage}
                  src={subImageUrl}
                  alt={title}
                />
              )}
              {imageUrl && (
                <Animated {...delayedAnimation}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
                </Animated>
              )}
              <Animated
                delay={1000}
                {...ANIMATION_CASE_STUDY_PROPS}
              >
                <ContentfulParser document={text} />
              </Animated>
            </div>
            {imageUrl && (
              <Animated {...ANIMATION_CASE_STUDY_PROPS}>
                <div>
                  <img
                    className={styles.image}
                    src={imageUrl}
                    alt={title}
                  />
                </div>
              </Animated>
            )}
          </div>
        );
      })}
    </div>
  );
};

ChallengesAndSolutions.defaultProps = {
  type: '',
  isSpecial: false,
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
  isSpecial: PropTypes.bool,
};

export default ChallengesAndSolutions;
