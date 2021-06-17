import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import { getDocumentFields } from 'utils/helper';
import { SVG_IMAGES_TYPES, ANIMATED_TYPE } from 'utils/constants';
import styles from './styles.module.scss';

const KeyFeatures = ({ features, type }) => {
  const animationProps = {
    type: ANIMATED_TYPE.isFade,
    duration: 2000,
  };

  if (!get(features, 'contentModules')) {
    return null;
  }

  return (
    <Animated {...animationProps}>
      <div className={styles[type]}>
        <div className={styles.containerBackground} />
        {features.contentModules.map((data, index) => {
          const { title, text } = getDocumentFields(data);

          return (
            <Animated
              key={title}
              delay={250 * index}
              {...animationProps}
            >
              <div className={styles.featureContainer}>
                <div className={styles.checkMark}>
                  <Svg
                    className={styles.icon}
                    type={SVG_IMAGES_TYPES.checkMark}
                  />
                </div>
                <div className={styles.contentContainer}>
                  <h3 className={styles.title}>
                    {title}
                  </h3>
                  <ContentfulParser document={text} />
                </div>
              </div>
            </Animated>
          );
        })}
      </div>
    </Animated>
  );
};

KeyFeatures.defaultProps = {
  type: '',
};

KeyFeatures.propTypes = {
  type: PropTypes.string,
  features: PropTypes.instanceOf(Object).isRequired,
};

export default KeyFeatures;
