import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { Swiper, SwiperSlide } from 'swiper/react';
import Svg from 'components/Common/Svg';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import { getSvgGroupProps, getSwiperParams } from '../utils/svgHelper';
import styles from '../styles.module.scss';

const Animated = dynamic(() => import('components/Common/Animated'));

const SvgGroup = ({
  data,
  isSwiperEnabled,
  className,
}) => {
  const { title, contentList: icons } = getSvgGroupProps(data);

  const swiperParams = getSwiperParams({ isEnabled: isSwiperEnabled });

  return (
    <div className={cn(
      className,
      styles.svgGroup,
      { [styles.multiline]: !isSwiperEnabled },
    )}
    >
      {title && (
        <h3 className={styles.groupTitle}>
          {title}
        </h3>
      )}
      <Swiper
        {...swiperParams}
        enabled
      >
        {icons?.map((technology, i) => (
          <SwiperSlide
            className={styles.item}
            key={`technologies/${technology}`}
          >
            <Animated
              {...REVEAL_ANIMATION_PROPS}
              transitionDelay={isSwiperEnabled ? 0 : (300 + 70 * i)}
            >
              <Svg type={technology} />
            </Animated>
          </SwiperSlide>
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
