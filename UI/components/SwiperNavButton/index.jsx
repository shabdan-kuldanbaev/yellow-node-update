import PropTypes from 'prop-types';
import cn from 'classnames';
import Svg from 'UI/components/Svg';
import { useSwiperNavButton } from './utils/useSwiperNavButton';
import styles from './styles.module.scss';

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
