import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { getFileUrl, getOptimizedImage } from 'utils/helper';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Images = ({
  data,
  type,
  isMobileResolution,
}) => {
  if (!get(data, 'images')) {
    return null;
  }

  return data.images.map((image) => {
    const imageUrl = isMobileResolution
      ? getOptimizedImage(getFileUrl(image), 0, 500, 'png', 'png8')
      : getOptimizedImage(getFileUrl(image), 0, 812, 'png', 'png8');

    return (
      <Animated
        key={imageUrl}
        delay={100}
        {...ANIMATION_CASE_STUDY_PROPS}
      >
        <div className={styles[type]}>
          <img
            className={styles.image}
            src={imageUrl}
            alt={imageUrl}
          />
        </div>
      </Animated>
    );
  });
};

Images.defaultProps = {
  type: 'default',
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
  type: PropTypes.string,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Images);
