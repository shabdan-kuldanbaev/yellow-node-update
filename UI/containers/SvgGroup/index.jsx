import React from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import Svg from 'UI/components/Svg';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import CustomSwiper from 'UI/containers/CustomSwiper';
import styles from './styles.module.scss';
import { SWIPER_PARAMS } from './utils/helpers';
import { useSvgGroup } from './utils/useSvgGroup';

const Animated = dynamic(() => import('components/Common/Animated'));

const SvgGroup = (props) => {
  const {
    type,
    view,
    icons,
    title,
    className,
    hideTitle,
    isSwiperEnabled,
  } = useSvgGroup(props);

  return (
    <div className={cn(
      className,
      styles.svgGroup,
      styles[type],
      styles[view],
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
        <CustomSwiper
          swiperParams={SWIPER_PARAMS}
          className={styles.swiper}
        >
          {icons?.map((technology) => (
            <SwiperSlide
              className={styles.item}
              key={`technologies/${technology}`}
            >
              <Svg type={technology} />
            </SwiperSlide>
          ))}
        </CustomSwiper>
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
