import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { SWIPER_NAV_BUTTON_TYPES } from 'utils/constants';
import Next from './icons/next.svg';
import Prev from './icons/prev.svg';
import styles from './styles.module.scss';

const SwiperNavButton = ({ type, className }) => {
  switch (type) {
  case SWIPER_NAV_BUTTON_TYPES.next:
    return (
      <button
        type="button"
        className={cn(className, styles.navButtonNext)}
      >
        <Next />
      </button>
    );

  case SWIPER_NAV_BUTTON_TYPES.prev:
    return (
      <button
        type="button"
        className={cn(className, styles.navButtonPrev)}
      >
        <Prev />
      </button>
    );

  default:
    return null;
  }
};

SwiperNavButton.defaultProps = {
  className: '',
};

SwiperNavButton.propTypes = {
  type: PropTypes.oneOf(Object.values(SWIPER_NAV_BUTTON_TYPES)).isRequired,
  className: PropTypes.string,
};

export default SwiperNavButton;
