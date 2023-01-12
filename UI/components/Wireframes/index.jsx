import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import CustomImage from 'components/Common/CustomImage';
import Animated from 'components/Common/Animated';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { useWireframes } from './utils/useWireframes';
import styles from './styles.module.scss';

const Wireframe = (props) => {
  const { type, wireframeImages } = useWireframes(props);

  if (!wireframeImages) {
    return null;
  }

  return wireframeImages.map(({
    url, height, width,
  }) => (
    <Animated
      key={url}
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(styles[type], styles.container)}>
        <CustomImage
          src={url}
          alt={url}
          layout="responsive"
          style={{
            minWidth: `${width}px`,
            height: `${height}px`,
          }}
          width={width}
          height={height}
          scale={2}
          containerClasses={styles.animatedContainer}
          className={styles.image}
        />
        <CustomImage
          src={url}
          alt={url}
          layout="responsive"
          style={{
            minWidth: `${width}px`,
            height: `${height}px`,
          }}
          width={width}
          height={height}
          scale={2}
          containerClasses={styles.animatedContainer}
          className={styles.image}
        />
      </div>
    </Animated>
  ));
};

Wireframe.propTypes = {
  data: PropTypes.shape({
    images: PropTypes.instanceOf(Array),
  }).isRequired,
  type: PropTypes.string.isRequired,
};

export default Wireframe;
