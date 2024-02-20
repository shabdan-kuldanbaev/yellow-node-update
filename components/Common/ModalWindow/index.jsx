import dynamic from 'next/dynamic';
import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';
import { setOverflowForBody } from 'utils/helper';
import { SVG_IMAGES_TYPES } from 'utils/constants';
import styles from './styles.module.scss';

const Svg = dynamic(() => import('UI/components/Svg'));

const ModalWindow = ({
  isModalWindow,
  closeModalWindow,
  children,
  className,
}) => {
  const modalRef = useRef(null);

  const handleOnClick = ({ target }) => {
    if (modalRef && modalRef.current) {
      if (modalRef.current.isEqualNode(target)) closeModalWindow();
    }
  };

  useEffect(() => {
    setOverflowForBody(isModalWindow);
  }, [isModalWindow]);

  useEffect(() => {
    const handleOnKeyDown = ({ key }) => {
      if (key === 'Escape') {
        closeModalWindow();
      }
    };

    document.addEventListener('keydown', handleOnKeyDown);

    return () => document.removeEventListener('keydown', handleOnKeyDown);
  }, [closeModalWindow]);

  return (
    <section
      className={cn(styles.modalWindowContainer, { [styles.show]: isModalWindow })}
      onClick={handleOnClick}
      ref={modalRef}
      role="dialog"
    >
      <div className={cn(styles.modalWindow, className)}>
        <Svg
          className={styles.svg}
          type={SVG_IMAGES_TYPES.closeSvg}
          handleOnClick={closeModalWindow}
        />
        {children}
      </div>
    </section>
  );
};

ModalWindow.propTypes = {
  isModalWindow: PropTypes.bool.isRequired,
  closeModalWindow: PropTypes.func.isRequired,
  children: PropTypes.instanceOf(Object).isRequired,
  className: PropTypes.string,
};

export default ModalWindow;
