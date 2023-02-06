import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
import Illustration from 'UI/components/Illustration';
import { ANIMATION_CASE_STUDY_PROPS } from 'components/CaseStudiesCommon/utils/data';
import { ANIMATED_TYPE } from 'utils/constants';
import { useImages } from './utils/useImages';
import styles from './styles.module.scss';

const Images = (props) => {
  const {
    type,
    view,
    imagesUrl,
    classes,
    imageHeight,
  } = useImages(props);

  if (!imagesUrl) {
    return null;
  }

  return (
    <Animated
      {...ANIMATION_CASE_STUDY_PROPS}
      delay={50}
    >
      <div className={cn(
        styles[type],
        styles[classes],
        styles[view],
        styles.container,
      )}
      >
        {imagesUrl?.map(({ url, alt }, index) => (
          <Animated
            key={url}
            type={ANIMATED_TYPE.isCSS}
            intersectedClasses={cn({ [styles.active]: index })}
          >
            <Illustration
              transparent
              className={styles.image}
              height={imageHeight}
              src={url}
              alt={alt}
            />
          </Animated>
        ))}
      </div>
    </Animated>
  );
};

Images.defaultProps = {
  type: 'imageContainer',
  view: '',
  isMobileResolution: false,
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool,
  type: PropTypes.string,
  view: PropTypes.string,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Images);
