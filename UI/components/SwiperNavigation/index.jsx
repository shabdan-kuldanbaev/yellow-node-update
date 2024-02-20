import cn from 'classnames';
import PropTypes from 'prop-types';
import SwiperNavButton from 'UI/components/SwiperNavButton';
import styles from './styles.module.scss';

export const SwiperNavigation = ({
  className,
  navigationPrevRef,
  navigationNextRef,
}) => (
  <div className={cn(className, styles.navigationContainer)}>
    <SwiperNavButton
      type="prev"
      text="previous"
      buttonRef={navigationPrevRef}
    />
    <SwiperNavButton
      type="next"
      text="next"
      buttonRef={navigationNextRef}
    />
  </div>
);

SwiperNavigation.propTypes = {
  className: PropTypes.string,
};
