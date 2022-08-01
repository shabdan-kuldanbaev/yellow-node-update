import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import Svg from 'components/Common/Svg';
import { useSwiper } from 'swiper/react';
import styles from './styles.module.scss';

const SwiperNavButton = ({
  type,
  text,
  className,
}) => {
  const swiper = useSwiper();

  const handleNavButtonClick = () => {
    if (type === 'next') {
      return swiper.slideNext();
    }

    swiper.slidePrev();
  };

  return (
    <button
      onClick={handleNavButtonClick}
      type="button"
      className={cn(
        className,
        styles.navButton,
        styles[type],
      )}
    >
      <Svg type={type === 'next' ? 'arrowRight' : 'arrowLeft'} />
      {text && (
        <span className={styles.text}>
          {text}
        </span>
      )}
    </button>
  );
};

SwiperNavButton.defaultProps = {
  className: '',
  text: '',
};

SwiperNavButton.propTypes = {
  type: PropTypes.oneOf(['next', 'prev']).isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default SwiperNavButton;
