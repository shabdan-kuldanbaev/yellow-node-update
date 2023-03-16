import PropTypes from 'prop-types';
import get from 'lodash/get';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import ContentfulParser from 'components/BlogCommon/Article/ContentfulParser';
import Svg from 'UI/components/Svg';
import {
  getDocumentFields,
  getFileUrl,
  getOptimizedContentfulImage,
} from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from '../../utils/data';
import styles from './styles.module.scss';

const Animated = dynamic(() => import('UI/containers/Animated'));

const KeyFeatures = ({ features, type }) => {
  if (!get(features, 'contentModules')) {
    return null;
  }

  const containerBackgroundImage = getOptimizedContentfulImage(
    getFileUrl(get(features, 'images[0]', {})),
    { fm: 'png' },
  );
  const containerStyle = containerBackgroundImage ? { backgroundImage: `url(${containerBackgroundImage})` } : {};

  return (
    <Animated {...ANIMATION_CASE_STUDY_PROPS}>
      <div className={styles[type]}>
        <div
          className={styles.containerBackground}
          style={containerStyle}
        />
        {features.contentModules.map((data, index) => {
          const { title, text } = getDocumentFields(data);

          return (
            <Animated
              key={title}
              delay={50 * index}
              {...ANIMATION_CASE_STUDY_PROPS}
            >
              <div className={cn(styles.featureContainer, styles[`featureContainer-${index + 1}`])}>
                <div className={styles.checkMark}>
                  <Svg
                    className={styles.icon}
                    type={SVG_IMAGES_TYPES.checkMark}
                  />
                </div>
                <div className={styles.contentContainer}>
                  <h2 className={styles.title}>
                    {title}
                  </h2>
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
