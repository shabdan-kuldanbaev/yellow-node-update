import React from 'react';
import PropTypes from 'prop-types';
import { Animated } from 'components/Common/Animated';
import { Svg } from 'components/Common/Svg';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import Swiper from 'react-id-swiper';
import cn from 'classnames';
import { getSvgGroupProps } from '../utils/svgHelper';
import styles from '../styles.module.scss';

export const getSwiperParams = ({ isEnabled = true }) => ({
  enabled: isEnabled,
  slidesPerView: 'auto',
  spaceBetween: 60,
  passiveListeners: true,
  freeMode: true,
  grabCursor: true,
  mousewheel: {
    forceToAxis: true,
  },
});

const SvgGroup = ({
  data,
  isSwiperEnabled,
  className,
}) => {
  const { title, contentList: technologies } = getSvgGroupProps(data);

  console.log({ isSwiperEnabled });
  const swiperParams = getSwiperParams({ isEnabled: isSwiperEnabled });

  return (
    <div className={cn(className,
      styles.svgGroup,
      { [styles.multiline]: !isSwiperEnabled })}
    >
      {title && <h3 className={styles.groupTitle}>{title}</h3>}
      <Swiper
        {...swiperParams}
        enabled
      >
        {technologies && technologies.map((technology, i) => (
          <span className={styles.item}>
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={isSwiperEnabled ? 0 : (300 + 70 * i)}
            >
              <Svg type={technology} />
            </Animated>
          </span>
        ))}
      </Swiper>
    </div>
  );
};

SvgGroup.defaultProps = {
  className: '',
  isSwiperEnabled: true,
};

SvgGroup.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isSwiperEnabled: PropTypes.bool,
  className: PropTypes.string,
};

export default SvgGroup;
