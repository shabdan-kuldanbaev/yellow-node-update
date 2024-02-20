import dynamic from 'next/dynamic';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { useSwiperNavButton } from './utils/useSwiperNavButton';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const SwiperNavButton = (props) => {
  const {
    buttonRef,
    type,
    text,
    svgType,
    className,
    ...rest
  } = useSwiperNavButton(props);

  return (
    <button
      type="button"
      className={cn(
        className,
        styles.navButton,
        styles[type],
      )}
      ref={buttonRef}
      data-swiper-button
      {...rest}
    >
      <Svg type={svgType} />
      {text && (
        <span className={styles.text}>
          {text}
        </span>
      )}
    </button>
  );
};

SwiperNavButton.propTypes = {
  type: PropTypes.oneOf(['next', 'prev']).isRequired,
  text: PropTypes.string,
  className: PropTypes.string,
};

export default SwiperNavButton;
