import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import Animated from 'components/Common/Animated';
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
  } = useImages(props);

  if (!imagesUrl) {
    return null;
  }

  return (
    <Animated
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(
        styles[type],
        styles[classes],
        styles[view],
        styles.container,
      )}
      >
        {imagesUrl.map((imageUrl, index) => (
          <Animated
            key={imageUrl}
            type={ANIMATED_TYPE.isCSS}
            intersectedClasses={cn({ [styles.active]: index })}
          >
            <img
              className={styles.image}
              src={imageUrl}
              alt={imageUrl}
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
