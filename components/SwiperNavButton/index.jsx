import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { Svg } from 'components/Common/Svg';
import styles from './styles.module.scss';

const SwiperNavButton = ({
  type, text, className,
}) => (
  <button
    type="button"
    className={cn(className, styles.navButton, styles[type])}
  >
    <Svg type={type} />
    {text && (
      <span className={styles.text}>
        {text}
      </span>
    )}
  </button>
);

SwiperNavButton.defaultProps = {
  className: '',
  text: '',
};

SwiperNavButton.propTypes = {
  type: PropTypes.string.isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default SwiperNavButton;
