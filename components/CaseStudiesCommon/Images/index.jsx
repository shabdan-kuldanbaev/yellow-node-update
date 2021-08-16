import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import get from 'lodash/get';
import { connect } from 'react-redux';
import { selectIsMobileResolutions } from 'redux/selectors/layout';
import { Animated } from 'components/Common/Animated';
import { getFileUrl, getOptimizedContentfulImage } from 'utils/helper';
import { ANIMATED_TYPE } from 'utils/constants';
import { ANIMATION_CASE_STUDY_PROPS } from '../utils/data';
import styles from './styles.module.scss';

const Images = ({
  data,
  type,
  view,
  isMobileResolution,
}) => {
  if (!get(data, 'images')) {
    return null;
  }

  const classes = `${type}${data.images.length}`;

  return (
    <Animated
      delay={100}
      {...ANIMATION_CASE_STUDY_PROPS}
    >
      <div className={cn(styles[type], styles[classes], { [styles[view]]: view })}>
        {data.images.map((image, index) => {
          const imageUrl = getOptimizedContentfulImage(
            getFileUrl(image),
            {
              height: isMobileResolution ? 500 : 812,
              fm: 'png',
              fl: 'png8',
            },
          );
          const imageStyle = index ? styles.active : '';

          return (
            <Animated
              key={imageUrl}
              type={ANIMATED_TYPE.isCSS}
              intersectedClasses={imageStyle}
            >
              <img
                className={styles.image}
                src={imageUrl}
                alt={imageUrl}
              />
            </Animated>
          );
        })}
      </div>
    </Animated>
  );
};

Images.defaultProps = {
  type: 'imagContainer',
  view: '',
};

Images.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isMobileResolution: PropTypes.bool.isRequired,
  type: PropTypes.string,
  view: PropTypes.string,
};

export default connect(
  (state) => ({ isMobileResolution: selectIsMobileResolutions(state) }),
)(Images);
