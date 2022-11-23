import React from 'react';
import cn from 'classnames';
import PropTypes from 'prop-types';
import SwiperNavButton from 'UI/components/SwiperNavButton';
import styles from './styles.module.scss';

export const SwiperNavigation = ({ className }) => (
  <div className={cn(className, styles.navigationContainer)}>
    <SwiperNavButton
      type="prev"
      text="previous"
    />
    <SwiperNavButton
      type="next"
      text="next"
    />
  </div>
);

SwiperNavigation.defaultProps = {
  className: null,
};

SwiperNavigation.propTypes = {
  className: PropTypes.string,
};
