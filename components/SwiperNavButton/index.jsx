import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import styles from 'styles.module.scss';
import { ReactComponent as Next } from './icons/next.svg';
import { ReactComponent as Prev } from './icons/prev.svg';

const SwiperNavButton = ({ type, className }) => (
  <button
    type="button"
    className={cn(className, type === 'next' ? styles.navButtonNext : styles.navButtonPrev)}
  >
    {
      type === 'next' ? <Next /> : <Prev />
    }
  </button>
);

SwiperNavButton.defaultProps = {
  className: '',
};

SwiperNavButton.propTypes = {
  type: PropTypes.oneOf(['prev', 'next']).isRequired,
  className: PropTypes.string,
};

export default SwiperNavButton;
