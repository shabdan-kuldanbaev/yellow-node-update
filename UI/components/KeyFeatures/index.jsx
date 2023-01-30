import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Animated from 'components/Common/Animated';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Svg from 'UI/components/Svg';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import Typography from 'UI/components/Typography';
import { useKeyFeatures } from './utils/useKeyFeatures';
import styles from './styles.module.scss';

const KeyFeatures = (props) => {
  const {
    type,
    content,
    containerStyle,
    isEmptyContentModules,
  } = useKeyFeatures(props);

  if (isEmptyContentModules) {
    return null;
  }

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={cn(styles[type], styles.container)}>
        <div
          className={styles.containerBackground}
          style={containerStyle}
        />
        {content?.map(({ title, text }, index) => (
          <Animated
            key={title}
            delay={50 * index}
            {...ANIMATION_CASE_STUDY_PROPS}
          >
            <div className={cn(styles.featureContainer, styles[`featureContainer-${index + 1}`])}>
              <div className={styles.checkMark}>
                <Svg
                  className={styles.icon}
                  type={SVG_IMAGES_TYPES.check}
                />
              </div>
              <div className={styles.contentContainer}>
                <Typography
                  variant="h2"
                  className={styles.title}
                >
                  {title}
                </Typography>
                <ContentfulParser document={text} />
              </div>
            </div>
          </Animated>
        ))}
      </div>
    </Animated>
  );
};

KeyFeatures.propTypes = {
  type: PropTypes.string,
  features: PropTypes.instanceOf(Object).isRequired,
};

export default KeyFeatures;
