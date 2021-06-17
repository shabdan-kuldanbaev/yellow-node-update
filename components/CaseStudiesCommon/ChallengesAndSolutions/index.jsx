import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { getDocumentFields, getFileUrl } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from 'utils/constants';
import styles from './styles.module.scss';

const ChallengesAndSolutions = ({ data, type }) => {
  const delayedAnimation = {
    ...ANIMATION_CASE_STUDY_PROPS,
    delay: 500,
  };

  if (!data || !data.contentModules) {
    return null;
  }

  return (
    <div>
      {data.contentModules.map((document) => {
        const {
          title,
          images,
          text,
        } = getDocumentFields(document);
        const imageUrl = getFileUrl(get(images, '[0]', {}));

        return (
          <div
            key={title}
            className={cn(styles.contentContainer, styles[type])}
          >
            {!imageUrl && (
              <Animated {...delayedAnimation}>
                <div className={styles.infoContainer}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
                </div>
              </Animated>
            )}
            <div className={cn(styles.infoContainer, { [styles.centrefy]: imageUrl })}>
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
                    alt=""
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
};

ChallengesAndSolutions.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  type: PropTypes.string,
};

export default ChallengesAndSolutions;
