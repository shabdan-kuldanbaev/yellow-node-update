import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { Animated } from 'components/Common/Animated';
import { ContentfulParser } from 'components/BlogCommon/Article/ContentfulParser';
import { Svg } from 'components/Common/Svg';
import { getDocumentFields } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from '../../utils/data';
import styles from './styles.module.scss';

const KeyFeatures = ({ features, type }) => {
  if (!get(features, 'contentModules')) {
    return null;
  }

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={styles[type]}>
        <div className={styles.containerBackground} />
        {features.contentModules.map((data, index) => {
          const { title, text } = getDocumentFields(data);

          return (
            <Animated
              key={title}
              delay={50 * index}
              {...ANIMATION_CASE_STUDY_PROPS}
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
