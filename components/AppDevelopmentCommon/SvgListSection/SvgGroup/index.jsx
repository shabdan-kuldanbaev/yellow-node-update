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
  hideTitle,
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
      {title && !hideTitle && (
        <Animated {...REVEAL_ANIMATION_PROPS}>
          <h3 className={styles.groupTitle}>
            {title}
          </h3>
        </Animated>
      )}
      <Animated {...REVEAL_ANIMATION_PROPS}>
        <Swiper
          {...swiperParams}
          enabled
        >
          {icons?.map((technology) => (
            <SwiperSlide
              className={styles.item}
              key={`technologies/${technology}`}
            >
              <Svg type={technology} />
            </SwiperSlide>
          ))}
        </Swiper>
      </Animated>
    </div>
  );
};

SvgGroup.defaultProps = {
  className: '',
  isSwiperEnabled: true,
  hideTitle: false,
};

SvgGroup.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isSwiperEnabled: PropTypes.bool,
  className: PropTypes.string,
  hideTitle: PropTypes.bool,
};

export default SvgGroup;
