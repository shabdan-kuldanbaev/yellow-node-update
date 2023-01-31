import Svg from 'UI/components/Svg';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import useProps from './utils/useProps';
import styles from './Modal.module.scss';

const Modal = (props) => {
  const {
    show,
    close,
    children,
    className,
    modalRef,
    handleOnClick,
  } = useProps(props);

  return (
    <section
      className={cn(styles.modalWindowContainer, { [styles.show]: show })}
      onClick={handleOnClick}
      ref={modalRef}
      role="dialog"
    >
      <div className={cn(styles.modalWindow, className)}>
        <Svg
          className={styles.svg}
          type={SVG_IMAGES_TYPES.closeSvg}
          handleOnClick={close}
        />
        {children}
      </div>
    </section>
  );
};

Modal.propTypes = {
  isModalWindow: PropTypes.bool.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

export default Modal;
