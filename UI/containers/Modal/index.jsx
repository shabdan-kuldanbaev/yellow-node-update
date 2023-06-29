import dynamic from 'next/dynamic';
import cn from 'classnames';
import PropTypes from 'prop-types';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import useProps from './utils/useProps';
import styles from './Modal.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

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
  show: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Modal;
