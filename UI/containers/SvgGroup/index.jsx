import PropTypes from 'prop-types';
import cn from 'classnames';
import dynamic from 'next/dynamic';
import { SwiperSlide } from 'swiper/react';
import { REVEAL_ANIMATION_PROPS } from 'utils/constants';
import CustomSwiper from 'UI/containers/CustomSwiper';
import styles from './styles.module.scss';
import { useSvgGroup } from './utils/useSvgGroup';

const Animated = dynamic(() => import('UI/containers/Animated'));
const Svg = dynamic(() => import('UI/components/Svg'));

const SvgGroup = (props) => {
  const {
    type,
    view,
    icons,
    title,
    className,
    hideTitle,
    isSwiperEnabled = true,
    swiperParams,
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
          swiperParams={swiperParams}
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

SvgGroup.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  isSwiperEnabled: PropTypes.bool,
  className: PropTypes.string,
  hideTitle: PropTypes.bool,
};

export default SvgGroup;
